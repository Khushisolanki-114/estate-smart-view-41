
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useMongoDB, COLLECTIONS } from '@/lib/mongodb';
import { useAuth } from '@/context/AuthContext';
import PropertyCard from '@/components/property/PropertyCard';
import { useProperties } from '@/context/PropertiesContext';
import { toast } from '@/components/ui/use-toast';

interface FavoriteProperty {
  _id: string;
  user_email: string;
  property_id: string;
  date_added: string;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { properties } = useProperties();
  const navigate = useNavigate();
  const mongodb = useMongoDB();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // Get favorites for the current user's email
        const userFavorites = await mongodb.collection(COLLECTIONS.FAVORITES)
          .find({ user_email: user?.email });
        
        setFavorites(userFavorites);
        setError(null);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load your favorite properties');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user?.email, isAuthenticated, navigate]);

  const removeFavorite = async (propertyId: string) => {
    try {
      await mongodb.collection(COLLECTIONS.FAVORITES).deleteOne({
        user_email: user?.email,
        property_id: propertyId
      });

      // Update state to remove the favorite
      setFavorites(prev => prev.filter(fav => fav.property_id !== propertyId));
      toast({
        title: "Removed from favorites",
        description: "The property has been removed from your favorites",
      });
    } catch (err) {
      console.error('Error removing favorite:', err);
      toast({
        title: "Error",
        description: "Failed to remove property from favorites",
        variant: "destructive",
      });
    }
  };

  // Get favorite properties data by joining favorites with properties
  const favoriteProperties = favorites.map(favorite => {
    const property = properties.find(p => p._id === favorite.property_id);
    return {
      favorite,
      property
    };
  }).filter(item => item.property !== undefined);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-estate-primary-dark mb-6">My Favorite Properties</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="spinner border-estate-primary"></div>
            <p className="mt-4 text-gray-600">Loading your favorites...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No favorite properties</h3>
            <p className="text-gray-600 mb-6">You haven't added any properties to your favorites yet</p>
            <Button
              onClick={() => navigate('/properties')}
              className="bg-estate-primary hover:bg-estate-primary-dark"
            >
              Browse Properties
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoriteProperties.map(({ favorite, property }) => (
              property && (
                <div key={favorite._id} className="flex flex-col">
                  <PropertyCard property={property} />
                  <div className="mt-3 flex justify-between">
                    <Link 
                      to={`/property/${property._id}`} 
                      className="inline-flex items-center text-sm text-estate-primary hover:text-estate-primary-dark"
                    >
                      View Details
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(property._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FavoritesPage;

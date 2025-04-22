
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Home, MapPin } from 'lucide-react';
import PropertyCard from '@/components/property/PropertyCard';
import { useProperties } from '@/context/PropertiesContext';
import Layout from '@/components/layout/Layout';

const HomePage: React.FC = () => {
  const { properties, loading, error } = useProperties();
  
  // Get featured properties
  const featuredProperties = properties.filter(property => property.featured).slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-estate-primary-dark to-estate-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Find Your Perfect Property
            </h1>
            <p className="text-lg mb-8 text-white/90 animate-fade-in">
              Browse our extensive collection of properties for sale and rent.
              Your dream home is just a few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white hover:bg-white/10"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-estate-primary-dark mb-2">
              Featured Properties
            </h2>
            <p className="text-gray-600">
              Exclusive selection of our finest properties
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="spinner border-estate-primary"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link to="/properties">
                  <Button variant="outline" className="border-estate-primary text-estate-primary hover:bg-estate-primary hover:text-white">
                    View All Properties
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-estate-primary-dark mb-2">
              Our Services
            </h2>
            <p className="text-gray-600">
              We provide comprehensive real estate solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-estate-primary h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-primary-dark">
                Buy Properties
              </h3>
              <p className="text-gray-600">
                Find your dream home from our wide selection of properties for sale across prime locations.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-estate-primary h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-primary-dark">
                Rent Properties
              </h3>
              <p className="text-gray-600">
                Explore rental options that match your lifestyle and budget with our curated selection.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-estate-primary h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-primary-dark">
                Market Analysis
              </h3>
              <p className="text-gray-600">
                Get comprehensive market insights to make informed real estate investment decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

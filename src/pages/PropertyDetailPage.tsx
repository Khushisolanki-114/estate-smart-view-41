import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  DollarSign, 
  Home, 
  Maximize, 
  Calendar, 
  ArrowLeft 
} from 'lucide-react';
import { useProperties } from '@/context/PropertiesContext';
import Layout from '@/components/layout/Layout';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById, loading } = useProperties();
  const property = id ? getPropertyById(id) : undefined;
  
  const formatPrice = (price: number, type: 'rent' | 'sale') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price) + (type === 'rent' ? '/month' : '');
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="spinner border-estate-primary"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </Layout>
    );
  }
  
  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 text-estate-primary-dark">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties">
            <Button>View All Properties</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/properties" className="inline-flex items-center text-estate-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Properties
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="relative mb-6">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-auto object-cover rounded-lg"
                style={{ maxHeight: '480px' }}
              />
              <Badge className={`absolute top-4 right-4 ${
                property.type === 'rent' ? 'bg-estate-primary' : 'bg-estate-accent'
              }`}>
                {property.type === 'rent' ? 'For Rent' : 'For Sale'}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-estate-primary-dark">{property.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-5 w-5 mr-2 text-estate-primary" />
              <span>{property.location}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg mb-8">
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Bedrooms</div>
                <div className="font-semibold flex items-center justify-center">
                  <Home className="h-4 w-4 mr-1 text-estate-primary" />
                  {property.bedrooms}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Bathrooms</div>
                <div className="font-semibold">{property.bathrooms}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Area</div>
                <div className="font-semibold flex items-center justify-center">
                  <Maximize className="h-4 w-4 mr-1 text-estate-primary" />
                  {property.area} sqft
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-estate-primary-dark">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100 sticky top-24">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-estate-primary-dark flex items-center">
                  <DollarSign className="h-6 w-6 mr-1" />
                  {formatPrice(property.price, property.type)}
                </h3>
                {property.type === 'rent' && (
                  <p className="text-gray-500 text-sm">Monthly Rent</p>
                )}
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-estate-primary" />
                  <span>Available Now</span>
                </div>
              </div>
              
              <Link to={`/schedule-viewing/${id}`}>
                <Button className="w-full bg-estate-primary hover:bg-estate-primary-dark mb-3">
                  Schedule Viewing
                </Button>
              </Link>
              
              <Link to={`/contact-agent/${id}`}>
                <Button variant="outline" className="w-full">
                  Contact Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetailPage;

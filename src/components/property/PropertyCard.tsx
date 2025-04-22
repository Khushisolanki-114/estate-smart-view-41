
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Home, Maximize } from 'lucide-react';
import { Property } from '@/context/PropertiesContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number, type: 'rent' | 'sale') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price) + (type === 'rent' ? '/month' : '');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link to={`/property/${property.id}`} className="relative block h-48 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className={`absolute top-2 right-2 ${
          property.type === 'rent' ? 'bg-estate-primary' : 'bg-estate-accent'
        }`}>
          {property.type === 'rent' ? 'For Rent' : 'For Sale'}
        </Badge>
        {property.featured && (
          <Badge className="absolute top-2 left-2 bg-estate-primary-dark">
            Featured
          </Badge>
        )}
      </Link>
      
      <CardContent className="pt-4 flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
          <Link to={`/property/${property.id}`} className="hover:text-estate-primary">
            {property.title}
          </Link>
        </h3>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center font-semibold text-estate-primary-dark mb-3">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{formatPrice(property.price, property.type)}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{property.description}</p>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Home className="h-4 w-4 mr-1" />
          <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
        </div>
        <div>
          <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
        </div>
        <div className="flex items-center">
          <Maximize className="h-4 w-4 mr-1" />
          <span>{property.area} sqft</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;

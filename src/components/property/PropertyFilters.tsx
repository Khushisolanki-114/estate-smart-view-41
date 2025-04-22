
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useProperties } from '@/context/PropertiesContext';

const PropertyFilters: React.FC = () => {
  const { filters, setFilters } = useProperties();
  
  // Local state for form inputs
  const [minPrice, setMinPrice] = React.useState<number | ''>('');
  const [maxPrice, setMaxPrice] = React.useState<number | ''>('');
  const [propertyType, setPropertyType] = React.useState<'all' | 'rent' | 'sale'>(filters.type);
  const [minBedrooms, setMinBedrooms] = React.useState<number[]>([filters.minBedrooms || 0]);
  
  // Handle filter reset
  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setPropertyType('all');
    setMinBedrooms([0]);
    
    setFilters({
      minPrice: null,
      maxPrice: null,
      type: 'all',
      minBedrooms: null,
    });
  };
  
  // Handle filter apply
  const handleApply = () => {
    setFilters({
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      type: propertyType,
      minBedrooms: minBedrooms[0] > 0 ? minBedrooms[0] : null,
    });
  };

  return (
    <Card className="bg-white mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2 text-estate-primary" />
            Filters
          </h3>
          <Button 
            variant="link" 
            className="text-sm text-estate-primary p-0 h-auto"
            onClick={handleReset}
          >
            Reset All
          </Button>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Price Range</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-price">Min Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : '')}
                  className="pl-7"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="max-price">Max Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="Any"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : '')}
                  className="pl-7"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Property Type */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Property Type</h4>
          <RadioGroup 
            value={propertyType} 
            onValueChange={(value) => setPropertyType(value as 'all' | 'rent' | 'sale')}
            className="flex flex-row space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rent" id="rent" />
              <Label htmlFor="rent">For Rent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="sale" />
              <Label htmlFor="sale">For Sale</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Bedrooms */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Bedrooms</h4>
            <span className="text-sm text-gray-500">{minBedrooms[0]}+</span>
          </div>
          <Slider
            value={minBedrooms}
            min={0}
            max={5}
            step={1}
            onValueChange={setMinBedrooms}
            className="mt-3"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Studio</span>
            <span>5+</span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-estate-primary hover:bg-estate-primary-dark"
          onClick={handleApply}
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;

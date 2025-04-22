
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useProperties } from '@/context/PropertiesContext';

const PropertySearch = () => {
  const { searchTerm, setSearchTerm } = useProperties();
  const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };
  
  return (
    <form onSubmit={handleSearch} className="relative mb-6">
      <Input
        type="text"
        placeholder="Search by location, property name, or description..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="pr-12 h-12 border-estate-primary/20 focus:border-estate-primary"
      />
      <Button 
        type="submit"
        size="icon"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-estate-primary hover:bg-estate-primary-dark"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default PropertySearch;

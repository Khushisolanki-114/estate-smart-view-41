
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMongoDB, COLLECTIONS } from '@/lib/mongodb';

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'rent' | 'sale';
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured: boolean;
}

interface PropertiesContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  filteredProperties: Property[];
  searchTerm: string;
  filters: {
    minPrice: number | null;
    maxPrice: number | null;
    type: 'all' | 'rent' | 'sale';
    minBedrooms: number | null;
  };
  setSearchTerm: (term: string) => void;
  setFilters: (filters: Partial<PropertiesContextType['filters']>) => void;
  getPropertyById: (id: string) => Property | undefined;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

// Sample property data
const sampleProperties: Property[] = [
  {
    _id: '1',
    title: 'Modern Apartment with City View',
    description: 'A beautiful modern apartment with stunning city views. Features include a fully equipped kitchen, spacious living area, and private balcony. Located in a prime downtown location with easy access to public transportation, restaurants, and shopping centers.',
    price: 1500,
    location: 'Downtown, New York',
    type: 'rent',
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    featured: true
  },
  {
    _id: '2',
    title: 'Luxury Waterfront Villa',
    description: 'Spectacular waterfront villa with panoramic ocean views. This luxury property features high-end finishes, a private pool, spacious entertainment areas, and direct beach access. Perfect for those seeking a high-end coastal lifestyle.',
    price: 2500000,
    location: 'Malibu, California',
    type: 'sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    featured: true
  },
  {
    _id: '3',
    title: 'Cozy Studio in Historic District',
    description: 'Charming studio apartment in a historic building. Features exposed brick walls, hardwood floors, and modern amenities. Ideally located in the heart of the historic district with cafes, boutiques, and cultural attractions just steps away.',
    price: 900,
    location: 'Boston, Massachusetts',
    type: 'rent',
    bedrooms: 0,
    bathrooms: 1,
    area: 450,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    featured: false
  },
  {
    _id: '4',
    title: 'Suburban Family Home',
    description: 'Spacious family home in a quiet suburban neighborhood. Features a large backyard, renovated kitchen, and comfortable living spaces. Located near excellent schools, parks, and shopping centers. Perfect for families looking for a safe and friendly community.',
    price: 450000,
    location: 'Naperville, Illinois',
    type: 'sale',
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2100,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    featured: false
  },
  {
    _id: '5',
    title: 'Penthouse with Rooftop Terrace',
    description: 'Luxurious penthouse featuring a private rooftop terrace with 360-degree views. This premium property includes high ceilings, floor-to-ceiling windows, and premium finishes throughout. Building amenities include a fitness center, pool, and 24-hour concierge.',
    price: 3500,
    location: 'Chicago, Illinois',
    type: 'rent',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
    featured: true
  },
  {
    _id: '6',
    title: 'Mountain Retreat Cabin',
    description: 'Rustic yet modern cabin nestled in the mountains. Features include a stone fireplace, vaulted ceilings, and wraparound deck with breathtaking views. Perfect as a vacation home or for those seeking a peaceful mountain lifestyle away from the city.',
    price: 375000,
    location: 'Aspen, Colorado',
    type: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    featured: false
  },
];

export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFiltersState] = useState({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    type: 'all' as 'all' | 'rent' | 'sale',
    minBedrooms: null as number | null,
  });

  useEffect(() => {
    // Simulate API fetch from MongoDB
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const mongodb = useMongoDB();
        
        // Initialize the collection with sample data if empty
        const storedProperties = await mongodb.collection(COLLECTIONS.PROPERTIES).find();
        
        if (storedProperties.length === 0) {
          // Store sample data in MongoDB collection
          sampleProperties.forEach(async (property) => {
            await mongodb.collection(COLLECTIONS.PROPERTIES).insertOne(property);
          });
          setProperties(sampleProperties);
        } else {
          // Use data from MongoDB collection
          setProperties(storedProperties);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const setFilters = (newFilters: Partial<PropertiesContextType['filters']>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  // Apply search and filters
  const filteredProperties = properties.filter(property => {
    // Apply search term
    const matchesSearch = 
      searchTerm === '' || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply filters
    const matchesMinPrice = filters.minPrice === null || property.price >= filters.minPrice;
    const matchesMaxPrice = filters.maxPrice === null || property.price <= filters.maxPrice;
    const matchesType = filters.type === 'all' || property.type === filters.type;
    const matchesBedrooms = filters.minBedrooms === null || property.bedrooms >= filters.minBedrooms;
    
    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesType && matchesBedrooms;
  });

  const getPropertyById = (id: string) => {
    return properties.find(property => property._id === id);
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        loading,
        error,
        filteredProperties,
        searchTerm,
        filters,
        setSearchTerm,
        setFilters,
        getPropertyById,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertiesProvider");
  }
  return context;
};

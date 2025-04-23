
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useProperties } from '@/context/PropertiesContext';
import PropertyCard from '@/components/property/PropertyCard';
import PropertySearch from '@/components/property/PropertySearch';
import PropertyFilters from '@/components/property/PropertyFilters';

const PropertiesPage: React.FC = () => {
  const { filteredProperties, loading, error } = useProperties();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-estate-primary-dark mb-6">All Properties</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <PropertyFilters />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <PropertySearch />
            
            {loading ? (
              <div className="text-center py-12">
                <div className="spinner border-estate-primary"></div>
                <p className="mt-4 text-gray-600">Loading properties...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                <p>{error}</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertiesPage;

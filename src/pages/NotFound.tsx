
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-estate-primary mb-4">404</h1>
          <p className="text-2xl text-estate-primary-dark mb-6">Oops! Page not found</p>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="bg-estate-primary hover:bg-estate-primary-dark">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

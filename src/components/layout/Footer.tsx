
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-estate-primary-dark">EstateSmart</h3>
            <p className="text-gray-600 text-sm">
              Find your perfect property with EstateSmart. We provide a seamless experience
              for buying, selling, and renting properties.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-estate-primary-dark">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 text-sm hover:text-estate-primary">Home</Link></li>
              <li><Link to="/properties" className="text-gray-600 text-sm hover:text-estate-primary">Properties</Link></li>
              <li><Link to="/signup" className="text-gray-600 text-sm hover:text-estate-primary">Sign Up</Link></li>
              <li><Link to="/signin" className="text-gray-600 text-sm hover:text-estate-primary">Sign In</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-estate-primary-dark">Property Types</h3>
            <ul className="space-y-2">
              <li><Link to="/properties?type=sale" className="text-gray-600 text-sm hover:text-estate-primary">For Sale</Link></li>
              <li><Link to="/properties?type=rent" className="text-gray-600 text-sm hover:text-estate-primary">For Rent</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-estate-primary-dark">Contact</h3>
            <address className="not-italic text-gray-600 text-sm">
              <p>123 Real Estate St.</p>
              <p>Property City, PC 12345</p>
              <p className="mt-2">Email: info@estatesmart.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EstateSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

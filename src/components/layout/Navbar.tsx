
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Home, User, LogOut, Calendar, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-estate-primary" />
          <span className="text-xl font-bold text-estate-primary-dark">Estate<span className="text-estate-primary">Smart</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-estate-primary">Home</Link>
          <Link to="/properties" className="text-gray-600 hover:text-estate-primary">Properties</Link>
          {isAuthenticated && (
            <>
              <Link to="/favorites" className="text-gray-600 hover:text-estate-primary flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Favorites
              </Link>
              <Link to="/scheduled-meetings" className="text-gray-600 hover:text-estate-primary flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                My Viewings
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600">Hello, {user?.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-estate-primary hover:bg-estate-primary-dark">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

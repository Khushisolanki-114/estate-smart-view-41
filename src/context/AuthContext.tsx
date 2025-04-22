
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '../components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for frontend demo
const USERS_STORAGE_KEY = 'estate_users';
const CURRENT_USER_KEY = 'estate_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const userExists = existingUsers.some((u: any) => u.email === email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password, // In a real app, NEVER store passwords in plain text
      };
      
      // Save user to "database"
      localStorage.setItem(
        USERS_STORAGE_KEY, 
        JSON.stringify([...existingUsers, newUser])
      );
      
      // Create user session
      const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
      
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
      setUser(userSession);
      
      toast({
        title: "Account created!",
        description: "You're now signed in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign up",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user
      const existingUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const foundUser = existingUsers.find(
        (u: any) => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create user session
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      };
      
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
      setUser(userSession);
      
      toast({
        title: "Welcome back!",
        description: "You're now signed in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    toast({
      title: "Signed out",
      description: "You've been signed out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

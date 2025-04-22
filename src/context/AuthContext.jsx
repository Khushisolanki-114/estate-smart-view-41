
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '../components/ui/use-toast';

const AuthContext = createContext();

const USERS_STORAGE_KEY = 'estate_users';
const CURRENT_USER_KEY = 'estate_current_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const userExists = existingUsers.some(u => u.email === email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password,
      };
      
      localStorage.setItem(
        USERS_STORAGE_KEY, 
        JSON.stringify([...existingUsers, newUser])
      );
      
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
        description: error.message || "Failed to sign up",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const foundUser = existingUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
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
        description: error.message || "Failed to sign in",
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

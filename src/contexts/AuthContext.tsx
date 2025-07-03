import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const usersMock = [
  { email: "dearborn-22022@qargocoffee.com", password: "123456", role: "franchisee", name: "Prestige Cafe" },
  { email: "admin@tienda.com", password: "admin123", role: "admin", name: "Admin General" }
];

const LOCAL_STORAGE_KEY = 'auth_state';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedAuth) {
      try {
        const { user } = JSON.parse(savedAuth);
        return user;
      } catch (e) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await mockAuthAPI.login(email, password);
      setUser(user);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ user }));
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true);
    try {
      const user = await mockAuthAPI.register(name, email, password, role);
      setUser(user);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ user }));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock function for demo purposes
const mockAuthAPI = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = usersMock.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    return {
      id: Math.random().toString(),
      email: user.email,
      name: user.name,
      role: user.role as 'admin' | 'supplier' | 'franchisee',
      createdAt: new Date().toISOString()
    };
  },
  register: async (name: string, email: string, password: string, role: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add to mock users (in a real application this would be saved in the database)
    const newUser = {
      email,
      password,
      role,
      name
    };
    
    usersMock.push(newUser);
    
    return {
      id: Math.random().toString(),
      name,
      email,
      role: role as 'admin' | 'supplier' | 'franchisee',
      createdAt: new Date().toISOString(),
    };
  }
};
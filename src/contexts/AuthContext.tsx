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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const usersMock = [
  { email: "franchisee@tienda.com", password: "123456", role: "franchisee", name: "franchisee Nort" },
  { email: "admin@tienda.com", password: "admin123", role: "admin", name: "Admin General" }
];

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
    
    // Mock user data
    return {
      id: '1',
      name,
      email,
      role: role as 'admin' | 'supplier' | 'franchisee',
      createdAt: new Date().toISOString(),
    };
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored session on mount
    const storedUser = localStorage.getItem('qargo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await mockAuthAPI.login(email, password);
      setUser(user);
      localStorage.setItem('qargo_user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed:', error);
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
      localStorage.setItem('qargo_user', JSON.stringify(user));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('qargo_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
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
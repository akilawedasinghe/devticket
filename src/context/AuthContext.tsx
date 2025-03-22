
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '@/lib/auth-types';

// Define mock users 
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    department: 'IT',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'support@example.com',
    name: 'Support Agent',
    role: 'support',
    department: 'Customer Service',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'client@example.com',
    name: 'Client User',
    role: 'client',
    created_at: new Date().toISOString(),
  },
  // Additional demo users
  {
    id: '4',
    email: 'john.smith@company.com',
    name: 'John Smith',
    role: 'client',
    department: 'Finance',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    email: 'sarah.tech@example.com',
    name: 'Sarah Tech',
    role: 'support',
    department: 'Technical Support',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    email: 'director@example.com',
    name: 'System Director',
    role: 'admin',
    department: 'Executive',
    created_at: new Date().toISOString(),
  },
];

// Default context state
const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => null,
  logout: async () => {},
  register: async () => {},
  loading: true,
  getAllUsers: async () => [],
  createUser: async () => ({ id: '', email: '', name: '', role: 'client' }),
  updateUser: async () => ({ id: '', email: '', name: '', role: 'client' }),
  deleteUser: async () => {},
};

// Create auth context
const AuthContext = createContext<AuthContextType>(defaultContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  // Check for stored authentication on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Get from localStorage
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            console.log("User loaded from localStorage:", JSON.parse(storedUser));
          } catch (e) {
            console.error('Failed to parse stored user:', e);
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Login function - use mock users only
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting login with:", email);
      
      // Allow login with any password for demo purposes
      const mockUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (mockUser) {
        console.log("Mock user login successful");
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Clear user state and local storage
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function - creates a new mock user
  const register = async (email: string, password: string, name: string, role: string, department?: string) => {
    setLoading(true);
    try {
      const newMockUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        role: role as 'admin' | 'client' | 'support',
        department,
        created_at: new Date().toISOString(),
      };
      
      mockUsers.push(newMockUser);
      setUser(newMockUser);
      localStorage.setItem('user', JSON.stringify(newMockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get all users
  const getAllUsers = async (): Promise<User[]> => {
    return [...mockUsers];
  };

  // Create a new user
  const createUser = async (userData: Partial<User>): Promise<User> => {
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email || '',
      name: userData.name || '',
      role: userData.role || 'client',
      department: userData.department,
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    return newUser;
  };

  // Update a user
  const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {...mockUsers[userIndex], ...userData};
    mockUsers[userIndex] = updatedUser;
    
    // If updating the current user, update state
    if (user && user.id === id) {
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return updatedUser;
  };

  // Delete a user
  const deleteUser = async (id: string): Promise<void> => {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(userIndex, 1);
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading: loading,
    login,
    logout,
    register,
    loading,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

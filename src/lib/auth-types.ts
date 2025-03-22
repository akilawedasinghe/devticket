// Auth related types for the application

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'support';
  avatar?: string;
  department?: string;
  created_at?: string;
}

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role: string, department?: string) => Promise<void>;
  loading: boolean; // This seems redundant with isLoading but keeping for backward compatibility
  getAllUsers: () => Promise<User[]>;
  createUser: (userData: Partial<User>) => Promise<User>;
  updateUser: (id: string, userData: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
};

// This interface might be duplicating functionality from types.ts
// But we're keeping it for backward compatibility
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_by: string;
  assigned_to?: string;
  created_at: string;
  updated_at?: string;
  category: string;
  reporter?: string;
  assignedAgent?: string;
}

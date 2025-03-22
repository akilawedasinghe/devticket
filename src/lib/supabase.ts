
import { createClient } from '@supabase/supabase-js';

// Create a non-functional client since we're using mock data only
export const supabase = createClient(
  'https://example.supabase.co',
  'dummy-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

console.warn('Using mock authentication system. No actual Supabase connection.');

// Mock implementation that always returns 'client' role
export const getUserRole = async (userId: string): Promise<'admin' | 'client' | 'support' | null> => {
  // Check mock users (this would be handled by the AuthContext)
  const mockUsers = [
    { id: '1', role: 'admin' as const },
    { id: '2', role: 'support' as const },
    { id: '3', role: 'client' as const },
  ];
  
  const foundUser = mockUsers.find(user => user.id === userId);
  return foundUser?.role || 'client';
};

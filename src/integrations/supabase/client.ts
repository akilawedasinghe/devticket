
// This is a placeholder file for the Supabase client
// Since we're not using Supabase currently, we're providing a minimal implementation

export const supabaseClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signOut: async () => ({ error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          data: [],
          error: null,
        }),
      }),
    }),
  }),
};

export default supabaseClient;

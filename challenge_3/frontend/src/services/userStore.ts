import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_URL } from '../utils/ApiUrl';

// User interface representing a user entity from the backend
export interface User {
  id: number;
  name: string;
  email: string;
  affiliate: boolean;
  preferences: { name: string }[];
}

// Preference interface representing individual user preference options
export interface Preference {
  id: number;
  name: string;
}

// Zustand store interface defining all state variables and actions
interface UserStore {
  users: User[];
  preferences: Preference[];
  addUser: (userData: Omit<User, 'id' | 'preferences'> & { preferences: number[] }) => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchPreferences: () => Promise<void>;

  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  error: string | null;
  clearError: () => void;
}

// Create the Zustand store with persistence to localStorage under 'user-storage'
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      preferences: [],
      error: null,

      // Clear any error message
      clearError: () => set({ error: null }),

      // Add a user by sending POST request to API
      addUser: async (userData) => {
        try {
          const response = await fetch(`${API_URL}/api/post_user/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            set({ error: errorData.error || 'Unknown error' });
            return;
          }

          const newUser = await response.json();
          set((state) => ({
            users: [...state.users, newUser],
            error: null,
          }));
        } catch (err: any) {
          set({ error: err.message || 'Request failed' });
        }
      },

      // Fetch all users from the backend API and update state
      fetchUsers: async () => {
        try {
          const response = await fetch(`${API_URL}/api/get_users/`);
          const data = await response.json();
          set({ users: data.users, error: null });
        } catch (err: any) {
          set({ error: err.message || 'Failed to fetch users' });
        }
      },

      // Fetch all preferences from backend API and update state
      fetchPreferences: async () => {
        try {
          const response = await fetch(`${API_URL}/api/get_preferences/`);
          const data = await response.json();
          set({ preferences: data, error: null });
        } catch (err: any) {
          set({ error: err.message || 'Failed to fetch preferences' });
        }
      },


      selectedUser: null,
      setSelectedUser: (user) => set({ selectedUser: user }),
    }),
    {
      name: 'user-storage', // Name for localStorage persistence key
    }
  )
);

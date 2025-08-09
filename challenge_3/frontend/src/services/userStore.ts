// src/store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  name: string;
  email: string;
  affiliate: boolean;
  preferences: string[];
}

export interface Preference {
  id: number;
  name: string;
  image: string; 
}

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

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      preferences: [],
      error: null,

      clearError: () => set({ error: null }),

      addUser: async (userData) => {
        try {
          const response = await fetch('http://localhost:8000/api/post_user/', {
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

      fetchUsers: async () => {
        try {
          const response = await fetch('http://localhost:8000/api/get_users/');
          const data = await response.json();
          set({ users: data, error: null });
        } catch (err: any) {
          set({ error: err.message || 'Failed to fetch users' });
        }
      },

      fetchPreferences: async () => {
        try {
          const response = await fetch('http://localhost:8000/api/get_preferences/');
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
      name: 'user-storage',
    }

  )
);

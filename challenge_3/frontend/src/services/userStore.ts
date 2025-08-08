// src/store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id?: number;
  name: string;
  email: string;
  affiliate: boolean;
  preferences: string[];
}

interface UserStore {
  users: User[];
  addUser: (userData: Omit<User, 'id' | 'preferences'> & { preferences: number[] }) => Promise<void>;
  fetchUsers: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
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
        } catch (err) {
          set({ error: err.error });
        }
      },

      fetchUsers: async () => {
        try {
          const response = await fetch('http://localhost:8000/api/get_users/');
          const data = await response.json();
          set({ users: data, error: null });
        } catch (err) {
          set({ error: err.error });
        }
      },
    }),
    {
      name: 'user-storage', // nombre clave en localStorage
    }
  )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user.type';


interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  signIn: (user: User) => void;
  signInAsGuest: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isGuest: false,
      signIn: (user) => set({ user, isAuthenticated: true, isGuest: false }),
      signInAsGuest: () => set({ user: { id: 'guest', name: 'Guest' }, isAuthenticated: true, isGuest: true }),
      signOut: () => set({ user: null, isAuthenticated: false, isGuest: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
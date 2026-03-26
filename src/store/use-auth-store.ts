import { create } from 'zustand';
import { User } from '@/types/user.type';


interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  signIn: (user: User) => void;
  signInAsGuest: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isGuest: false,
  signIn: (user) => set({ user, isAuthenticated: true, isGuest: false }),
  signInAsGuest: () => set({ user: { id: 'guest', name: 'Guest' }, isAuthenticated: true, isGuest: true }),
  signOut: () => set({ user: null, isAuthenticated: false, isGuest: false }),
}));
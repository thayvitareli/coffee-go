import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoffeeShop } from '@/features/home/home.model';

interface FavoritesState {
  favorites: CoffeeShop[];
  addFavorite: (shop: CoffeeShop) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (shop) => set((state) => ({ favorites: [...state.favorites, shop] })),
      removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((s) => s.id !== id) })),
      isFavorite: (id) => get().favorites.some((s) => s.id === id),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

import { create } from 'zustand';
import { CoffeeShop } from '@/features/home/home.model';

interface FavoritesState {
  favorites: CoffeeShop[];
  addFavorite: (shop: CoffeeShop) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (shop) => set((state) => ({ favorites: [...state.favorites, shop] })),
  removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((s) => s.id !== id) })),
  isFavorite: (id) => get().favorites.some((s) => s.id === id),
}));

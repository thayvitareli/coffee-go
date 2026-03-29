import { create } from 'zustand';
import { CoffeeShop } from '@/features/home/home.model';

interface VisitedState {
  visitedShops: CoffeeShop[];
  addVisited: (shop: CoffeeShop) => void;
  removeVisited: (id: string) => void;
  isVisited: (id: string) => boolean;
}

export const useVisitedStore = create<VisitedState>((set, get) => ({
  visitedShops: [],
  addVisited: (shop) => set((state) => ({ visitedShops: [...state.visitedShops, shop] })),
  removeVisited: (id) => set((state) => ({ visitedShops: state.visitedShops.filter((s) => s.id !== id) })),
  isVisited: (id) => get().visitedShops.some((s) => s.id === id),
}));

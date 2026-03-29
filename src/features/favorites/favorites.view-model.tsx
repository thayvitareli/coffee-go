import { router } from 'expo-router';
import { useFavoritesStore } from '@/store/use-favorites-store';
import { CoffeeShop } from '@/features/home/home.model';

export const useFavoritesViewModel = () => {
    const favorites = useFavoritesStore(state => state.favorites);
    const removeFavorite = useFavoritesStore(state => state.removeFavorite);

    const handleNavigateToDetails = (coffeeShop: CoffeeShop) => {
        router.push(`/details/${coffeeShop.id}` as any);
    };

    const handleRemoveFavorite = (id: string) => {
        removeFavorite(id);
    };

    return {
        favorites,
        handleNavigateToDetails,
        handleRemoveFavorite
    };
};

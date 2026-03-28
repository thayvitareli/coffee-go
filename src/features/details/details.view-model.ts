import { fetchCoffeeShopById } from '@/services/places.service';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

export const useDetailsViewModel = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: coffeeShop, isLoading, error } = useQuery({
        queryKey: ['coffeeShop', id],
        queryFn: () => {
            if (!id) return null;
            return fetchCoffeeShopById(id);
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    return {
        coffeeShop,
        isLoading,
        error,
    };
};

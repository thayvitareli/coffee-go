import { useLocationPermission } from '@/hooks/useLocationPermission';
import { fetchNearbyCoffeeShops } from '@/services/places.service';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { CoffeeShop } from './home.model';

export const useHomeViewModel = () => {
    const { location, errorMsg, isLoading: isLocationLoading, requestPermissionAndFetchLocation } = useLocationPermission();

    const { data: coffeeShops = [], isLoading: isFetchingPlaces } = useQuery({
        queryKey: ['coffeeShops', location?.coords.latitude, location?.coords.longitude],
        queryFn: async () => {
            if (!location) return [];
            console.log('Location updated, fetching coffee shops...', location.coords.latitude, location.coords.longitude);
            return fetchNearbyCoffeeShops(location.coords.latitude, location.coords.longitude);
        },
        enabled: !!location,
        staleTime: 1000 * 60 * 240, // Cache results for 4 hours
    });

    const handleNavigateToDetails = (coffeeShop: CoffeeShop) => {
        router.push(`/details/${coffeeShop.id}` as any);
        
    }

    return {
        location,
        errorMsg,
        isLoading: isLocationLoading || isFetchingPlaces,
        requestPermissionAndFetchLocation,
        coffeeShops,
        handleNavigateToDetails
    }
}
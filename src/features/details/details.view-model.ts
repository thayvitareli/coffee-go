import { useState } from 'react';
import { Linking, Share } from 'react-native';
import { fetchCoffeeShopById } from '@/services/places.service';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFavoritesStore } from '@/store/use-favorites-store';
import { useVisitedStore } from '@/store/use-visited-store';

export const useDetailsViewModel = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    
    const [showReviews, setShowReviews] = useState(false);

    const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
    const { visitedShops, addVisited, removeVisited } = useVisitedStore();

    const { data: coffeeShop, isLoading, error } = useQuery({
        queryKey: ['coffeeShop', id],
        queryFn: () => {
            if (!id) return null;
            return fetchCoffeeShopById(id);
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const isFav = coffeeShop ? favorites.some(s => s.id === coffeeShop.id) : false;
    const isVis = coffeeShop ? visitedShops.some(s => s.id === coffeeShop.id) : false;

    const toggleFavorite = () => {
        if (!coffeeShop) return;
        if (isFav) {
            removeFavorite(coffeeShop.id);
        } else {
            addFavorite(coffeeShop);
        }
    };

    const toggleVisited = () => {
        if (!coffeeShop) return;
        if (isVis) {
            removeVisited(coffeeShop.id);
        } else {
            addVisited(coffeeShop);
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleHowToArrive = () => {
        if (!coffeeShop) return;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coffeeShop.latitude},${coffeeShop.longitude}`;
        Linking.openURL(url);
    };

    const handleShare = async () => {
        if (!coffeeShop) return;
        try {
            await Share.share({
                message: `Confira a cafeteria ${coffeeShop.displayName} em ${coffeeShop.address}!`,
                url: `https://www.google.com/maps/search/?api=1&query=${coffeeShop.latitude},${coffeeShop.longitude}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return {
        coffeeShop,
        isLoading,
        error,
        isFav,
        isVis,
        showReviews,
        setShowReviews,
        toggleFavorite,
        toggleVisited,
        handleGoBack,
        handleHowToArrive,
        handleShare,
    };
};

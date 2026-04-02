import { useAuthStore } from '@/store/use-auth-store';
import { useVisitedStore } from '@/store/use-visited-store';
import { useRouter } from 'expo-router';
import { CoffeeShop } from '@/features/home/home.model';

export const useProfileViewModel = () => {
    const { user, signOut } = useAuthStore();
    const visitedShops = useVisitedStore(state => state.visitedShops);
    const router = useRouter();
    
    const handleNavigateToDetails = (coffeeShop: CoffeeShop) => {
        router.push(`/details/${coffeeShop.id}` as any);
    };

    const handleSignOut = () => {
        signOut();
        router.replace('/(tabs)' as any);
    };

    return {
        user,
        signOut: handleSignOut,
        visitedShops,
        handleNavigateToDetails
    }
}
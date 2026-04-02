import { useAuthStore } from '@/store/use-auth-store';
import { useVisitedStore } from '@/store/use-visited-store';
import { useRouter } from 'expo-router';
import { CoffeeShop } from '@/features/home/home.model';
import { useTranslation } from 'react-i18next';
export const useProfileViewModel = () => {
    const { user, signOut } = useAuthStore();
    const visitedShops = useVisitedStore(state => state.visitedShops);
    const router = useRouter();
    const { i18n } = useTranslation();
    
    const handleNavigateToDetails = (coffeeShop: CoffeeShop) => {
        router.push(`/details/${coffeeShop.id}` as any);
    };

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const handleSignOut = () => {
        signOut();
        router.replace('/(tabs)' as any);
    };

    return {
        user,
        signOut: handleSignOut,
        visitedShops,
        handleNavigateToDetails,
        changeLanguage,
        currentLanguage: i18n.language
    }
}
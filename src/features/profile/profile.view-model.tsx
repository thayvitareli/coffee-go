import { useAuthStore } from '@/store/use-auth-store';

export const useProfileViewModel = () => {
   const { user, signOut } = useAuthStore();
   
    return {
        user,
        signOut,
    }
}
import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'expo-router';

export function useSignInViewModel() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);
  const signInAsGuest = useAuthStore((state) => state.signInAsGuest);

  const handleGoogleSignIn = () => {
    // Integration with Google Sign-In would go here
    console.log('Google Sign-In pressed');
    signIn({ id: 'google-123', name: 'Google User' });
    router.replace('/(tabs)');
  };


  const handleGuestSignIn = () => {
    console.log('Guest Sign-In pressed');
    signInAsGuest();
    router.replace('/(tabs)');
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return {
    handleGoogleSignIn,
    handleGuestSignIn,
    handleGoBack,
  };
}

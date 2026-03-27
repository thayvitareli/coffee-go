import { useEffect } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'expo-router';
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  isSuccessResponse
} from '@react-native-google-signin/google-signin';

export function useSignInViewModel() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);
  const signInAsGuest = useAuthStore((state) => state.signInAsGuest);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT,
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    console.log('Google Sign-In pressed');
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      
      if (isSuccessResponse(response)) {
        signIn({
          id: response.data.user.id || 'unknown',
          name: response.data.user.name || 'Google User',
        });
        router.replace('/(tabs)');
      } else {
        // Sign in flow was cancelled by user
        console.log('Sign in cancelled');
      }
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('Operation (e.g. sign in) is in progress already');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available or outdated');
            break;
          default:
            console.log('Some other error happened Code:', error.code, error.message);
        }
      } else {
        console.log('An error occurred during Google Sign-In:', error);
      }
    }
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

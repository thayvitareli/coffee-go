import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSignInViewModel } from './sign-in.view-model';
import { useTranslation } from 'react-i18next';

// Unsplash placeholder image resembling the requested mood
const BACKGROUND_IMAGE_URL = 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000';

export function SignInView() {
  const { handleGoogleSignIn, handleGuestSignIn, handleGoBack } = useSignInViewModel();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: BACKGROUND_IMAGE_URL }}
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        {/* Dark gradient/overlay to ensure text readability */}
        <View className="flex-1 bg-black/40">
            {/* Header / Back Button */}
            <View className={`px-6 pt-4 ${Platform.OS === 'android' ? 'mt-8' : 'top-safe'}`}>
              <TouchableOpacity onPress={handleGoBack} className="w-10 h-10 justify-center items-start">
                <Ionicons name="arrow-back" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Main Content Area */}
            <View className="flex-1 justify-center px-8 pb-12">
              <View className="items-center mb-16">
                <Text className="font-serif text-[64px] leading-[72px] tracking-tight text-white font-bold mb-2">
                  COFFEGO
                </Text>
                <Text className="font-sans text-lg text-white/90 tracking-wide text-center">
                  {t('signIn.subtitle')}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="w-full space-y-4 spa">
                {/* Google Button */}
                <TouchableOpacity
                  onPress={handleGoogleSignIn}
                  activeOpacity={0.8}
                  className="flex-row items-center justify-center bg-white py-4 rounded-3xl mb-4"
                >
                  <Ionicons name="logo-google" size={20} color="#EA4335" className="mr-3" />
                  <Text className="font-sans text-base font-semibold text-black ml-2">
                    {t('signIn.googleButton')}
                  </Text>
                </TouchableOpacity>

          
                {/* Guest Button */}
                <TouchableOpacity
                  onPress={handleGuestSignIn}
                  activeOpacity={0.8}
                  className="flex-row items-center justify-center bg-surface-container-high py-4 rounded-3xl"
                >
                  <Ionicons name="person" size={20} color="#1a1c1a" className="mr-3" />
                  <Text className="font-sans text-sm font-bold tracking-widest text-on-surface uppercase ml-2">
                    {t('signIn.guestButton')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View className="items-center mt-12">
                <Text className="font-sans text-sm text-white/70 mb-6">
                  {t('signIn.otherOptions')}
                </Text>
                <View className="flex-row items-center">
                  <Text className="font-sans text-[11px] font-bold tracking-widest text-white/50 uppercase">
                    {t('signIn.privacy')}
                  </Text>
                  <Text className="font-sans text-xs text-white/30 mx-3">•</Text>
                  <Text className="font-sans text-[11px] font-bold tracking-widest text-white/50 uppercase">
                    {t('signIn.terms')}
                  </Text>
                </View>
              </View>
            </View>
        </View>
      </ImageBackground>
    </View>
  );
}

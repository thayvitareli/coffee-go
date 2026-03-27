import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isAuthenticated, isGuest } = useAuthStore();

  const requireAuth = (e: any) => {
    // If user is not authenticated or is browsing as a guest, require explicit login
    if (!isAuthenticated || isGuest) {
      e.preventDefault();
      router.push('/sign-in');
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderTopWidth: 1,
          paddingBottom: 10,
          borderColor: '#e5e7eb',
          borderWidth: 1,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Map',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="map-sharp" color={color} />,
        }}
      />
     
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="heart" color={color} />,
        }}
        listeners={{ tabPress: requireAuth }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
        }}
        listeners={{ tabPress: requireAuth }}
      />
    </Tabs>
  );
}

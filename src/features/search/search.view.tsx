import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSearchViewModel } from './search.view-model';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export default function SearchView() {
  const viewModel = useSearchViewModel();
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    toggleFilter,
    recommended,
    nearby,
    isLoading,
    isPaginating,
    hasMore,
    loadMore
  } = viewModel;

  const { t } = useTranslation();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 150;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (hasMore && !isPaginating) {
        loadMore();
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface font-sans" edges={['top', 'left', 'right']}>
      <View className="flex-1 bg-surface">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-2 pb-4">
          <View className="flex-row items-center">
            <Ionicons name="cafe" size={24} color="black" />
            <Text className="font-serif text-xl font-bold ml-2 tracking-widest">COFFEGO</Text>
          </View>
         
        </View>

        <ScrollView 
           showsVerticalScrollIndicator={false} 
           className="flex-1" 
           contentContainerStyle={{ paddingBottom: 100 }}
           onScroll={handleScroll}
           scrollEventThrottle={16}
        >
          {/* Search Bar */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center bg-[#EDECEB] rounded-full px-4 py-4">
              <Ionicons name="search" size={20} color="gray" />
              <TextInput 
                className="flex-1 ml-3 text-base font-sans text-gray-800"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="gray"
              />
            </View>
          </View>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6 mb-8" contentContainerStyle={{ paddingRight: 24 }}>
            <FilterChip 
              label={t('search.filters.nearMe')} 
              icon={<Ionicons name="navigate" size={16} color={activeFilter === 'nearMe' ? 'white' : 'gray'} />} 
              isActive={activeFilter === 'nearMe'}
              onPress={() => toggleFilter('nearMe')}
            />
            <FilterChip 
              label={t('search.filters.openNow')} 
              icon={<Ionicons name="time" size={16} color={activeFilter === 'openNow' ? 'white' : 'gray'} />} 
              isActive={activeFilter === 'openNow'}
              onPress={() => toggleFilter('openNow')}
            />
            <FilterChip 
              label={t('search.filters.wifi')} 
              icon={<Ionicons name="wifi" size={16} color={activeFilter === 'wifi' ? 'white' : 'gray'} />} 
              isActive={activeFilter === 'wifi'}
              onPress={() => toggleFilter('wifi')}
            />
          </ScrollView>


          {/* Nearby Section */}
          <View className="px-6 mb-6">
            <Text className="font-serif text-3xl font-bold text-primary">{t('search.nearbyRoasteries')}</Text>
          </View>

          <View className="px-6">
            {isLoading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              nearby.map((item: any, index: number) => {
                const distanceStr = item.distanceStr || "Desconhecida"; 
                const ratingStr = item.rating?.toFixed(1) || '4.8';
                
                return (
                  <TouchableOpacity 
                    key={item.id || index} 
                    className="flex-row mb-8 items-center"
                    onPress={() => router.push(`/details/${item.id}` as any)}
                  >
                    
                    <View className="w-32 h-32 rounded-3xl overflow-hidden mr-4 shadow-sm">
                      <Image 
                        source={{ uri: item.photoUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop' }} 
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                      />
                    </View>
                    
                    <View className="flex-1 pr-2">
                      <View className="flex-row items-center mb-1 flex-wrap">
                        <Text className="font-serif text-2xl font-bold flex-shrink mr-2" numberOfLines={2}>{item.displayName}</Text>
                        
                        {item.isOpenNow !== false ? (
                           <View className="bg-[#86f284] px-2 py-0.5 rounded">
                             <Text className="text-[9px] font-bold text-green-800">{t('search.open')}</Text>
                           </View>
                        ) : (
                           <View className="bg-gray-200 px-2 py-0.5 rounded">
                             <Text className="text-[9px] font-bold text-gray-700">{t('search.closed')}</Text>
                           </View>
                        )}
                      </View>
                      
                      <View className="flex-row items-center mb-2 mt-1">
                        <Text className="font-bold text-sm">{ratingStr}</Text>
                        <Ionicons name="star" size={12} color="#FFA500" style={{ marginLeft: 2 }} />
                        <Text className="text-gray-300 mx-2">•</Text>
                        <Text className="text-gray-500 font-sans text-sm">{t('search.distanceAway').replace('{{distance}}', distanceStr)}</Text>
                      </View>

                      <Text className="text-gray-500 font-sans text-sm mt-1 leading-5" numberOfLines={2}>
                        {item.editorialSummary || "Industrial-chic space known for carefully sourced roasts."}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            )}

            {isPaginating && (
              <View className="py-6 items-center justify-center">
                 <ActivityIndicator size="small" color="#000" />
                 <Text className="text-gray-500 text-xs font-sans mt-2">Loading more...</Text>
              </View>
            )}
            
            {!hasMore && nearby.length > 0 && !isLoading && (
              <View className="py-6 items-center justify-center">
                 <Text className="text-gray-400 text-xs font-sans">You've reached the end!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function FilterChip({ label, icon, isActive, onPress }: any) {
  const bg = isActive ? 'bg-[#2A1E1E]' : 'bg-[#EDECEB]';
  const textColor = isActive ? 'text-white' : 'text-gray-700';

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center px-5 py-3 rounded-full mr-3 ${bg}`}
    >
      {icon}
      <Text className={`ml-2 font-sans font-bold text-sm ${textColor}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

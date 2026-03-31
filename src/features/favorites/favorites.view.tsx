import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { CoffeeShop } from '@/features/home/home.model';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface FavoritesViewProps {
    favorites: CoffeeShop[];
    handleNavigateToDetails: (coffeeShop: CoffeeShop) => void;
    handleRemoveFavorite: (id: string) => void;
}

export default function FavoritesView({ favorites, handleNavigateToDetails, handleRemoveFavorite }: FavoritesViewProps) {
    const { t } = useTranslation();

    const renderEmptyComponent = () => (
        <View className="flex-1 items-center justify-center pt-20">
            <Ionicons name="heart-outline" size={64} color="#d3c8c5" />
            <Text className="text-primary text-headline-sm font-serif mt-6 text-center">{t('favorites.emptyTitle')}</Text>
            <Text className="text-on-surface text-base font-sans mt-2 text-center px-8 opacity-70">
                {t('favorites.emptySubtitle')}
            </Text>
        </View>
    );

    const renderItem = ({ item }: { item: CoffeeShop }) => (
        <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={() => handleNavigateToDetails(item)}
            className="bg-white rounded-xl mb-4 shadow-ambient overflow-hidden flex-row"
        >
            {item.photoUrl ? (
                <Image 
                    source={{ uri: item.photoUrl }} 
                    style={{ width: 120, height: '100%' }} 
                    contentFit="cover"
                />
            ) : (
                <View className="w-[120px] h-full bg-surface-container items-center justify-center">
                    <Ionicons name="cafe-outline" size={32} color="#c4c2be" />
                </View>
            )}
            
            <View className="flex-1 p-4 justify-between">
                <View className="flex-row justify-between items-start">
                    <Text className="font-serif text-lg text-primary font-bold flex-1 mr-2" numberOfLines={2}>
                        {item.displayName}
                    </Text>
                    <TouchableOpacity 
                        onPress={() => handleRemoveFavorite(item.id)}
                        className="p-1 -mt-1 -mr-1"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="heart" size={24} color="#271310" />
                    </TouchableOpacity>
                </View>

                <Text className="text-on-surface text-sm font-sans my-2 opacity-80" numberOfLines={1}>
                    {item.address}
                </Text>
                
                <View className="flex-row items-center justify-between">
                    {item.isOpenNow !== undefined ? (
                        <Text className={`text-xs font-bold ${item.isOpenNow ? 'text-green-600' : 'text-red-500'}`}>
                            {item.isOpenNow ? t('favorites.open') : t('favorites.closed')}
                        </Text>
                    ) : <View />}
                    
                    {item.rating && (
                        <Text className="text-xs text-yellow-600 font-bold">★ {item.rating} ({item.userRatingCount || 0})</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-surface">
            <View className="px-6 pt-6 pb-4">
                <Text className="text-primary text-headline-md font-serif font-bold">{t('favorites.title')}</Text>
            </View>
            
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyComponent}
            />
        </SafeAreaView>
    );
}

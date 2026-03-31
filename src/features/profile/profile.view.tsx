import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from '@/types/user.type'
import { Pressable, Text, View, FlatList, TouchableOpacity } from "react-native";
import { CoffeeShop } from '@/features/home/home.model';
import { Ionicons } from '@expo/vector-icons';
import { useProfileViewModel } from "./profile.view-model";
import { useTranslation } from 'react-i18next';

type ProfileViewProps = ReturnType<typeof useProfileViewModel>;

export default function ProfileView({ 
    user, 
    signOut, 
    visitedShops, 
    handleNavigateToDetails 
}: ProfileViewProps) {
    const { t } = useTranslation();
    
    const renderHeader = () => (
        <View className="items-center w-full mb-6">
            <View className="items-center gap-4 mt-6 w-full">
                {user?.avatar ? 
                    <Image source={user.avatar} style={{ width: 100, height: 100, borderRadius: 50 }}/> :
                    <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center">
                        <Text className="text-primary text-headline-sm font-serif">{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
                    </View>
                }
                <Text className="text-primary text-headline-sm font-serif">{user?.name}</Text>
                
                <Pressable className="bg-primary rounded-lg px-6 py-2 mt-2" onPress={signOut} >
                    <Text className="text-on-primary text-label-md uppercase font-bold tracking-widest">{t('profile.logout')}</Text>
                </Pressable>
            </View>
            
            <View className="w-full mt-10 px-2 flex-row justify-between items-center">
                <Text className="text-primary font-serif font-bold text-lg">{t('profile.historyTitle')}</Text>
                <Text className="text-primary font-sans text-xs bg-surface-container px-2 py-1 rounded-md">{visitedShops.length}</Text>
            </View>
        </View>
    );

    const renderEmptyComponent = () => (
        <View className="items-center justify-center pt-10">
            <Ionicons name="map-outline" size={48} color="#d3c8c5" />
            <Text className="text-primary text-base font-serif mt-4 text-center">{t('profile.emptyHistoryTitle')}</Text>
            <Text className="text-on-surface text-sm font-sans mt-2 text-center px-8 opacity-70">
                {t('profile.emptyHistorySubtitle')}
            </Text>
        </View>
    );

    const renderItem = ({ item }: { item: CoffeeShop }) => (
        <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={() => handleNavigateToDetails(item)}
            className="bg-white rounded-xl mb-3 shadow-sm overflow-hidden flex-row border border-surface-container"
        >
            {item.photoUrl ? (
                <Image 
                    source={{ uri: item.photoUrl }} 
                    style={{ width: 80, height: '100%' }} 
                    contentFit="cover"
                />
            ) : (
                <View className="w-[80px] h-full bg-surface-container items-center justify-center">
                    <Ionicons name="cafe-outline" size={24} color="#c4c2be" />
                </View>
            )}
            
            <View className="flex-1 p-3 justify-center">
               <Text className="font-serif text-base text-primary font-bold" numberOfLines={1}>
                   {item.displayName}
               </Text>
               <Text className="text-on-surface text-xs font-sans mt-1 opacity-80" numberOfLines={1}>
                   {item.address}
               </Text>
            </View>
            <View className="justify-center px-4">
                <Ionicons name="chevron-forward" size={16} color="#c4c2be" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-surface">
            <FlatList
                data={visitedShops}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponentStyle={{ alignItems: 'center', width: '100%' }}
            />
        </SafeAreaView>
    )
}
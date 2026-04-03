import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CoffeeShop } from './home.model';
import { GeolocationResponse } from '@react-native-community/geolocation';

export default function HomeView({handleNavigateToDetails, coffeeShops, location, errorMsg, isLoading, requestPermissionAndFetchLocation}: {handleNavigateToDetails: (coffeeShop: CoffeeShop) => void, coffeeShops: CoffeeShop[], location: GeolocationResponse | null, errorMsg: string | null, isLoading: boolean, requestPermissionAndFetchLocation: () => void}) {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 items-center justify-center bg-surface">
            {isLoading ? (
                <>
                    <ActivityIndicator size="large" color="#271310" />
                    <Text className="text-secondary-fixed-dim text-label-md mt-4">Buscando localização...</Text>
                </>
            ) : errorMsg ? (
                <>
                    <Text className="text-red-500 font-sans text-lg mb-4 text-center px-10">{errorMsg}</Text>
                    <TouchableOpacity 
                        className="bg-primary rounded-xl px-6 py-3"
                        onPress={requestPermissionAndFetchLocation}
                    >
                        <Text className="text-on-primary text-label-md uppercase font-bold tracking-widest">Tentar novamente</Text>
                    </TouchableOpacity>
                </>
            ) : location ? (
                <>
                    <MapView
                        style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0 }}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        showsUserLocation={false}
                        // provider={PROVIDER_GOOGLE}
                    >
                        {/* Custom User Location Marker */}
                        <Marker 
                            coordinate={{ 
                                latitude: location.coords.latitude, 
                                longitude: location.coords.longitude 
                            }}
                            zIndex={999}
                        >
                            <View className="items-center justify-center">
                                <View className="w-10 h-10 rounded-full bg-[#86f284]/40 absolute" />
                                <View className="w-6 h-6 rounded-full bg-[#86f284] border-white border-[3px] shadow-sm" />
                            </View>
                        </Marker>

                        {coffeeShops.map((shop) => (
                            <Marker
                                key={shop.id}
                                coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
                            >
                                <View className="w-7 h-7 rounded-full bg-primary/80 justify-center items-center border-white border-2" >
                                    <SimpleLineIcons name="cup" size={12} color="white"  />
                                </View>
                                <Callout 
                                    tooltip
                                    onPress={() => handleNavigateToDetails(shop)}
                                >
                                    <View className="bg-white rounded-xl p-3 w-60 shadow-lg items-center">
                                        {shop.photoUrl && (
                                            <Image 
                                                source={{ uri: shop.photoUrl }} 
                                                style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }} 
                                                contentFit="cover"
                                            />
                                        )}
                                        <Text className="font-serif text-lg text-primary text-center font-bold mb-1">{shop.displayName}</Text>
                                        
                                        <View className="flex-row items-center px-2 justify-between w-full">
                                            {shop.isOpenNow !== undefined && (
                                                <Text className={`text-xs font-bold ${shop.isOpenNow ? 'text-green-600' : 'text-red-500'}`}>
                                                    {shop.isOpenNow ? 'Aberto' : 'Fechado'}
                                                </Text>
                                            )}
                                            {shop.rating && (
                                                <Text className="text-xs text-yellow-600 font-bold">★ {shop.rating} ({shop.userRatingCount})</Text>
                                            )}
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        ))}
                    </MapView>
                    
                    <View 
                        className="absolute w-full items-center pointer-events-none" 
                        style={{ top: Math.max(insets.top, 20) }}
                        pointerEvents="none"
                    >
                        <View className="bg-white/80 px-6 py-2 rounded-full shadow-ambient backdrop-blur-lg">
                            <Text className="font-serif text-xl font-bold text-primary tracking-widest uppercase">
                                Coffee Go
                            </Text>
                        </View>
                    </View>
                </>
           
            ) : (
                <Text className="text-primary text-headline-sm font-serif">Bem-vindo(a)</Text>
            )}
        </View>
    )
}
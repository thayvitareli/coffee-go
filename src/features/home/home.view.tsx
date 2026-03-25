import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHomeViewModel } from "./home.view-model";

export default function HomeView() {
    const { location, errorMsg, isLoading, requestPermissionAndFetchLocation, coffeeShops } = useHomeViewModel();

    console.log(coffeeShops);
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-surface">
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
                
                    <MapView
                        style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0 }}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        showsUserLocation={true}
                        // provider={PROVIDER_GOOGLE}
                    >
                        {coffeeShops.map((shop) => (
                            <Marker
                                
                                key={shop.id}
                                coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
                                title={shop.displayName}
                                description={shop.address}
                            >
                                <View className="w-7 h-7 rounded-full bg-primary/80 justify-center items-center border-white border-2" >
<SimpleLineIcons name="cup" size={12} color="white"  />
                                </View>
                            </Marker>
                        ))}
                    </MapView>
                    
           
            ) : (
                <Text className="text-primary text-headline-sm font-serif">Bem-vindo(a)</Text>
            )}
        </SafeAreaView>
    )
}
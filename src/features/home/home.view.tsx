import { Text, ActivityIndicator, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useHomeViewModel } from "./home.view-model"

export default function HomeView() {
    const { location, errorMsg, isLoading, requestPermissionAndFetchLocation } = useHomeViewModel();

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
                <>
                    <Text className="text-primary text-headline-md font-serif text-center mb-6">Mapa Liberado</Text>
                    <Text className="text-on-surface text-label-md uppercase tracking-widest mt-2 mb-1">Coordenadas Atuais:</Text>
                    <Text className="text-on-surface text-label-md">Lat: {location.coords.latitude.toFixed(4)}</Text>
                    <Text className="text-on-surface text-label-md">Lng: {location.coords.longitude.toFixed(4)}</Text>
                </>
            ) : (
                <Text className="text-primary text-headline-sm font-serif">Bem-vindo(a)</Text>
            )}
        </SafeAreaView>
    )
}
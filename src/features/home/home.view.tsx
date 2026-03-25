import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeView() {
    return <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <Text className="text-primary text-2xl font-bold">Welcome</Text>
    </SafeAreaView>
}
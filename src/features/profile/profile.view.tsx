
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from '@/types/user.type'
import {  Pressable, Text, View } from "react-native";

export default function ProfileView({ user, signOut }: { user: User | null, signOut: () => void }) {
    return (
        <SafeAreaView className="flex-1 items-center gap-5 bg-surface mb-safe">
           
           <View className="items-center gap-4">

          {user?.avatar ? <Image source={user.avatar} style={{ width: 100, height: 100, borderRadius: 50 }}/> :

<View className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
            <Text className="text-primary text-headline-sm font-serif">{user?.name.charAt(0).toUpperCase()}</Text>
          </View>
        }
        <Text className="text-primary text-headline-sm font-serif">{user?.name}</Text>
        </View>
        <Pressable className="bg-primary rounded-lg px-6 py-3 mb-safe " onPress={signOut} >
            <Text className="text-on-primary text-label-md uppercase font-bold tracking-widest">Sair</Text>
        </Pressable>
        </SafeAreaView>
    )
}
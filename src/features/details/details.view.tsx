import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDetailsViewModel } from './details.view-model';

export default function DetailsView({
    coffeeShop,
    isLoading,
    isFav,
    isVis,
    showReviews,
    setShowReviews,
    toggleFavorite,
    toggleVisited,
    handleGoBack,
    handleHowToArrive,
    handleShare
}: ReturnType<typeof useDetailsViewModel>) {
    const scrollViewRef = useRef<ScrollView>(null);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-surface">
                <Text className="text-primary font-sans">Carregando...</Text>
            </View>
        );
    }

    if (!coffeeShop) {
        return (
            <View className="flex-1 justify-center items-center bg-surface">
                <Text className="text-primary font-sans">Cafeteria não encontrada.</Text>
                <TouchableOpacity onPress={handleGoBack} className="mt-4">
                    <Text className="text-primary font-bold">Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-surface">
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                {/* Hero Image Section */}
                <View className="relative w-full h-80">
                    <Image
                        source={{ uri: coffeeShop.photoUrl || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop' }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                    />
                    
                    {/* Header Overlay */}
                    <SafeAreaView className="absolute top-0 left-0 right-0 flex-row justify-between items-center px-6 pt-4">
                        <TouchableOpacity 
                            onPress={handleGoBack}
                            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center backdrop-blur-md"
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        
                        
                        <View className="flex-row gap-4">
                            <TouchableOpacity 
                                onPress={toggleFavorite}
                                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center backdrop-blur-md"
                            >
                                <Ionicons name={isFav ? "heart" : "heart-outline"} size={24} color={isFav ? "red" : "white"} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

                {/* Info Card Overlay */}
                <View className="-mt-12 mx-6 bg-white rounded-xl shadow-ambient p-6 items-center">
                    <View className="flex-row items-start justify-between w-full mb-3">
                        {coffeeShop.isOpenNow !== undefined ? (
                            <View className={`px-3 py-1 rounded-full self-start ${coffeeShop.isOpenNow ? 'bg-green-100' : 'bg-red-100'}`}>
                                <Text className={`text-[10px] font-bold uppercase tracking-wider ${coffeeShop.isOpenNow ? 'text-green-700' : 'text-red-700'}`}>
                                    {coffeeShop.isOpenNow ? 'Open Now' : 'Closed'}
                                </Text>
                            </View>
                        ) : <View />}
                        
                        <View className="items-end">
                            {coffeeShop.rating && (
                                <View className="flex-row items-center">
                                    <Text className="font-sans font-bold text-xl text-primary mr-1">{coffeeShop.rating}</Text>
                                    <Ionicons name="star" size={16} color="black" />
                                </View>
                            )}
                            {coffeeShop.userRatingCount && (
                                <Text className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">
                                    {coffeeShop.userRatingCount} Reviews
                                </Text>
                            )}
                        </View>
                    </View>

                    <Text className="font-serif text-3xl font-bold text-primary text-left w-full mb-1">
                        {coffeeShop.displayName}
                    </Text>

                    <Text className="text-gray-500 font-sans text-left w-full mb-6 text-sm">
                        {coffeeShop.address}
                    </Text>

                    {/* Amenities Row */}
                    <View className="flex-row w-full justify-between mb-8">
                        <AmenityIcon 
                            icon="wifi" 
                            label="FAST WIFI" 
                            available={true}
                        />
                        <AmenityIcon 
                            icon="paw" 
                            label="PET FRIENDLY" 
                            available={coffeeShop.allowsDogs} 
                        />
                        <AmenityIcon 
                            icon="storefront" 
                            label="OUTDOOR" 
                            available={coffeeShop.outdoorSeating} 
                        />
                    </View>

                    {/* Action Buttons */}
                    <TouchableOpacity 
                        onPress={handleHowToArrive}
                        className="w-full bg-primary rounded-xl py-4 flex-row justify-center items-center mb-3 shadow-sm"
                    >
                        <MaterialCommunityIcons name="directions" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text className="text-white font-sans font-bold text-base">How to arrive</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={toggleVisited}
                        className={`w-full rounded-xl py-4 flex-row justify-center items-center mb-3 shadow-sm ${isVis ? 'bg-[#94f990]' : 'bg-surface-container'}`}
                    >
                        <MaterialCommunityIcons 
                            name={isVis ? "check-circle" : "check-circle-outline"} 
                            size={20} 
                            color={isVis ? "#005313" : "gray"} 
                            style={{ marginRight: 8 }} 
                        />
                        <Text className={`font-sans font-bold text-base ${isVis ? 'text-[#005313]' : 'text-gray-600'}`}>
                            {isVis ? 'Visited' : 'Mark as visited'}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row w-full gap-3">
                        <TouchableOpacity 
                            onPress={handleShare}
                            className="flex-1 bg-surface-container rounded-xl py-3 flex-row justify-center items-center px-1"
                        >
                            <Ionicons name="share-outline" size={18} color="gray" style={{ marginRight: 6 }} />
                            <Text className="text-gray-600 font-sans font-bold text-sm">Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => setShowReviews(true)}
                            className="flex-1 bg-surface-container rounded-xl py-3 flex-row justify-center items-center px-1"
                        >
                            <Ionicons name="chatbubble-outline" size={18} color="gray" style={{ marginRight: 6 }} />
                            <Text className="text-gray-600 font-sans font-bold text-sm">Reviews</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Editorial Summary / Description */}
                {coffeeShop.editorialSummary ? (
                    <View className="px-6 py-8">
                        <Text className="font-serif text-2xl font-bold text-primary mb-2">About</Text>
                        <Text className="text-gray-600 font-sans leading-relaxed">
                            {coffeeShop.editorialSummary}
                        </Text>
                    </View>
                ) : null}

                {/* Reviews Modal */}
                <Modal
                    visible={showReviews}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowReviews(false)}
                >
                    <View className="flex-1 justify-end bg-black/50">
                        <View className="bg-surface rounded-t-3xl h-[80%] p-6">
                            <View className="flex-row justify-between items-center mb-6">
                                <Text className="font-serif text-2xl font-bold text-primary">Reviews</Text>
                                <TouchableOpacity onPress={() => setShowReviews(false)} className="w-8 h-8 rounded-full bg-surface-container items-center justify-center">
                                    <Ionicons name="close" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                            
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {coffeeShop.reviews && coffeeShop.reviews.length > 0 ? (
                                    coffeeShop.reviews.map((review, index) => (
                                        <View key={index} className="bg-surface-container rounded-xl p-4 mb-3">
                                            <View className="flex-row justify-between items-start mb-2">
                                                <Text className="font-sans font-bold text-primary">{review.author}</Text>
                                                <View className="flex-row items-center">
                                                    <Text className="text-xs font-bold text-primary mr-1">{review.rating}</Text>
                                                    <Ionicons name="star" size={12} color="black" />
                                                </View>
                                            </View>
                                            <Text className="text-gray-600 font-sans text-sm mb-2">{review.text}</Text>
                                            <Text className="text-gray-400 font-sans text-xs">{review.relativeTime}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text className="text-gray-500 font-sans text-center mt-10">Nenhuma avaliação disponível.</Text>
                                )}
                                <View className="h-10" />
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <View className="h-20" />
            </ScrollView>
        </View>
    );
}

function AmenityIcon({ icon, label, available }: { icon: any, label: string, available?: boolean }) {
    if (available === false) return null; // Only show what is available
    
    return (
        <View className="flex-1 items-center justify-center p-3 mx-1 max-w-[100px] bg-surface-container rounded-xl">
            <MaterialCommunityIcons name={icon} size={24} color="black" />
            <Text 
                className="text-[8px] font-bold text-center mt-2 text-gray-600 uppercase tracking-tighter w-full"
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {label}
            </Text>
        </View>
    );
}

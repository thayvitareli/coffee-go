import { CoffeeShop } from '../features/home/home.model';

const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchNearby';

export const fetchNearbyCoffeeShops = async (
    latitude: number,
    longitude: number,
    radius: number = 1500
): Promise<CoffeeShop[]> => {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
        console.warn('EXPO_PUBLIC_GOOGLE_PLACES_API_KEY não está configurada.');
        return [];
    }

    const requestBody = {
        includedTypes: ['coffee_shop'],
        maxResultCount: 20,
        locationRestriction: {
            circle: {
                center: {
                    latitude,
                    longitude,
                },
                radius,
            },
        },
    };

    try {
        const response = await fetch(PLACES_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.shortFormattedAddress,places.rating,places.userRatingCount,places.photos,places.regularOpeningHours,places.reviews',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.error('Erro ao buscar cafeterias:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('Detalhes:', errorText);
            return [];
        }

        const data = await response.json();
        const places = data.places || [];

        return places.map((place: any) => {
            let photoUrl;
            if (place.photos && place.photos.length > 0) {
                photoUrl = `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=${apiKey}`;
            }

            return {
                id: place.id,
                displayName: place.displayName?.text || 'Cafeteria sem nome',
                latitude: place.location?.latitude || 0,
                longitude: place.location?.longitude || 0,
                address: place.shortFormattedAddress || '',
                rating: place.rating,
                userRatingCount: place.userRatingCount,
                photoUrl,
                isOpenNow: place.regularOpeningHours?.openNow,
                weekdayDescriptions: place.regularOpeningHours?.weekdayDescriptions,
                reviews: place.reviews ? place.reviews.slice(0, 3).map((r: any) => ({
                    author: r.authorAttribution?.displayName || 'Anônimo',
                    text: r.text?.text || '',
                    rating: r.rating || 0,
                    relativeTime: r.relativePublishTimeDescription || '',
                })) : [],
            };
        });
    } catch (error) {
        console.error('Erro na requisição ao Google Places API:', error);
        return [];
    }
};

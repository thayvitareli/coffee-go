export interface CoffeeShop {
    id: string;
    displayName: string;
    latitude: number;
    longitude: number;
    address: string;
    rating?: number;
    userRatingCount?: number;
    photoUrl?: string;
    isOpenNow?: boolean;
    weekdayDescriptions?: string[];
    reviews?: {
        author: string;
        text: string;
        rating: number;
        relativeTime: string;
    }[];
}

export interface HomeModel {

}
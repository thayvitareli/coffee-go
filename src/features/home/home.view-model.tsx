import { useLocationPermission } from '@/hooks/useLocationPermission';

export const useHomeViewModel = () => {
    const { location, errorMsg, isLoading, requestPermissionAndFetchLocation } = useLocationPermission();

    return {
        location,
        errorMsg,
        isLoading,
        requestPermissionAndFetchLocation
    }
}
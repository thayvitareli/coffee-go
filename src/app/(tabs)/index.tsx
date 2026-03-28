import HomeView from '@/features/home/home.view';
import { useHomeViewModel } from '@/features/home/home.view-model';

export default function HomeScreen() {
  const { handleNavigateToDetails, coffeeShops, location, errorMsg, isLoading, requestPermissionAndFetchLocation } = useHomeViewModel();

  return (
    <HomeView handleNavigateToDetails={handleNavigateToDetails} coffeeShops={coffeeShops} location={location} errorMsg={errorMsg} isLoading={isLoading} requestPermissionAndFetchLocation={requestPermissionAndFetchLocation} />
  );
}

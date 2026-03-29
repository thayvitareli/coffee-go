import FavoritesView from '@/features/favorites/favorites.view';
import { useFavoritesViewModel } from '@/features/favorites/favorites.view-model';

export default function FavoritesScreen() {
  const { favorites, handleNavigateToDetails, handleRemoveFavorite } = useFavoritesViewModel();

  return (
    <FavoritesView 
      favorites={favorites} 
      handleNavigateToDetails={handleNavigateToDetails} 
      handleRemoveFavorite={handleRemoveFavorite} 
    />
  );
}

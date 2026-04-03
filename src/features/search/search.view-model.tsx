import { useState, useEffect, useMemo } from 'react';
import { CoffeeShop } from '../home/home.model';
import { fetchNearbyCoffeeShops } from '@/services/places.service';
import { useLocationPermission } from '@/hooks/useLocationPermission';

export interface CoffeeShopWithDistance extends CoffeeShop {
  distanceStr?: string;
  distanceKm?: number;
}

const computeDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
};

const formatDistance = (d: number) => {
  if (d < 1) {
    return `${Math.round(d * 1000)}m`;
  }
  return `${d.toFixed(1)}km`;
};

export const useSearchViewModel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>('nearMe');
  const [recommended, setRecommended] = useState<CoffeeShopWithDistance[]>([]);
  const [allNearby, setAllNearby] = useState<CoffeeShopWithDistance[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [itemsLimit, setItemsLimit] = useState(5);
  const [isPaginating, setIsPaginating] = useState(false);
  const { location, isLoading: isLocationLoading } = useLocationPermission();

  useEffect(() => {
    const loadPlaces = async () => {
      if (!location) return;
      setIsDataLoading(true);
      try {
        const data = await fetchNearbyCoffeeShops(location.coords.latitude, location.coords.longitude, 2000);
        
        const dataWithDistance = data.map(shop => {
          const d = computeDistanceKm(
            location.coords.latitude, location.coords.longitude,
            shop.latitude, shop.longitude
          );
          return {
            ...shop,
            distanceKm: d,
            distanceStr: formatDistance(d)
          }
        });

        // Mocking: first 3 for recommended, next for nearby
        setRecommended(dataWithDistance.slice(0, 3));
        setAllNearby(dataWithDistance.slice(3, 20));
      } catch (e) {
        console.error(e);
      } finally {
        setIsDataLoading(false);
      }
    };
    loadPlaces();
  }, [location]);

  // Redefinir limite quando mudar a busca ou os filtros
  useEffect(() => {
    setItemsLimit(5);
  }, [searchQuery, activeFilter]);

  const { paginatedNearby, hasMore } = useMemo(() => {
    let result = [...allNearby];

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter(shop => 
        shop.displayName.toLowerCase().includes(q) ||
        (shop.address && shop.address.toLowerCase().includes(q)) ||
        (shop.editorialSummary && shop.editorialSummary.toLowerCase().includes(q))
      );
    }

    if (activeFilter === 'nearMe') {
      result = result.filter(shop => shop.distanceKm !== undefined && shop.distanceKm <= 1);
    } else if (activeFilter === 'openNow') {
      result = result.filter(shop => shop.isOpenNow === true);
    } else if (activeFilter === 'wifi') {
      // Como a API não retorna wifi nos campos básicos de forma barata, simulamos o filtro 
      // para efeito de demonstração na UI (ex: apenas idares pares ou baseados num hash)
      result = result.filter(shop => (shop.displayName.length % 2 === 0));
    }

    // Ordenar resultados com base no contexto
    result.sort((a, b) => {
      if (activeFilter === 'nearMe') {
        const distA = a.distanceKm ?? Number.MAX_VALUE;
        const distB = b.distanceKm ?? Number.MAX_VALUE;
        return distA - distB;
      } else {
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;
        return ratingB - ratingA;
      }
    });

    return {
      paginatedNearby: result.slice(0, itemsLimit),
      hasMore: itemsLimit < result.length
    };
  }, [allNearby, searchQuery, activeFilter, itemsLimit]);

  const toggleFilter = (filterId: string) => {
    setActiveFilter(prev => prev === filterId ? null : filterId);
  };

  const loadMore = () => {
    if (hasMore && !isPaginating) {
      setIsPaginating(true);
      setTimeout(() => {
        setItemsLimit(prev => prev + 5);
        setIsPaginating(false);
      }, 800); // Simulando delay de rede ao "buscar"
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    toggleFilter,
    recommended,
    nearby: paginatedNearby,
    isLoading: isDataLoading || isLocationLoading,
    isPaginating,
    hasMore,
    loadMore
  };
};

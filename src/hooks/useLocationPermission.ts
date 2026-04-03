import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocationPermission = () => {
  // Alterado para usar o tipo correspondente do expo-location. 
  // A estrutura (location.coords.latitude/longitude) continua exatamente a mesma.
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const requestPermissionAndFetchLocation = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permissão de acesso à localização foi negada.');
        setIsLoading(false);
        return false;
      }

      try {
        // No Android, Balanced Accuracy costuma ser instantâneo e não dá os timeouts
        // frequentes que ocorrem quando há exigência de GPS estrito via hardware.
        const currentPosition = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        setLocation(currentPosition);
      } catch (locationError: any) {
        // Plano de contingência caso ainda haja problema obter ao vivo, pega a última localização registrada
        const lastKnown = await Location.getLastKnownPositionAsync();
        if (lastKnown) {
          setLocation(lastKnown);
        } else {
          setErrorMsg(`Erro ao obter a localização: ${locationError.message}`);
        }
      }

      setIsLoading(false);
      return true;
    } catch (err) {
      setErrorMsg('Erro inesperado ao solicitar permissão.');
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    requestPermissionAndFetchLocation();
  }, []);

  return {
    location,
    errorMsg,
    isLoading,
    requestPermissionAndFetchLocation,
  };
};

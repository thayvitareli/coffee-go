import { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

export const useLocationPermission = () => {
  const [location, setLocation] = useState<GeolocationResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const requestPermissionAndFetchLocation = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'O aplicativo precisa de acesso à sua localização para mostrar os itens próximos.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setErrorMsg('Permissão de acesso à localização foi negada.');
          setIsLoading(false);
          return false;
        }
      } else if (Platform.OS === 'ios') {
        // No iOS, se não estiver usando o template nativo, normalmente a biblioteca gerencia, 
        // mas explicitamos o request de qualquer forma.
        Geolocation.requestAuthorization();
      }

      // Buscar localização
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          setIsLoading(false);
        },
        (error) => {
          setErrorMsg(`Erro ao obter a localização: ${error.message}`);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      
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

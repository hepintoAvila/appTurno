/* eslint-disable default-case */
import { useCallback, useEffect, useState } from 'react';
import encodeBasicUrl from '../utils/encodeBasicUrl';
import { APICore } from '../helpers/api/apiCore';

const api = new APICore();

export const useReportes = () => {
  const [isLoading, setLoading] = useState(false);
  const [itemsConsulta, setConsulta] = useState([]);
  const [itemsGraficos, setGenereGrafico] = useState([]);

  const queryReporte = useCallback((itemUrl, tipo, opcion) => {
    setLoading(true);
    let varibles;
    let datos = opcion;

    if (opcion) {
      var queryString = datos[0]
        ? Object.keys(datos[0])
          .map((key) => key + '=' + btoa(datos[0][key]))
          .join('&')
        : '';
      varibles = queryString;
    }

    let userInfo = sessionStorage.getItem('hyper_user');
    const user = JSON.parse(userInfo);

    if (user) {
      const url = `accion=${encodeBasicUrl(itemUrl)}&tipo=${encodeBasicUrl(tipo)}&${varibles}&entidad=${encodeBasicUrl(user[0]?.entidad)}&idUsuario=${encodeBasicUrl(user[0]?.id)}`;
      api.sendRequestData(`${url}`).then((response) => {
        console.log('API Response:', response); // Depuración
        try {
          switch (datos[0]?.obj) {
            case 'reportesComite':
              setConsulta(response);
              break;
          }
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    console.log('itemsConsulta updated:', itemsConsulta); // Depuración
    if (itemsConsulta?.items?.length > 0) {
      setGenereGrafico([itemsConsulta]);
    }
  }, [itemsConsulta]);

  return { queryReporte, isLoading, itemsGraficos };
};

/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { useCallback, useState } from 'react'
import encodeBasicUrl from '../utils/encodeBasicUrl';
import { APICore } from '../helpers/api/apiCore';
const api = new APICore();

export const useGestionMenu = () => {

  const [isLoading, setLoading] = useState(false);
  const [itemsEditerSubMenu, setEditerSubMenu] = useState([]);
  const [itemsEditerMenu, setEditerMenu] = useState([]);

  const query = useCallback((itemUrl, tipo, opcion) => {
    setLoading(true);
    setTimeout(function () {
      let varibles;
      let datos = opcion;
      if (opcion) {
        var queryString = datos[0]
          ? Object.keys(datos[0])
            .map((key) => key + '=' + datos[0][key])
            .join('&')
          : '';
        varibles = queryString;
      }
      let userInfo = sessionStorage.getItem('hyper_user');
      const user = JSON.parse(userInfo);
      if (user) {
        const url = `accion=${encodeBasicUrl(itemUrl)}&tipo=${encodeBasicUrl(tipo)}&${varibles}&entidad=${encodeBasicUrl(user[0]?.entidad)}`;
        const datosMaterial = api.sendRequestData(`${url}`);

        datosMaterial?.then(function (response) {

          try {
            {
              (() => {
                switch (datos[0]?.obj) {
                  case 'Menu':
                    setEditerMenu(response)
                    break
                    case 'SubMenu':
                        setEditerSubMenu(response)
                    break
                }
              })()
            }
          } catch (error) {
            console.error(error);
          }
        })
          .catch((error) => console.error('Error:', error))
          .finally(() => {
            setTimeout(function () {
              setLoading(false);
            }, 1000);
          });
      }
    }, 2000);
  }, []);
 // console.log('itemsMenu',itemsEditerMenu)
  return (
    {
      query,
      isLoading,
      itemsEditerMenu,
      itemsEditerSubMenu
    }
  )
}


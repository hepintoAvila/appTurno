/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { useCallback, useState } from 'react'
import encodeBasicUrl from '../utils/encodeBasicUrl';
import { APICore } from '../helpers/api/apiCore';
const api = new APICore();

export const useAdminUsuarios = () => {
  const [isLoading, setLoading] = useState(false);
  const [itemsAdminUsuarios, setAdminUsuarios] = useState([]);
  const [itemsRoles, setRoles] = useState([]);

  function verificarPermiso(menuSubmenu, permiso) {
    const dataInLocalStorage = sessionStorage.getItem('PERMISO_ALL');
    const objArray = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
    // Recorrer el array de objetos
    for (let i = 0; i < objArray.length; i++) {
        const objeto = objArray[i];

        // Verificar si el campo 'menu' o 'submenu' coincide con el valor proporcionado
        if (objeto.menu === menuSubmenu || objeto.submenu === menuSubmenu) {
            // Verificar que el permiso especificado sea 'S'
            const permisoCumplido = objeto[permiso] === 'S';
            // Retornar verdadero si el permiso está permitido
            if (permisoCumplido) {
                return true;
            }
        }
    }
    // Retornar falso si no se encuentra ningún objeto con el permiso
    return false;
}
  //QUERY DE RESPUSTA DE CONSULTAS
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
        const url = `accion=${encodeBasicUrl(itemUrl)}&tipo=${encodeBasicUrl(tipo)}&${varibles}&entidad=${encodeBasicUrl(user[0]?.entidad)}&idUsuario=${encodeBasicUrl(user[0]?.id)}`;
        const datosMaterial = api.sendRequestData(`${url}`);
        datosMaterial?.then(function (response) {
          try {
            {
              (() => {
                switch (datos[0]?.obj) {
                  case 'Usuarios':
                      setAdminUsuarios(response)
                    break;
                  case 'Roles':
                    setRoles(response)
                    break;


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
  return (
    {
      query,
      isLoading,
      itemsAdminUsuarios,
      itemsRoles,
      verificarPermiso
    }
  )
}


/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect,useCallback, useContext } from 'react';
import { PermisosContext } from '../layouts/context/PermisosProvider/PermisosProvider';

export const usePermisos = (tipo) => {
  const { onPermisos,PERMISOS_USER } = useContext(PermisosContext);
    const activePermiso = useCallback((tipo) => {
      
      onPermisos(tipo)
    }, []);

    useEffect(() => {
      //setTimeout(function () {
        activePermiso(tipo)
     // }, 2000);

      }, [tipo]);

      return {
        "permisos":PERMISOS_USER,
        'initPermiso':PERMISOS_USER?.query?.length
      }
  }


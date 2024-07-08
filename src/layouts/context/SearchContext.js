/* eslint-disable default-case */
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { APICore } from '../../helpers/api/apiCore';
import encodeBasicUrl from '../../utils/encodeBasicUrl';
const api = new APICore();
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [itemsOptionAprendiz, setSelectedOptionAprendiz] = useState('none');
    const [itemsEnvioSolicitud, setSelectedEnvioSolicitud] = useState([]);
    const [itemsDescripcion, setDescripcion] = useState('');
    const [itemsNombrePrograma, setNombrePrograma] = useState('')
    const [idSolicitud, setidSolicitud] = useState(0);;
    const [loading, setLoading] = useState(false);
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


    const [validateError, setError] = useState({
        comiteError: false,
        tipoAtencionError: false,
        aprendizError: false,
        fechaError: false,
        filesError: false,
        base64StringsError: false,
        descripcionError: false,
        nombreProgramaError: false
    });

    const [fallas, setFallas] = useState([{
        faltaAcademica: 0,
        faltaDisciplinaria: 0,
        faltaInasistencias: 0,
        faltaVerbal: 0,
        faltaEscrito: 0,
    }]);

    const nombrePrograma = itemsNombrePrograma;
    const nombreProgramaError = validateError.nombreProgramaError;
    const descripcion = itemsDescripcion;
    const descripcionError = validateError.descripcionError;

    const queryFile = useCallback((queryDatos, dataFiles) => {
        const infoUsers = sessionStorage.getItem('hyper_user');
        const infoUser = JSON.parse(infoUsers);

        if (Number(infoUser[0]?.id > 0)) {
            const url = `${queryDatos}&idUsuario=${btoa(infoUser[0]?.id)}&entidad=${btoa(infoUser[0]?.entidad)}`;
            const datosMaterial = api.sendFile(url, dataFiles);
            datosMaterial
                ?.then(function (resp) {
                    Swal.fire('' + resp[0].message + '');
                })
                .catch((error) => console.error('Error:', error))
                .finally(() => {
                    setTimeout(function () {
                        setLoading(true);
                    }, 1000);
                });
        }
    }, []);
    useEffect(() => {
      if (itemsConsulta?.items?.length > 0) {
        setGenereGrafico(itemsConsulta);
      }
    }, [itemsConsulta]);
    const data = {
        itemsOptionAprendiz,
        setSelectedOptionAprendiz,
        itemsEnvioSolicitud,
        setSelectedEnvioSolicitud,
        setDescripcion,
        descripcion,
        descripcionError,
        validateError,
        setError,
        queryFile,
        loading,
        setLoading,
        setNombrePrograma,
        nombreProgramaError,
        nombrePrograma,
        fallas,
        setFallas,
        idSolicitud, setidSolicitud,
        itemsGraficos,queryReporte
    };

    return (
        <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };

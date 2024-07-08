/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
import React, { createContext, useCallback,useState } from 'react';
import Swal from 'sweetalert2';
import { APICore } from '../../helpers/api/apiCore';
import encodeBasicUrl from '../../utils/encodeBasicUrl';
const api = new APICore();
const NotificacionesContext = createContext();

const NotificacionesProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [itemsQueryById, setQueryByIdComite] = useState([]);
    const [itemsQueryByIdAprendiz, setQueryByIdAprendiz] = useState([]);
    const [itemsConsultarSolicitudByCodigo, setConsultarSolicitudByCodigo] = useState([]);
    const [idSolicitudComite, setIdSolicitud] = useState(0);
    const [idDirectivos, setIdDirectivos] = useState();
    const [status, setStatus] = useState('202');
    const [modal, setModal] = useState(false);
    const [dateInfoUpdate, setDateInfoUpdate] = useState({});
    const [fechaFinal, setFechaFiinal] = useState();
    const [fechaInicialUptade, setFechaInicial] = useState();
    const [eventData, setEventData] = useState({});
    const [itemsAgendarCitas, setAgendarCitas] = useState([]);
    const [itemsSolicitudes, setConsultarSolicitud] = useState([]);
    const [itemsSolicitudByID, setConsultarSolicitudByID] = useState([]);
    const [itemsAprendices, setAprendices] = useState([]);
    const [codigoFicha, setCodigoFicha] = useState({});
    const [consultarPdf, setConsultarPdf] = useState({});
    const [itemsSinEnviar, setConsultarSolicitudSinEnviar] = useState({});
    const [activeTab, setActiveTab] = useState('Enviar Solicitud');
    const [openFormAprendiz, setOpenFormAprendiz] = useState(false);
    const [openFormAsistente, setConsultarAsistentes] = useState([]);
    const [itemsAuditoria, setConsultarAuditoria] = useState([]);
    const [querySolicitudByUser, setQuerySolicitudByUser] = useState([]);

    /*GETDATA PARA ENVIAR DATOS DEL PROMULARIO */
    const getData = useCallback((queryDatos) => {
      const infoUsers = sessionStorage.getItem('hyper_user');
      const infoUser = JSON.parse(infoUsers);
      if (Number(infoUser[0]?.id > 0)) {
          const url = `${queryDatos}&entidad=${encodeBasicUrl(infoUser[0]?.entidad)}&idUsuario=${encodeBasicUrl(infoUser[0]?.id)}`;
          const respDatos = api.sendRequestData(url);
          respDatos
              ?.then(function (resp) {
                  if (resp[0].status === '202') {
                      const message = resp[0].message;
                      // Extraer el usuario y la contraseña del mensaje
                      const userData = message.match(/Su password es:([\w\W]+?), y el usuario: ([\w\W]+)/);
                      if (userData) {
                          const password = userData[1].trim();
                          const username = userData[2].trim();
                          // Mostrar el Swal con el texto plano y clase personalizada
                          Swal.fire({
                              title: 'Usuario Sena Creado con éxito!',
                              html: `
                                  <div>
                                      <p class="swal-style-p"><strong>Usuario:</strong> ${username}</p>
                                      <p class="swal-style-p"><strong>Contraseña:</strong> ${password}</p>
                                  </div>
                              `,
                              showCloseButton: true, // Mostrar botón de cerrar
                              showCancelButton: false, // No mostrar botón de cancelar
                              focusConfirm: false,
                              confirmButtonText: 'Salir',
                              customClass: {
                                  confirmButton: 'swal-confirm-button-class'
                              },
                              onClose: () => {
                                  console.log('Cuadro de diálogo cerrado');
                              }
                          }).then((result) => {
                              if (result.isConfirmed) {
                                  console.log('Aceptar clickeado');
                              }
                          });
                      } else {
                          Swal.fire('Mensaje recibido', message);
                      }
                      setStatus('202');
                  } else {
                      Swal.fire('' + resp[0].message + '');
                      setStatus('404');
                  }

                  /**setEvents */
              })
              .catch((error) => console.error('Error:', error))
              .finally(() => {
                  setTimeout(function () {
                      setLoading(true);
                  }, 1000);
              });
      }
  }, []);




    /*QUERY PARA CONSULTAR DATOS */
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
                const url = `accion=${encodeBasicUrl(itemUrl)}&tipo=${encodeBasicUrl(tipo)}&${varibles}&entidad=${encodeBasicUrl(user[0]?.entidad)}&idUsuario=${encodeBasicUrl(user[0]?.id)}&rol=${encodeBasicUrl(user[0]?.role)}`;
                const datosMaterial = api.sendRequestData(`${url}`);
                datosMaterial
                    ?.then(function (response) {
                        try {
                            {
                                (() => {
                                    switch (datos[0]?.obj) {
                                        case 'queryByIdComite':
                                            setQueryByIdComite(response);
                                            break;
                                        case 'query':
                                            setQueryByIdComite(response);
                                            break;
                                        case 'queryByIdAprendiz':
                                            setQueryByIdAprendiz(response);
                                            break;
                                        case 'aprendices':
                                            setAprendices(response);
                                            break;
                                        case 'agendarCitas':
                                            setAgendarCitas(response);
                                            break;
                                        case 'ConsultarSolicitud':
                                            setConsultarSolicitud(response);
                                            break;
                                        case 'ConsultarSolicitudByID':
                                            setConsultarSolicitudByID(response);
                                        case 'ConsultarPdf':
                                            setConsultarPdf(response);
                                        case 'ConsultarSolicitudSinEnviar':
                                            setConsultarSolicitudSinEnviar(response);
                                            break;
                                        case 'ConsultarSolicitudByCodigo':
                                            setConsultarSolicitudByCodigo(response);
                                            break;
                                        case 'ConsultarAsistentes':
                                            setConsultarAsistentes(response);
                                            break;
                                        case 'consultarAuditoria':
                                              setConsultarAuditoria(response);
                                            break;
                                            case 'querySolicitudByUser':
                                              setQuerySolicitudByUser(response);
                                            break;



                                    }
                                })();
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

    function obtenerNumeroDesdeURL(url) {
        const match = url.match(/p=(\d+)/);
        if (match) {
            const numero = parseInt(match[1], 10); // Convertimos la coincidencia en un número
            return numero;
        } else {
            return null;
        }
    }
    function obtenerIdsVerdaderos(array1, array2) {
        const idsVerdaderos = [];
       // console.log('array1',array1);
       // console.log('array2',array2);
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] === true && array2[i] && array2[i].id_auteur) {
                idsVerdaderos.push(array2[i].id_auteur);
            }
        }

        if (idsVerdaderos.length > 0) {
            return idsVerdaderos.join(','); // Unir los "id" con comas
        } else {
            return ''; // Si no se encuentran "id" verdaderos, retornar una cadena vacía

        }

    }
    function objetoContieneElementosVacios(objeto) {
        for (const propiedad in objeto) {
            if (objeto.hasOwnProperty(propiedad)) {
                // Verificar si la propiedad está vacía (undefined, null o una cadena vacía)
                if (objeto[propiedad] === undefined || objeto[propiedad] === null || objeto[propiedad] === '') {
                    return true; // Si una propiedad está vacía, el objeto contiene elementos vacíos
                }
            }
        }
        return false; // Si no se encontraron elementos vacíos, el objeto no contiene elementos vacíos
    }
    function formatearFecha(fecha) {
        const yyyy = fecha.getFullYear();
        const mm = String(fecha.getMonth() + 1).padStart(2, '0');
        const dd = String(fecha.getDate()).padStart(2, '0');
        const hh = String(fecha.getHours()).padStart(2, '0');
        const min = String(fecha.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    }

    function calcularFechaFinal(var1, var2) {
        // Convierte la fecha de inicio en un objeto Date
        const fechaInicio = new Date(var1);
        // Obtiene el número de minutos a sumar
        const minutosASumar = parseInt(var2, 10);

        // Calcula la fecha final sumando los minutos
        const fechaFinal = new Date(fechaInicio.getTime() + minutosASumar * 60000);
        const fechaFinalFormateada = formatearFecha(fechaFinal);
        return fechaFinalFormateada;
    }

    function calcularFechaInicial(start, var2) {
        // Separar la hora y los minutos de var2
        const [horasVar2, minutosVar2] = var2.split(':').map(Number);

        // Clonar la fecha inicial (para evitar modificarla)
        const start2 = start.substr(0, 10) + ' 00:00:00';
        const fechaInicial = new Date(start2);

        // Agregar la hora y los minutos de var2 a la fecha inicial
        fechaInicial.setHours(fechaInicial.getHours() + horasVar2);
        fechaInicial.setMinutes(fechaInicial.getMinutes() + minutosVar2);

        return convertirFormato(fechaInicial);
    }
    function esFechaValidaEnFormatoISO(variable) {
        try {
            const fecha = new Date(variable);
            return !isNaN(fecha.getTime());
        } catch (error) {
            return false;
        }
    }

    function convertirFormato(fechaEnFormatoISO) {
        const fecha = new Date(fechaEnFormatoISO);

        const anio = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const fechaEnNuevoFormato = `${anio}-${mes}-${dia} ${horas}:${minutos}`;

        return fechaEnNuevoFormato;
    }

    function convertirFecha(fechaEntrada) {
         // Parsear la cadena de fecha
    var fecha = new Date(fechaEntrada);

    // Obtener los componentes de la fecha y hora
    var año = fecha.getFullYear();
    var mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Agrega ceros a la izquierda si es necesario
    var dia = ('0' + fecha.getDate()).slice(-2); // Agrega ceros a la izquierda si es necesario
    var horas = ('0' + fecha.getHours()).slice(-2); // Agrega ceros a la izquierda si es necesario
    var minutos = ('0' + fecha.getMinutes()).slice(-2); // Agrega ceros a la izquierda si es necesario
    var segundos = ('0' + fecha.getSeconds()).slice(-2); // Agrega ceros a la izquierda si es necesario

    // Construir la cadena en el formato deseado
    var fechaFormateada = año + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;

    // Retornar la fecha formateada
    return fechaFormateada;
      }
    // on event click
    const onEventClick = (arg) => {
        setEventData(arg);
        setDateInfoUpdate(arg);
        setFechaFiinal(arg?.defaultEvents?.start);
        setFechaInicial(arg?.defaultEvents?.start);
        setModal(true);
    };




    const data = {
        getData,
        convertirFecha,
        setQueryByIdComite,
        loading,
        setLoading,
        itemsQueryById,
        query,
        obtenerNumeroDesdeURL,
        idSolicitudComite,
        setIdSolicitud,
        idDirectivos,
        setIdDirectivos,
        obtenerIdsVerdaderos,
        objetoContieneElementosVacios,
        calcularFechaFinal,
        calcularFechaInicial,
        status,
        convertirFormato,
        onEventClick,
        setModal,
        modal,
        dateInfoUpdate,
        setFechaFiinal,
        fechaFinal,
        setFechaInicial,
        fechaInicialUptade,
        eventData,
        setEventData,
        esFechaValidaEnFormatoISO,
        itemsQueryByIdAprendiz,
        itemsAprendices,
        setAprendices,
        itemsAgendarCitas,
        setAgendarCitas,
        itemsSolicitudes,
        setConsultarSolicitud,
        itemsSolicitudByID,
        setConsultarSolicitudByID,
        codigoFicha,
        setCodigoFicha,
        consultarPdf,
        itemsSinEnviar,
        activeTab,
        setActiveTab,
        itemsConsultarSolicitudByCodigo,
        setConsultarSolicitudByCodigo,
        openFormAprendiz, setOpenFormAprendiz,
        openFormAsistente,
        itemsAuditoria,
         setConsultarAuditoria,
         querySolicitudByUser,

    };

    return (
        <>
            <NotificacionesContext.Provider value={data}>{children}</NotificacionesContext.Provider>
        </>
    );
};
export { NotificacionesContext, NotificacionesProvider };

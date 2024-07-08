// @flow
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Select, { components } from 'react-select';
import { groupByFields } from '../utils';

import Avatar2 from '../assets/images/users/avatar-2.jpg';
import { SearchContext } from '../layouts/context/SearchContext';
import { NotificacionesContext } from '../layouts/context/NotificacionesProvider';
import encodeBasicUrl from '../utils/encodeBasicUrl';
/*
 * get options
 */
const optionGetter = (option) => {

    switch (option.type) {
        case 'users':
            return (
                <>
                    <Link to="/" className="dropdown-item notify-item p-0">
                        <div className="d-flex">
                            <img
                                src={Avatar2}
                                alt=""
                                className="d-flex me-2 rounded-circle"
                                height="32"
                            />
                            <div className="w-100">
                                <h5 className="m-0 font-14">
                                    {option.userDetails.firstname} {option.userDetails.lastname}
                                </h5>
                                <span className="font-12 mb-0">{option.userDetails.position}</span>
                            </div>
                        </div>
                    </Link>
                </>
            );

        default:
            return;
    }
};

/*
 * filter options
 */
const formateOptions = (options) => {
    const grouppedData = groupByFields(options, (item) => {
        return [item.type];
    });

    let formattedOptions = [];
    let count = 0;

    for (let i = 0; i < grouppedData.length; i++) {
        for (let j = 0; j < grouppedData[i].length; j++) {
            if (grouppedData[i][j].type === 'users' && count === 0) {
                grouppedData[i].splice(j, 0, { label: 'Users', value: 'title', type: 'title' });
                count = 1;
            }
            formattedOptions.push(grouppedData[i][j]);
        }
    }
    return formattedOptions;
};

/* custon control */
const Control = ({ children, ...props }) => {
    const { handleClick } = props.selectProps;
    return (
        <components.Control {...props}>
            <span onMouseDown={handleClick} className="mdi mdi-magnify search-icon"></span>
            {children}
        </components.Control>
    );
};



/* custom menu list */
const MenuList = (props) => {
    const { options } = props.selectProps;

    return (
        <components.MenuList {...props}>
            {/* menu header */}
            <div className="dropdown-header noti-title">
                <h5 className="text-overflow mb-2">
                    Encontrados <span className="text-danger">{options.length}</span> resultados
                </h5>
            </div>
            {props.children}
        </components.MenuList>
    );
};

/* fomates the option label */
const handleFormatOptionLabel = (option) => {
    const formattedOption = optionGetter(option);
    return <div>{formattedOption}</div>;
};

type SearchResultItem = {
    id: number,
    title: string,
    redirectTo: string,
    icon: string,
};

type TopbarSearchProps = {
    items: Array<SearchResultItem>,
};

const TopbarSearch = (props: TopbarSearchProps): React$Element<any> => {
    const {query,setOpenFormAprendiz} = useContext(NotificacionesContext)
    const {setSelectedOptionAprendiz,validateError,setError} = useContext(SearchContext)

    const options = props?.data
    const handleTypeSelect = e => {
        const values = options.filter(function(option) {
            return option.label=== e.label;
          })

          const detalles = {
            idAprendiz:values[0]?.userDetails?.id,
            Nombres:values[0]?.userDetails?.firstname,
            Apellidos:values[0]?.userDetails?.lastname,
            Identificacion:values[0]?.userDetails?.identificacion,
            Telefono:values[0]?.userDetails?.telefono,
            Email:values[0]?.userDetails?.correo,
            Municipio:values[0]?.userDetails?.municipio,
            Direccion:values[0]?.userDetails?.direccion,
            Disciplinaria:values[0]?.userDetails?.disciplinaria,
            Academica:values[0]?.userDetails?.academica,
            Inasistencias:values[0]?.userDetails?.inasistencias,
            Verbal:values[0]?.userDetails?.verbal,
            Escrito:values[0]?.userDetails?.escrito,
            Jornada:values[0]?.userDetails?.jornada,
            Etapa:values[0]?.userDetails?.etapa,
            Ficha:values[0]?.userDetails?.fichanum,
            Rol:values[0]?.userDetails?.rol,
            aprendizError:true
          }


          query('ModuloSolicitudComite','EnviarSolicitud',[{opcion:encodeBasicUrl('ConsultarSolicitud'),obj:'queryByIdAprendiz',sw:4,idAprendiz:encodeBasicUrl(values[0]?.userDetails?.id)}]);
          setOpenFormAprendiz(true);
          setSelectedOptionAprendiz(detalles);
          setError({...validateError,aprendizError:true})
          return window.location.hash = `/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${values[0]?.userDetails?.id}`;
      };

//console.log('options',options);
    return (
        <>
            <Select
                {...props}
                components={{ Control, MenuList }}
                placeholder={'Buscar Aprendiz Sena...'}
                options={formateOptions(options)}
                formatOptionLabel={handleFormatOptionLabel}
                isOptionDisabled={(option) => option.type === 'title'}
                maxMenuHeight="auto"
                isSearchable
                name="search-app"
                className="app-search dropdown"
                classNamePrefix="react-select"
                onChange={handleTypeSelect}
                value={options?.filter(function(option) {
                    return option.label=== props?.selectedOption;
                  })}
            />

        </>

    );
};

export default TopbarSearch;

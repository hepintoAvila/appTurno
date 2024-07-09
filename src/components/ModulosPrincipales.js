import React from 'react';
import TurnoSolicitud from './teclado/TurnoSolicitud';

const ModulosPrincipales = (props) => {

  const renderComponent = () => {
    switch (props?.tipo) {
      case 'Teclado':
        return <>
          <TurnoSolicitud/>
          </>
      default:
        return '';
    }
  };

  return <React.Fragment>{renderComponent()}</React.Fragment>;
};

ModulosPrincipales.defaultProps = {
  itemsmenu: '/',
};

export default ModulosPrincipales;

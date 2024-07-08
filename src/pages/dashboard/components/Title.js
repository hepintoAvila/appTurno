// @flow
import React, { useContext } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { DashboardContext } from '../../../layouts/context/DashboardContext';

/**
 * PageTitle
 */
const Title = () => {
  const { itemUrl, tipo } = useContext(DashboardContext);

  // Definir los elementos del breadcrumb
  const breadCrumbItems = [
    { label: 'Inicio', path: '/#/', active: false },
    {
      label: tipo.length === 11 ? 'Bienvenidos' : `${itemUrl} / ${tipo}`,
      path: `/#/dashboard/${tipo}/${itemUrl.replace('/', '')}/`,
      active: true
    },
  ];

  // Función para manejar los clics en los elementos del breadcrumb
  const handleBreadcrumbClick = (path) => {
    window.location.href = path;
  };

  return (
    <Breadcrumb className="mb-0">
      {breadCrumbItems.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          onClick={() => handleBreadcrumbClick(item.path)}
          active={item.active}
          className="text-black"
          style={{ cursor: 'pointer' }} // Añadir cursor de puntero para indicar que es clicable
        >
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Title;

import React, { useContext } from 'react';
import AdminUsuarios from '../Project/AdminUsuarios/AdminUsuarios';
import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import GestionMenu from '../Project/GestionMenu';
import Auditoria from '../Project/ModuloAuditoria/Auditoria';
import CambiarPassword from '../Project/ModuloActas/Componentes/CambiarPassword';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { useAdminUsuarios } from '../../../hooks/useAdminUsuarios';

const ModulosPrincipales = () => {
  const { tipo, itemUrl, AdvertenciaLocalStorage } = useContext(DashboardContext);

  // Ejecuta la advertencia del almacenamiento local
  AdvertenciaLocalStorage();

  // Hook para verificar permisos de administración de usuarios
  const { verificarPermiso } = useAdminUsuarios();

  // Función para renderizar el componente según itemUrl
  const renderComponent = () => {
    switch (itemUrl) {
      case 'AdminUsuarios':
        return verificarPermiso('Usuarios', 'query') ? (
          <AdminUsuarios accion={itemUrl} tipo={tipo} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('Usuarios', 'query')} />
        );

      case 'GestionMenu':
        return verificarPermiso('Menus', 'query') ? (
          <GestionMenu accion={itemUrl} tipo={tipo} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('Menus', 'query')} />
        );
      case 'ModuloAuditor':
        return verificarPermiso('Auditoria', 'query') ? (
          <Auditoria accion={itemUrl} tipo={tipo} />
        ) : (
          <PermisoAlert opcion={verificarPermiso('Auditoria', 'query')} />
        );
      case 'CambiarPassword':
        return <CambiarPassword accion={itemUrl} tipo={tipo} />;
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

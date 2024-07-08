/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import Usuarios from './Usuarios/Usuarios';
import Roles from './Roles/Roles';
import { useAdminUsuarios } from '../../../../hooks/useAdminUsuarios';
const AdminUsuarios = (props) => {
  const {verificarPermiso} = useAdminUsuarios()
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'Usuarios':
            return <>
            {verificarPermiso('Usuarios',"query") ?
                <Usuarios
                  accion={'AdminUsuarios'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                />: <PermisoAlert opcion={verificarPermiso('Usuarios',"query")}/>}
            </>
          case 'Roles':
            return <>
              {verificarPermiso('Roles',"query") ?
                <Roles
                  accion={'AdminUsuarios'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert opcion={verificarPermiso('Roles',"query")}/>}
            </>
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default AdminUsuarios;

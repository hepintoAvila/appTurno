/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import { useAdminUsuarios } from '../../../../hooks/useAdminUsuarios';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import MenuPrincipal from './MenuPrincipal/MenuPrincipal';

const GestionMenu = (props) => {
  const {verificarPermiso} = useAdminUsuarios()
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'Menus':
            return <>
              {verificarPermiso('Menus',"query") ?
                (<MenuPrincipal
                  accion={'MenuPrincipal'}
                  tipo={props.tipo}
                /> ):<PermisoAlert opcion={verificarPermiso('Menus',"query")}/>}
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

GestionMenu.defaultProps = {
  itemsmenu: '/dashboard/GestionMenu',
};
export default GestionMenu;


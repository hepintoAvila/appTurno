import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
const FormUpdate = (props) => {
  const { itemUrl, tipo,itemsUpdate, } = useContext(DashboardContext);
  return (
  <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={tipo}
        title={props.title}
        validated={props.validated}
        opcion={'update_rol'}
        textBtn={''}
        ItemsUpdate={[itemsUpdate]}
        Idpermiso={itemsUpdate?.items?.Idpermiso}
      />
  </React.Fragment>
    );
}
export default FormUpdate;

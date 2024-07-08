/* eslint-disable array-callback-return */
import React, {  useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = (props) => {
  const { itemUrl, tipo,itemsUpdate } = useContext(DashboardContext);
  return (
    <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={tipo}
        title={props.title}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar Permisos'}
        ItemsUpdate={[]}
        Idpermiso={itemsUpdate?.items?.Idpermiso}
        //Permisos={Permisos}
      />
    </React.Fragment>
  );
}
export default FormAdd;

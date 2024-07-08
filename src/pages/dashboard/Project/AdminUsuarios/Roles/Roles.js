/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal, } from 'react-bootstrap';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
import Swal from 'sweetalert2';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';

const ActionColumn = ({ row }) => {
  const {verificarPermiso} = useAdminUsuarios()
  const {
    eliminar,
    validated,
    setOpen,
    setItemsUpdate,
    open,
  } = useContext(DashboardContext);
   const toggleSignUp = (id) => {

    if (verificarPermiso('Roles',"update")) {

      if(row.cells[0].row.values.id===id)
      setItemsUpdate(row?.cells[0]?.row?.values)
      setOpen(!open);

    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }
  };

  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const obj = {
    open,
    toggleSignUp,
    localPermiso,
    validated,
    key:row.cells[0].value,
    row:row.cells[0].value,
    eliminar,
  }
  return (
    <React.Fragment>
      <BtnSeccionAction obj={obj}>
        </BtnSeccionAction>
    </React.Fragment>
  );
};
const Roles = (props) => {

  const {itemsRoles,query,verificarPermiso} = useAdminUsuarios()
  const {
    sizePerPageList,
    setOpen,
    open,

  } = useContext(DashboardContext);
  const datos = itemsRoles?.dataRoles?.roles|| [{}];
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Menu',
      accessor: 'menu',
      sort: true,
    },
    {
      Header: 'Submenu',
      accessor: 'submenu',
      sort: true,
    }
    , {
      Header: 'rol',
      accessor: 'rol',
      sort: true,
    }, {
      Header: 'Consulta',
      accessor: 'c',
      sort: false,
    }, {
      Header: 'Agregar',
      accessor: 'a',
      sort: false,
    }, {
      Header: 'Actualizar',
      accessor: 'u',
      sort: false,
    }, {
      Header: 'Eliminar',
      accessor: 'd',
      sort: false,
    },
    {
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
  ];

  useEffect(() => {
    query('AdminRoles', 'Roles', [{ opcion: encodeBasicUrl('consultar'), obj: 'Roles' }]);
  }, [query])

  return (
    <>

      <Row>
        <Col>
          <Card>
            <Card.Body>
            {verificarPermiso('Roles',"query") ? (
              <Table
                    columns={columns}
                    data={datos}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    theadClass="table-light"
                    searchBoxClass="mt-2 mb-3"
                    isSearchable={true}
                    nametable={props.accion}
              />) : <PermisoAlert opcion={verificarPermiso('Roles',"query")}/>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Body>
              {/* Sign up Modal */}
              <Modal show={open} size={'lg'} onHide={setOpen}>
                <Modal.Body>
                <Modal.Header closeButton>
                    <h4 className="modal-description">GESTIONAR ROLES</h4>
                  </Modal.Header>
                  <FormUpdate
                      title={`FORMULARIO PARA LA EDICION PERMISOS `}
                    />
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Roles;

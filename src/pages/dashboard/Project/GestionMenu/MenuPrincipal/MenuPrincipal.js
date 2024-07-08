/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal, } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useGestionMenu } from '../../../../../hooks/useGestionMenu';
import FormAdd from './FormAdd';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../components/Table';

import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';

const MenuPrincipal = (props) => {
  const {itemsEditerMenu,query} = useGestionMenu()
  const {verificarPermiso} = useAdminUsuarios()
  const {
    sizePerPageList,
    setSignUpModalAdd,
    signUpModalAdd,
    validated,
  } = useContext(DashboardContext);
  const datos =  itemsEditerMenu?.data?.Menus || [];
 // console.log(itemsEditerMenu);
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Icon',
      accessor: 'icon',
      sort: true,
    },
    {
      Header: 'Label',
      accessor: 'label',
      sort: true,
    },
    {
      Header: 'Key',
      accessor: 'key',
      sort: true,
    },
    {
      Header: 'Status',
      accessor: 'status',
      sort: true,
    },

  ];

  useEffect(() => {
    query('GestionMenu', 'GestionMenu', [{ opcion: encodeBasicUrl('consultar'), obj: 'Menu' }]);
  }, [query])

 // console.log('datos',datos)
  return (
    <>

      <Row>
        <Col>
            <Card.Body>
              {verificarPermiso('Menus',"query") ? (<Table
                    columns={columns}
                    data={datos}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    theadClass="table-light"
                    searchBoxClass="mt-0 mb-1"
                    isSearchable={true}
                    nametable={props.accion}
              />) :<PermisoAlert opcion={verificarPermiso('Menus',"query")}/>}
            </Card.Body>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Card>

              {/* Sign up Modal */}
              <Modal show={signUpModalAdd} size={'sm'} onHide={setSignUpModalAdd}>
                <Modal.Body>
                <Modal.Header closeButton>
                    <h4 className="modal-description">GESTIONAR USUARIOS</h4>
                  </Modal.Header>
                  {verificarPermiso('Menus',"add") ?<FormAdd
                    title={`GESTIONAR USUARIOS`}
                    validated={validated}
                  /> :<PermisoAlert opcion={verificarPermiso('Menus',"query")}/>}
                </Modal.Body>
              </Modal>

          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MenuPrincipal;

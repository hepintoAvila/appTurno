/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect} from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import Table from '../../../components/Table';
const Usuarios = (props) => {

  const {itemsAdminUsuarios,query,verificarPermiso} = useAdminUsuarios()
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    sizePerPageList,
  } = useContext(DashboardContext);

  const datos = itemsAdminUsuarios?.data?.auteurs || [];
  const roles = itemsAdminUsuarios?.data?.roles || [];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Usuarios',
      accessor: 'login',
      sort: true,
    },
    {
      Header: 'Correo Electronico',
      accessor: 'email',
      sort: true,
    }
    , {
      Header: 'Rol',
      accessor: 'rol',
      sort: false,
    },
  ];

  const toggleSignUp = () => {
    {verificarPermiso('Usuarios',"add") ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}
  };
  useEffect(() => {
    query('AdminUsuarios','Usuarios',[{opcion:btoa('listaUsuarios'),obj:'Usuarios'}]);
  }, [query]);

  return (
    <>

      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Row>
                <Col sm={12} className={`${signUpModalAdd ? '' : 'd-lg-none'}`}>
                  <Card>
                    <Card.Body>
                      {/* Sign up Modal */}
                      <Modal show={signUpModalAdd} onHide={setSignUpModalAdd}>
                        <Modal.Body>
                            {verificarPermiso('Usuarios',"add") ?
                          <FormAdd
                            title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                            validated={validated}
                            roles={roles}
                          />:''}
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                </Col>
                <Col sm={8}>
                  <div className="text-sm-end">
                  {verificarPermiso('Usuarios',"add") ? <Button className="btn btn-dataTable mb-2 me-1" onClick={toggleSignUp}>
                      <i className="mdi mdi-account-plus"> Agregar Usuario</i>
                    </Button>:''}
                  </div>
                </Col>
              </Row>
              {verificarPermiso('Usuarios',"query") ? <Table
                columns={columns}
                data={datos}
                pageSize={25}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-1 mb-2"
                isSearchable={true}
                isVisible={true}
                nametable={props.accion}
                titulo={'LISTADO DE USUARIOS REGISTRADOS'}
                icons={'dripicons-user'}
              />: <PermisoAlert opcion={verificarPermiso('Usuarios',"query")}/>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Usuarios;

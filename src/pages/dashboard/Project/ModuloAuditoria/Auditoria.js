/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import Table from '../../../../components/Table';
import Spinner from '../../../../components/Spinner';

const Auditoria = (props) => {
  const {query,itemsAuditoria } = useContext(NotificacionesContext)
  const {
    sizePerPageList,
  } = useContext(DashboardContext);

  const colAgendar = [
    {
      Header: 'No',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Nombre',
      accessor: 'nombres',
      sort: true,
    },
    {
      Header: 'Rol',
      accessor: 'rol',
      sort: true,
    }
    , {
      Header: 'Modulo',
      accessor: 'modulo',
      sort: false,
    },
    {
      Header: 'Opcion',
      accessor: 'opcion',
      sort: false,
    },
    {
      Header: 'Accion',
      accessor: 'accion',
      sort: false,
    }, {
      Header: 'Fecha',
      accessor: 'maj',
      sort: false,
    }
  ];



  const datos = itemsAuditoria?.data?.Auditoria || [];

  useEffect(() => {
          query('ModuloAuditoria', 'auditoria', [{ opcion: btoa('consultarAuditoria'), obj: 'consultarAuditoria'}]);
  }, [query])

  return (
    <>
      <Row>
        <Col sm="12">
          {datos?.length > 0 ? <Table
            columns={colAgendar}
            data={datos}
            pageSize={5}
            sizePerPageList={sizePerPageList}
            isSortable={true}
            pagination={true}
            theadClass="table-light"
            searchBoxClass="mt-2 mb-3"
            isSearchable={true}
            nametable={'table_1'}
            titleTable={'LISTA DE ACCIONES AUDITADAS'}
          />:<Spinner/>}
        </Col>
      </Row>

    </>
  );
};

export default Auditoria;

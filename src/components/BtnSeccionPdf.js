import { Pagination, Row } from "react-bootstrap";

import React from "react";
import BtnActions from "../pages/dashboard/Project/ModuloSolicitudComite/Components/BtnActions";
const BtnSeccionPdf = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Pagination className="pagination-rounded mx-auto btnsul" size="sm">
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`EVIDENCIAS${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'EVIDENCIAS'}
                  codigoFicha={props?.obj?.codigoFicha}
                  descripcion={`Ver evidencias del instructor`}
                  icon={'mdi mdi-account-convert'}
                />
          </Pagination.Item>
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`Formato${props?.obj?.key}`}
                  codigoFicha={props?.obj?.codigoFicha}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'FORMATO'}
                  descripcion={`Ver Formato solicitud Comité`}
                  icon={'mdi mdi-file-pdf-box'}
                />
          </Pagination.Item>
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`eDITAR${props?.obj?.key}`}
                  codigoFicha={props?.obj?.codigoFicha}
                  toggleActions={props?.obj?.EditDelete}
                  row={props?.obj?.row}
                  titulo={'EDITAR'}
                  descripcion={`EDITAR solicitud`}
                  icon={'mdi mdi-square-edit-outline'}
                />
          </Pagination.Item>
          <Pagination.Item>
                <BtnActions
                 url={`/dashboard/ModuloSolicitudComite/EnviarSolicitud?p=${props?.obj?.row}`}
                  permisos={'N'}
                  key={`DELETE${props?.obj?.key}`}
                  codigoFicha={props?.obj?.codigoFicha}
                  toggleActions={props?.obj?.EditDelete}
                  row={props?.obj?.row}
                  titulo={'DELETE'}
                  descripcion={`DELETE solicitud`}
                  icon={'mdi mdi-delete-circle-outline'}
                />
          </Pagination.Item>
      </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnSeccionPdf;

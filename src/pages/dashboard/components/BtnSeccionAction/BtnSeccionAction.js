import {Pagination, Row } from "react-bootstrap";

import React from "react";
import BtnLink from "../BtnLink";
import BtnActions from "../BtnActions";

const BtnSeccionAction = (props,children) => {

  const isbtnLink = props?.obj?.isbtnLink|| 'N';
  const tipo = props?.obj?.tipo || '';
  const descripcionbtnLink = props?.obj?.descripcionbtnLink || '';
  const descripcionbtnaction = props?.obj?.descripcionbtnaction || '';
  const titulobtnLink =props?.obj?.titulobtnLink || '';
  const urlbtnLink =props?.obj?.urlbtnLink || '';

  return (
    <React.Fragment>
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>

                <BtnActions
                  permisos={'S'}
                  key={`EDITAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'EDITAR'}
                  descripcion={`Editar ${descripcionbtnaction}`}
                  icon={'mdi mdi-square-edit-outline'}
                />
          </Pagination.Item>


 {
        (isbtnLink==='S') ?
        <Pagination.Item>
        <BtnLink
            permisos={'S'}
            key={`${tipo}_${props?.obj?.row}`}
            row={props?.obj?.row}
            url={urlbtnLink}
            titulo={`${titulobtnLink}`}
            descripcion={`${descripcionbtnLink}`}
            icon={'mdi mdi-account-cash'}
          />
           </Pagination.Item>

        :''
      }
      </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnSeccionAction;

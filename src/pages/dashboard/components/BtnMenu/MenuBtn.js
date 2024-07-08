/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import { Button,  Row, Col } from 'react-bootstrap';

const MenuBtn = (props) => {
  const novedades = props?.novedades

  return (
    <>
      <Row className="justify-content-center">
        <Col lg={7} md={10} sm={11}>
          <div className="horizontal-steps mt-2 mb-2 pb-3">
            <div className="horizontal-steps-content">

              <div className={`step-item`}>

                <Button variant="outline-secondary" type="submit" className="btnInicio1">
                  <Row className="justify-content-center">

                    <div className="col-xl-4 col-lg-5"><img src={props.image} height="64" alt="" className="btn-menu" />{novedades?<div className="indicador_novedades"><label className="indicador_novedades_label">{props?.countNovedades}</label></div>:null}</div>
                    <div className="col-xl-6 col-lg-2 col-sm-3 text-btn">{props.texto}</div>
                  </Row>
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
  </>
  );
}
export default MenuBtn;

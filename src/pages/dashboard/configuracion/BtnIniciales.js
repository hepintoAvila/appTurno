/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-duplicate-case */
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card } from 'react-bootstrap';
import avatar1 from '../../../assets/images/8.png';
import avatar2 from '../../../assets/images/16.png';
import avatar3 from '../../../assets/images/12.png';
import avatar4 from '../../../assets/images/9.png';

import logo_comite from '../../../assets/images/logo_comite.png';
import MenuBtn from '../components/BtnMenu/MenuBtn';
const BtnIniciales = (props) => {


  if (!props?.itemUrl) {
    return (
      <Row className="row-btns-nivelI justify-content-center">
        <Card>
          <Card.Body>
            <Row>
              <div className="grid_contenedor">
                <Col lg={12}>
                  <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6"></div>
                  <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6 logo_comite_inicio">
                    <div className="logo_comite_inicio"><img src={logo_comite} height="150" /></div>
                  </div>
                  <div className="grid_btn3 col-xl-3 col-lg-4 col-sm-6"></div>
                </Col>
              </div>
            </Row>
            <Row className="justify-content-center">
              <br />
              <Col lg={12}>
                <div className="grid_contenedor">
                  <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6 row-btns-nivelI">
                    <div className="grid_contenedor">
                      <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6">
                        <Link to={`/dashboard/ModuloSolicitudComite`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                          <MenuBtn texto='Módulo Solicitud Comité' image={avatar3} countNovedades={'0'} />
                        </Link>
                      </div>
                      <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6">
                        <Link to={`/dashboard/ModuloNotificaciones/ConsultaNotificaciones`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                          <MenuBtn texto='Consulta Notificaciones' image={avatar2} countNovedades={'22'} nivel={2} novedades={true} />
                        </Link>
                      </div>
                      <div className="grid_btn3 col-xl-3 col-lg-4 col-sm-6">
                        <Link to={`/dashboard/ModuloAprendiz/Aprendiz`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                          <MenuBtn texto='Módulo Aprendiz' image={avatar1} countNovedades={'0'} novedades={false} />
                        </Link>
                      </div>
                      <br />
                      <div className="grid_btn4 col-xl-3 col-lg-4 col-sm-6">
                        <Link to={`/dashboard/ModuloActas/Actas`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                          <MenuBtn texto='Módulo Actas' image={avatar4} countNovedades={'0'} nivel={1} novedades={false} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    );
  }
};

BtnIniciales.defaultProps = {
  itemsmenu: '/',
};

export default BtnIniciales;

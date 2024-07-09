// @flow
import React from 'react';
import { Row } from 'react-bootstrap';

const Footer = (): React$Element<any> => {
    const currentYear = new Date().getFullYear();
    return (
        <React.Fragment>
            <footer className="footer-dashboard footer-alt-dashboard justify-content-center">
                <div className="container-fluid ">
                      <Row md={12} className="justify-content-center bg-footer-dashboard fw-bold">
                            <div className="d-none d-md-block content-center">
                                                 {currentYear} © STORC v.1- @2024-Desarrollado Por: Holmes Elias Pinto Avila.
                                Celular: 3162789497
                            </div>

                        </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;

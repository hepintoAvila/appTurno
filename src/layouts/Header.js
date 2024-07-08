// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import headerGovco from '../assets/images/header_govco.png';
const Header = (): React$Element<any> => {
    return (
        <React.Fragment>
            <footer className="footer bg-footer  fw-bold">
                <div className="container-fluid ">
                    <Row>
                    <Col md={6}>
                    <span>
                    <img src={headerGovco} alt="" height="26" />
                </span>

                        </Col>
                        <Col md={6}></Col>

                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Header;

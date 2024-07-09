// @flow
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo_comite from '../../assets/images/logo_comite.png';
import headerSena from '../../assets/images/logo-dark.png';
import logo_comite_white from '../../assets/images/logo_comite_white.png';

type AccountLayoutProps = {
    bottomLinks?: React$Element<any>,
    children?: any,
};

const AccountLayout = ({ bottomLinks, children }: AccountLayoutProps): React$Element<any> => {
    const { t } = useTranslation();

    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        };
    }, []);

    return (
        <>
        <header className="header-1 header-alt">
            <Row className="justify-content-left bg-header-1  fw-bold">
            <Link to="/">
                <span>

                </span>
               </Link>
              </Row>
        </header>
        <div className="flexRowContent--header___grid__nivel_2">
                <div className="flexRowContent--header___grid__nivel_2_col1">
                <img src={logo_comite} alt="" height="63" className="headerLogo"/>
                </div>
                <div  className="flexRowContent--header___grid__nivel_2_col2">
                <p className="headerTitulo"><span>{t('STURC v.1 - Sistema para Solicitar Turno en la Oficina de Registro y Control')} </span></p>

                </div>
                <div  className="flexRowContent--header___grid__nivel_2_col3">
                    <img src={headerSena} alt="" height="63" className="headerLogo"/>
                </div>
        </div>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">

                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card>
                                {/* logo */}
                                <Card.Header className="pt-4 pb-4 text-center bg-primary">
                                    <Link to="/">
                                        <span>
                                            <img src={logo_comite_white} alt="" height="69" />
                                        </span>
                                    </Link>
                                </Card.Header>
                                <Card.Body className="p-4">{children}</Card.Body>
                            </Card>

                            {/* bottom links */}
                            {bottomLinks}
                        </Col>
                    </Row>
                </Container>
            </div>
            <footer className="footer footer-alt">
            <Row className="justify-content-center bg-footer  fw-bold">
              {t('STURC v.1')}<br/>
              {t('Universidad Popular del Cesar')}<br/>
              {t('Valledupar-Cesar')}<br/>
              {t('2024')}
              </Row>
            </footer>

        </>
    );
};

export default AccountLayout;

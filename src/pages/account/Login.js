// @flow

import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

//actions
import { loginUser } from '../../redux/actions';

import { useQuery } from '../../hooks/';

// components
import { VerticalForm, FormInputAcout } from '../../components/';

import AccountLayout from './AccountLayout';

/* bottom link of account pages */
const BottomLink = () => {
    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted"></p>
            </Col>
        </Row>
    );
};

const Login = (): React$Element<any> => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const query = useQuery();
    const next = query.get('next');

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Por favor Ingrese Su Usuario')),
            password: yup.string().required(t('Por favor Ingrese Su Contraseña')),
        })
    );
    /*
    handle form submission
    */
    const onSubmit = (formData) => {
      sessionStorage.removeItem('PERMISO_ALL');
      sessionStorage.removeItem('PERMISO');
      sessionStorage.removeItem('ITEM_SELECT');
      sessionStorage.removeItem('TiposCategorias');
      localStorage.removeItem('menuNomina');
      localStorage.removeItem('comiteSelect');
      localStorage.removeItem('smde_1');
      localStorage.removeItem('roles');
      localStorage.removeItem('idsIncidentes');
      localStorage.removeItem('Conceptos');
      localStorage.removeItem('hechos');

      dispatch(loginUser(formData['username'], formData['password']));
    };

    return (
        <>
            {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null}
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Ingresar Plataforma SICES.')}</h4>
                    <p className="text-muted mb-4">{t(' Usuario y Contraseña Asignados Por El Comite.')}</p>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ username: '', password: '' }}>
                    <FormInputAcout
                        label={t('Usuario')}
                        type="text"
                        name="username"
                        placeholder={t('Ingresa Tu Usuario')}
                        containerClass={'mb-3'}
                    />
                    <FormInputAcout
                        label={t('Contraseña')}
                        type="password"
                        name="password"
                        placeholder={t('Ingresa Tu Contraseña')}
                        containerClass={'mb-3'}></FormInputAcout>

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Ingresar')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login;

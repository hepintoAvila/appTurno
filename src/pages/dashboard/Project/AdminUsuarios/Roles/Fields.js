// @flow
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';

const Register = (props) => {
  const { setOpen, open } = useContext(DashboardContext);
  const {query} = useAdminUsuarios()
  const [items, setItems] = useState([{
    c: props?.ItemsUpdate?.length === 1 ? btoa(props?.ItemsUpdate[0]?.c) : '',
    a: props?.ItemsUpdate?.length === 1 ? btoa(props?.ItemsUpdate[0]?.a) : '',
    u: props?.ItemsUpdate?.length === 1 ? btoa(props?.ItemsUpdate[0]?.u) : '',
    d: props?.ItemsUpdate?.length === 1 ? btoa(props?.ItemsUpdate[0]?.d) : '',
    idpermiso: btoa(props?.Idpermiso),
    accion: btoa(props?.accion),
    opcion: btoa(props?.opcion),
    tipo: btoa(props?.tipo),
    entidad: btoa('senaV1'),
    id: btoa(props?.ItemsUpdate[0]?.id),
  }]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading, queryForm, error } = useSelector((state) => ({
    loading: state.Queryform.loading,
    error: state.Queryform.error,
    queryForm: state.Queryform.queryForm,
  }));


  const schemaResolver = yupResolver(
    yup.object().shape({
    })
  );

  const onSubmit = () => {

    dispatch(queryFormSend(...items))

    setTimeout(function () {
      query('AdminUsuarios', 'Roles', [{ opcion: 'consultar', obj: 'Roles' }]);
      setOpen(open);
    }, 2000);
  };
  const operado = [{ value: '', label: '' }, { value: 'S', label: 'S' }, { value: 'N', label: 'N' }];
  console.log(props)
  return (
    <>
      {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
      <div className="text-center w-75 m-auto">
        <h4 className="text-dark-50 text-center mt-0 fw-bold">{t(`${props?.textBtn}`)}</h4>
        <p className="text-muted mb-4">
          {t(`En esta sección puedes ${props?.textBtn} los permisos de la opcion ${props?.ItemsUpdate[0]?.submenu} para el ${props?.ItemsUpdate[0]?.rol}`)}
        </p>
      </div>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
        <Row>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Consultar</Form.Label>
              <Select
                type="select"
                name="c"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => setItems([{
                  ...items[0], c: btoa(e.value),
                  id: btoa(Number(props?.ItemsUpdate[0]?.id)),
                  rol:btoa(props?.ItemsUpdate[0]?.rol),

                }])}
                options={operado}
                selected={props?.ItemsUpdate[0]?.c}
                placeholder={`${props?.ItemsUpdate[0]?.c}`}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Registrar</Form.Label>
              <Select
                type="select"
                name="a"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => setItems([{
                  ...items[0], a: btoa(e.value),
                   id: btoa(Number(props?.ItemsUpdate[0]?.id)),
                   rol:btoa(props?.ItemsUpdate[0]?.rol),
                }])}
                options={operado}
                selected={props?.ItemsUpdate[0]?.a}
                placeholder={`${props?.ItemsUpdate[0]?.a}`}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Actualizar</Form.Label>
              <Select
                type="select"
                name="u"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => setItems([{
                  ...items[0], u: btoa(e.value),
                  id: btoa(Number(props?.ItemsUpdate[0]?.id)),
                }])}
                options={operado}
                selected={props?.ItemsUpdate[0]?.u}
                placeholder={`${props?.ItemsUpdate[0]?.u}`}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Eliminar</Form.Label>
              <Select
                type="select"
                name="d"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => setItems([{
                  ...items[0], d: btoa(e.value),
                  id: btoa(Number(props?.ItemsUpdate[0]?.id)),
                }])}
                options={operado}
                selected={props?.ItemsUpdate[0]?.d}
                placeholder={`${props?.ItemsUpdate[0]?.d}`}
              />
            </Form.Group>
          </Col>

          <Row>
          <Col sm={4}></Col>
          <Col sm={4}></Col>
            <Col sm={4}>
              <Form.Group className="mb-3 mb-3 mb-3 ">
                <Button variant="primary" type="submit" disabled={loading}>
                    Actualizar Roles
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Row>

      </VerticalForm>

    </>
  );
};

export default Register;

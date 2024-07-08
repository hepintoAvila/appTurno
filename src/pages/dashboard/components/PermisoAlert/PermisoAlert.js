import { Modal } from 'react-bootstrap';
import classNames from 'classnames';
import Spinner from '../../../../components/Spinner';
import { Suspense, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const loading = () => <div className="text-center"></div>;

const Spinners = ({ opcion, mensajeInicial, onClose }) => {
  const sizes = ['xl'];
  const mensaje = mensajeInicial
    ? 'Buscando permisos...'
    : opcion
      ? 'Cargando información...'
      : 'Opps: Usted no tiene permisos habilitados';

  return (
    <>
      {sizes.map((size, index) => {
        return (
          <Modal show={true} size={'lg'} key={index} onHide={onClose}>
            <Modal.Header closeButton>
              <h4 className="modal-description">{mensaje}</h4>
            </Modal.Header>
            <Modal.Body>
              <div className={classNames('w-100')}>
                <Spinner className="spinner-border" size={size} />
              </div>
            </Modal.Body>
          </Modal>
        );
      })}
    </>
  );
};

const PermisoAlert = ({ opcion }) => {
  const [mensajeInicial, setMensajeInicial] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMensajeInicial(false);
    }, 1000); // Establece el tiempo de retraso deseado

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    history.push('/');
    window.location.reload(); // Forzar recarga de la página
  };

  return (
    <Suspense fallback={loading()}>
      <Spinners opcion={opcion} mensajeInicial={mensajeInicial} onClose={handleClose} />
    </Suspense>
  );
};

export default PermisoAlert;

import NumericKeypad from './NumericKeypad';
import './TurnoSolicitud.css';
import { useTurnoContext } from '@/common';

import { Row, Col } from 'react-bootstrap';

const TurnoSolicitud: React.FC = () => {
  const {handleAtenderTurno,selectedOpcion} = useTurnoContext();

  return (
    <Row>
    <Col xl={3}  lg={{ span: 6, order: 1 }}>
    </Col>
    <Col xl={6} lg={{ span: 6, order: 2 }}>
    <div className="turno-solicitud">
    <div className={selectedOpcion ? 'turno-solicitud-opciones turno-tablero-enable' : 'turno-solicitud-opciones turno-tablero-disable'}>
        {selectedOpcion ? <i className="ri-checkbox-circle-line"><span>{selectedOpcion}</span></i> : <i className="ri-close-circle-line"><span>Motivo de la Solicitud para el Turno: </span></i>}
      </div>
      <NumericKeypad onSubmit={handleAtenderTurno} />
    </div>
    </Col>
  </Row>

  );
};

export default TurnoSolicitud;

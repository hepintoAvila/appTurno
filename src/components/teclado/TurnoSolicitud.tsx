import NumericKeypad from './NumericKeypad';
import './TurnoSolicitud.css';
import { useTurnoContext } from '@/common';

import { Row, Col } from 'react-bootstrap';

const TurnoSolicitud: React.FC = () => {
  const {handleAtenderTurno} = useTurnoContext();

  return (
    <Row>
    <Col xl={3}  lg={{ span: 6, order: 1 }}>
    </Col>
    <Col xl={6} lg={{ span: 6, order: 2 }}>
    <div className="turno-solicitud">
      <h1>Solicitud de Turno</h1>
      <NumericKeypad onSubmit={handleAtenderTurno} />
    </div>
    </Col>
    <Col xl={3} lg={{ span: 6, order: 3 }}>

    </Col>
  </Row>

  );
};

export default TurnoSolicitud;

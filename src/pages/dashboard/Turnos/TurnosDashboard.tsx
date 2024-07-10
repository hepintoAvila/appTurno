import { useState } from 'react';
import { TurnoSolicitud, TurnoTablero } from '@/components/teclado';
import { Row, Col } from 'react-bootstrap';
import { useTurnoContext } from '@/common';

const TurnosDashboard = () => {
  const {handleAtenderTurno,turnos} = useTurnoContext();
	const [user, setUser] = useState(
		localStorage.getItem('_HYPER_AUTH')
			? JSON.parse(localStorage.getItem('_HYPER_AUTH') || '{}')
			: undefined
	);


	return (
		<>
          {(() => {
        switch (user?.username) {
          case 'Teclado':
            return <>
                <Row>
                  <Col xl={3}  lg={{ span: 6, order: 1 }}>
                  {''}
                  </Col>
                  <Col xl={6} lg={{ span: 6, order: 1 }}>
                  <TurnoSolicitud/>
                  </Col>
                  <Col xl={3} lg={{ span: 6, order: 3 }}>
                  <TurnoTablero turnos={turnos} onAtenderTurno={handleAtenderTurno} />
                  </Col>
                </Row>

            </>
                case 'Pantalla':
                  return <>
                      <Row>
                        <Col xl={3}  lg={{ span: 6, order: 1 }}>
                        <TurnoTablero turnos={turnos} onAtenderTurno={handleAtenderTurno} />
                        </Col>
                        <Col xl={6} lg={{ span: 6, order: 1 }}>
                        {''}
                        </Col>
                        <Col xl={3} lg={{ span: 6, order: 3 }}>
                        {''}
                        </Col>
                      </Row>

                  </>
          default:
            return (
              <>{''}</>
            );
        }
      })()}

		</>
	);
};

export { TurnosDashboard };

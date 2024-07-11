import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { TurnoSolicitud, TurnoTablero } from '@/components/teclado';
import { useTurnoContext } from '@/common';

const TurnosDashboard = () => {
  const { handleAtenderTurno, turnos } = useTurnoContext();
  const [user, setUser] = useState<{ username?: string }>(
    localStorage.getItem('_HYPER_AUTH')
      ? JSON.parse(localStorage.getItem('_HYPER_AUTH') || '{}')
      : {}
  );

  return (
    <>
      {(() => {
        switch (user?.username) {
          case 'Teclado':
            return (
              <Row>
                <Col xl={3} lg={{ span: 6, order: 1 }}>
                  <TurnoSolicitud />
                </Col>
                <Col xl={9} lg={{ span: 6, order: 1 }}>
                  <TurnoTablero
                    turnos={turnos}
                    onAtenderTurno={handleAtenderTurno}
                    user={user?.username}
                  />
                </Col>
              </Row>
            );

          case 'Pantalla':
            return (
              <Row>
                <Col xl={3} lg={{ span: 6, order: 1 }}>
                  <TurnoTablero
                    turnos={turnos}
                    onAtenderTurno={handleAtenderTurno}
                    user={user?.username}
                  />
                </Col>
                <Col xl={6} lg={{ span: 6, order: 1 }}>
                  {' '}
                </Col>
                <Col xl={3} lg={{ span: 6, order: 3 }}>
                  {' '}
                </Col>
              </Row>
            );

          case 'Ventanilla':
            return (
              <Row>
                <Col xl={3} lg={{ span: 6, order: 1 }}>
                  <TurnoTablero
                    turnos={turnos}
                    onAtenderTurno={handleAtenderTurno}
                    user={user?.username}
                  />
                </Col>
                <Col xl={6} lg={{ span: 6, order: 1 }}>
                  {' '}
                </Col>
                <Col xl={3} lg={{ span: 6, order: 3 }}>
                  {' '}
                </Col>
              </Row>
            );

          default:
            return <></>;
        }
      })()}
    </>
  );
};

export { TurnosDashboard };

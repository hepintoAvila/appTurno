import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { TurnoSolicitud } from '@/components/teclado';
import { useTurnoContext } from '@/common';
import TurnoPantalla from '@/components/teclado/TurnoPantalla';
import TurnoTableroVentanilla from '@/components/teclado/TurnoTableroVentanilla';

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  identificacion: number;
  role: 'Teclado' | 'Pantalla' | 'Ventanilla'; // Definir roles de forma específica
  turno: string;
  token: string;
}
interface Turno {
  codigo: string;
  identificacion: string;
  atendido: boolean;
  _id: string;
  __v: number;
  fecha: string;
}


interface TurnoDashbProps {
  usuarios: User[];
}

const TurnosDashboard: React.FC<TurnoDashbProps> = ({ usuarios }) => {
  const { handleAtenderTurno } = useTurnoContext();
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [user, setUser] = useState<User | null>(null); // Inicializar con null o un valor inicial adecuado

  useEffect(() => {
    const storedUser = localStorage.getItem('_HYPER_AUTH');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setTurnos(turnos)
    }
  }, []); // [] como dependencia para ejecutar solo una vez al montar el componente
  console.log('turnos',turnos)
  return (
    <>
      {user?.role === 'Teclado' && (
        <Row>
          <Col xl={12} lg={{ span: 6, order: 1 }}>
            <TurnoSolicitud />
          </Col>
        </Row>
      )}

      {user?.role === 'Pantalla' && (
        <Row>
          <Col xl={12} lg={{ span: 12, order: 1 }}>
          <TurnoPantalla turnos={turnos}/>
          </Col>

        </Row>
      )}

      {user?.role === 'Ventanilla' && (
        <Row>
          <Col xl={3} lg={{ span: 6, order: 1 }}>
            <TurnoTableroVentanilla
              onAtenderTurno={handleAtenderTurno}
              tipoTurno={user.turno} // Asegúrate de pasar el valor correcto de user.turno
            />
          </Col>
          <Col xl={6} lg={{ span: 6, order: 1 }}>
            {/* Contenido de la ventanilla */}
          </Col>
          <Col xl={3} lg={{ span: 6, order: 3 }}>
            {/* Otro contenido */}
          </Col>
        </Row>
      )}
    </>
  );
};

export { TurnosDashboard };

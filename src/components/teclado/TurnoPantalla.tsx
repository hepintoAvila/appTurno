import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './TurnoTablero.css';
import config from '../../config';

interface Turno {
  codigo: string;
  identificacion: string;
  atendido: boolean;
  _id: string;
  __v: number;
}

interface TurnoTableroProps {
  tipoTurno: string | undefined;
}

const TurnoPantalla: React.FC<TurnoTableroProps> = ({ tipoTurno }) => {
  const URL_SERVER = config.API_URL;
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [turnosAtendidos, setTurnosAtendidos] = useState<Turno[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTurnosActualizados();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchTurnosActualizados = async () => {
    try {
      const response = await fetch(`${URL_SERVER}/api/turnos?fecha=${new Date().toISOString()}`); // Ajusta la URL según tu API
      if (!response.ok) {
        throw new Error('Failed to fetch turnos');
      }
      const data = await response.json();

      const sortedTurnos = data.sort((a: Turno, b: Turno) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateB.getTime() - dateA.getTime(); // Orden descendente para mostrar el más reciente primero
      });

      const filteredTurnos = sortedTurnos.filter(turno => turno.codigo.startsWith(tipoTurno || ''));

      setTurnos(filteredTurnos);
      setTurnosAtendidos(filteredTurnos.filter(turno => turno.atendido));
    } catch (error) {
      console.error('Error fetching turnos:', error);
    }
  };

  const renderTablero = () => {
    const turnosNoAtendidos = turnos.filter(turno => !turno.atendido);
    const turnosParaMostrar = [...turnosAtendidos, ...turnosNoAtendidos].slice(0, 25);

    const tablero = [];
    for (let fila = 0; fila < 7; fila++) {
      const filaTurnos = [];
      for (let columna = 0; columna < 5; columna++) {
        const index = fila * 5 + columna;
        const turno = turnosParaMostrar[index];

        filaTurnos.push(
          <Col key={columna} xl={3} lg={6} className="ventanilla">
            {turno ? (
              <ul>
                <li key={turno._id} className={turno.atendido ? 'ventanilla-enable' : 'ventanilla-disable'}>
                  Turno: {turno.codigo}
                  <br />
                  CC: {turno.identificacion}
                  {turno.atendido ? <i className="ri-checkbox-circle-line"></i> : <i className="ri-close-circle-line"></i>}
                </li>
              </ul>
            ) : null}
          </Col>
        );
      }
      tablero.push(<Row className="ventanilla-rows" key={fila}>{filaTurnos}</Row>);
    }
    return tablero;
  };

  return (
    <div className="ventanilla">
      {renderTablero()}
    </div>
  );
};

export default TurnoPantalla;

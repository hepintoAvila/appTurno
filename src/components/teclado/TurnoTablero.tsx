import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './TurnoTablero.css';

interface Turno {
  numero: string;
  atendido: boolean;
}

interface TurnoTableroProps {
  turnos: Turno[];
  onAtenderTurno: (index: number) => void;
}

const TurnoTablero: React.FC<TurnoTableroProps> = ({ turnos, onAtenderTurno }) => {
  const [localTurnos, setLocalTurnos] = useState<Turno[]>(turnos);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedTurnos = localStorage.getItem('turnos');
      if (savedTurnos) {
        setLocalTurnos(JSON.parse(savedTurnos));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setLocalTurnos(turnos);
  }, [turnos]);

  const renderColumns = () => {
    const columns = [];
    for (let i = 0; i < localTurnos.length; i += 5) {
      const columnTurnos = localTurnos.slice(i, i + 5);
      columns.push(
        <Col key={i} xl={3} lg={6} className="turno-tablero" >
          <ul>
            {columnTurnos.map((turno, index) => (
              <li key={i + index} className={turno.atendido ? 'turno-tablero-enable' : 'turno-tablero-disable'}>
                Turno: {turno.numero}
                <button onClick={() => onAtenderTurno(i + index)} disabled={turno.atendido}>
                  {turno.atendido ? <i className="mdi mdi-emoticon"></i> : <i className="mdi mdi-emoticon-angry-outline"></i>}
                </button>
              </li>
            ))}
          </ul>
        </Col>
      );
    }
    return columns;
  };

  return (
    <div className="turno-tablero">
      <h2>Tablero de Turnos</h2>
      <Row>
        {renderColumns()}
      </Row>
    </div>
  );
};

export default TurnoTablero;

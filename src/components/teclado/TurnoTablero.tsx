import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './TurnoTablero.css';

interface Turno {
  codigo: string;
  numero: string;
  atendido: boolean;
  fecha: Date;
  _id: string;
  __v: number;
}

interface TurnoTableroProps {
  turnos: Turno[];
  user: string | undefined;
}

const TurnoTablero: React.FC<TurnoTableroProps> = ({ turnos, user }) => {

  const renderColumns = () => {
    const columns = [];
    for (let i = 0; i < turnos.length; i += 5) {
      const columnTurnos = turnos.slice(i, i + 5);
      columns.push(
        <Col key={i} xl={3} lg={6} className="turno-tablero">
          <ul>
            {columnTurnos.map(turno => (
              <li key={turno._id} className={turno.atendido ? 'turno-tablero-enable' : 'turno-tablero-disable'}>
                 {turno.codigo}
                  <button  disabled={turno.atendido}>
                    {turno.atendido ? <i className="ri-checkbox-circle-line"></i> : <i className="ri-close-circle-line"></i>}
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
      <Row>{renderColumns()}</Row>
    </div>
  );
};

export default TurnoTablero;

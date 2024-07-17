import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './TurnoTablero.css';
import playSound from '../../common/helpers/playSound';

interface Turno {
  codigo: string;
  identificacion: string;
  atendido: boolean;
  _id: string;
  __v: number;
}

interface TurnoTableroProps {
  turnos: Turno[];
  onAtenderTurno: (turno: Turno) => void;
  user: string | undefined;
}

const TurnoTableroVentanilla: React.FC<TurnoTableroProps> = ({ turnos, onAtenderTurno, user }) => {
  const handleAtenderClick = (turno: Turno) => {
    onAtenderTurno(turno);

    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        playSound();
      }, i * 500); // Intervalo de 500ms entre cada reproducción
    }
  };

  const renderColumns = () => {
    const columns = [];
    for (let i = 0; i < turnos.length; i += 5) {
      const columnTurnos = turnos.slice(i, i + 5);
      columns.push(
        <Col key={i} xl={3} lg={6} className="turno-tablero">
          <ul>
            {columnTurnos.map(turno => (
              <li key={turno._id} className={turno.atendido ? 'turno-tablero-enable' : 'turno-tablero-disable'}>
                Turno: {turno.codigo}
                <br />
                CC: {turno.identificacion}
                {user === 'Ventanilla' && (
                  <button onClick={() => handleAtenderClick(turno)} disabled={turno.atendido}>
                    {turno.atendido ? <i className="ri-checkbox-circle-line"></i> : <i className="ri-close-circle-line"></i>}
                  </button>
                )}
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
      <h2>Turnos</h2>
      <p className="header-title turno-title">AE - Atención Estudiantes, AEG - Certificados y Constancias de Egresados, CCE - Constancias y Certificados de Estudios.</p>
      <Row>{renderColumns()}</Row>
    </div>
  );
};

export default TurnoTableroVentanilla;

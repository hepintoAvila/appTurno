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
  onAtenderTurno: (turno: Turno) => void;
  tipoTurno: string | undefined;
}

const TurnoTableroVentanilla: React.FC<TurnoTableroProps> = ({ onAtenderTurno, tipoTurno }) => {
  const URL_SERVER = config.API_URL;
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [turnosAtendidos, setTurnosAtendidos] = useState<Turno[]>([]); // Agregado

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

      // Ordenar turnos por fecha y hora
      const sortedTurnos = data.sort((a: Turno, b: Turno) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateB.getTime() - dateA.getTime(); // Orden descendente para mostrar el más reciente primero
      });

      setTurnos(sortedTurnos);
    } catch (error) {
      console.error('Error fetching turnos:', error);
    }
  };
  const updateTurnoAtendido = async (turno: Turno) => {
    try {
      const response = await fetch(`${URL_SERVER}/api/turnos/${turno._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...turno, atendido: true, codigo:turno.codigo,identificacion:turno.identificacion}),
      });

      if (!response.ok) {
        throw new Error('Failed to update turno');
      }

      // Optionally, fetch updated data after successful update
      fetchTurnosActualizados();
    } catch (error) {
      console.error('Error updating turno:', error);
    }
  };
  const handleAtenderClick = async (turno: Turno) => {
    onAtenderTurno(turno);
    // Update the turno in the database
    await updateTurnoAtendido(turno);
    setTurnos(prevTurnos =>
      prevTurnos.map(t => (t._id === turno._id ? { ...t, atendido: true } : t))
    );
    setTurnosAtendidos(prevAtendidos => [...prevAtendidos, { ...turno, atendido: true }]);
  };

  const renderTablero = () => {
    const filteredTurnos = turnos.filter(turno => turno.codigo.startsWith(tipoTurno || ''));

    const turnosNoAtendidos = filteredTurnos.filter(turno => !turno.atendido);
    const turnosParaMostrar = [...turnosNoAtendidos, ...turnosAtendidos.slice(0, 25 - turnosNoAtendidos.length)];

    const tablero = [];
    for (let fila = 0; fila < 5; fila++) {
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
                  {tipoTurno !== 'EE' && (
                    <button onClick={() => handleAtenderClick(turno)} disabled={turno.atendido}>
                      {turno.atendido ? <i className="ri-checkbox-circle-line"></i> : <i className="ri-close-circle-line"></i>}
                    </button>
                  )}
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
      <h2>Turnos</h2>
      <p className="header-title turno-title">AE - Atención Estudiantes, AEG - Certificados y Constancias de Egresados, CCE - Constancias y Certificados de Estudios.</p>
      {renderTablero()}
    </div>
  );
};

export default TurnoTableroVentanilla;

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './TurnoTablero.css';

interface Turno {
  codigo: string;
  numero: string;
  atendido: boolean;
  _id: string;
  __v: number;
}

interface TurnoTableroProps {
  turnos: Turno[];
}

const TurnoTableroUsuario: React.FC<TurnoTableroProps> = ({ turnos }) => {
  const [turnosActualizados, setTurnosActualizados] = useState<Turno[]>(turnos);

  useEffect(() => {
    const interval = setInterval(() => {
      // Aquí realizas la consulta a la API para obtener los turnos actualizados
      fetchTurnos();
    }, 5000); // Consulta cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const fetchTurnos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/turnos'); // Ajusta la URL según tu API
      if (!response.ok) {
        throw new Error('Failed to fetch turnos');
      }
      const data = await response.json();
      setTurnosActualizados(data); // Actualiza los turnos en el estado local
    } catch (error) {
      console.error('Error fetching turnos:', error);
    }
  };

  const renderColumns = () => {
    const columns = [];
    for (let i = 0; i < turnosActualizados.length; i += 5) {
      const columnTurnos = turnosActualizados.slice(i, i + 5);
      columns.push(
        <Col key={i} xl={3} lg={6} className="turno-tablero">
          <ul>
            {columnTurnos.map(turno => (
              <li key={turno._id} className={turno.atendido ? 'turno-tablero-enable' : 'turno-tablero-disable'}>
                {turno.codigo}
                <button className="turno-tablero-btn">
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

export default TurnoTableroUsuario;

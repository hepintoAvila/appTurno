import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios'; // Asegúrate de tener axios instalado
import './TurnoTablero.css';

interface Turno {
  codigo: string;
  identificacion: string;
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
  const [visibleTurnos, setVisibleTurnos] = useState<Turno[]>([]);
  const [updatedTurnos, setUpdatedTurnos] = useState<Turno[]>(turnos);

  // Filtrar turnos no atendidos
  const turnosNoAtendidos = updatedTurnos.filter(turno => !turno.atendido);

  // Cargar los primeros 25 turnos no atendidos
  const loadInitialTurnos = () => {
    const initialTurnos = turnosNoAtendidos.slice(0, 40);
    setVisibleTurnos(initialTurnos);
  };

  // Cargar más turnos no atendidos
  const loadMoreTurnos = () => {
    const additionalTurnos = turnosNoAtendidos.slice(visibleTurnos.length, visibleTurnos.length + 40);
    setVisibleTurnos(prevTurnos => [...prevTurnos, ...additionalTurnos]);
  };

  // Obtener los turnos más recientes
  const fetchTurnos = async () => {
    try {
      const response = await axios.get<Turno[]>('http://localhost:5000/api/turnos');
      setUpdatedTurnos(response.data);
    } catch (error) {
      console.error('Error fetching turnos:', error);
    }
  };

  // Configurar intervalo para actualización automática
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTurnos();
    }, 5000); // Actualizar cada 5 segundos

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  // Cargar los turnos iniciales cuando los turnos cambian
  useEffect(() => {
    loadInitialTurnos();
  }, [updatedTurnos]); // Ejecutar solo cuando updatedTurnos cambie

  const renderColumns = () => {
    const columns = [];
    for (let i = 0; i < visibleTurnos.length; i += 5) {
      const columnTurnos = visibleTurnos.slice(i, i + 5);
      columns.push(
        <Col key={i} xl={3} lg={6} className="turno-tablero">
          <ul>
            {columnTurnos.map(turno => (
              <li key={turno._id} className={turno.atendido ? 'turno-tablero-enable' : 'turno-tablero-disable'}>
                  {turno.codigo}
                  {turno.atendido ? <i className="ri-checkbox-circle-line"></i> : <i className="ri-close-circle-line"></i>}
              </li>
            ))}
          </ul>
        </Col>
      );
    }
    return columns;
  };

  return (
    <div className="card turno-card">
      <div className="turno-tablero">
        <h2 className="header-title turno-title">Tablero de Turnos</h2>
        <Row>{renderColumns()}</Row>
        {visibleTurnos.length < turnosNoAtendidos.length && (
          <Button onClick={loadMoreTurnos} className="load-more-btn">Cargar Más Turnos</Button>
        )}
      </div>
    </div>
  );
};

export default TurnoTablero;
0

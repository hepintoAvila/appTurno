import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './TurnoTableroUsuario.css';
import config from '../../config';

interface Turno {
  codigo: string;
  identificacion: string;
  atendido: boolean;
  _id: string;
  __v: number;
  fecha: string;
}

interface TurnoTableroProps {
  turnos: Turno[];
}

const TurnoTableroUsuario: React.FC<TurnoTableroProps> = () => {
  const URL_SERVER = config.API_URL;
  const [turnosActualizados, setTurnosActualizados] = useState<Turno[]>([]);
  const [visibleTurnos, setVisibleTurnos] = useState<Turno[]>([]);
  const [parpadeandoTurnos, setParpadeandoTurnos] = useState<Set<string>>(new Set());
  const [turnosAtendidos, setTurnosAtendidos] = useState<Turno[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTurnos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchTurnos = async () => {
    try {
      const response = await fetch(`${URL_SERVER}/api/turnos`);
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('Failed to fetch turnos');
      }

      const data = await response.json();
      console.log('Data received:', data);

      if (!Array.isArray(data) || data.length === 0) {
        console.log('No hay turnos disponibles.');
        return;
      }

      setTurnosActualizados(data);
    } catch (error) {
      console.error('Error fetching turnos:', error);
    }
  };

  useEffect(() => {
    updateVisibleTurnos();
    updateTurnosAtendidos();
  }, [turnosActualizados]);

  const updateVisibleTurnos = () => {
    const turnosNoAtendidos = turnosActualizados.filter(turno => !turno.atendido);
    setVisibleTurnos(turnosNoAtendidos.slice(0, 25)); // Mostrar los primeros 25 turnos sin atender
  };

  const updateTurnosAtendidos = () => {
    const turnosAtendidosNuevos = turnosActualizados.filter(turno => turno.atendido);
    const sortedTurnosAtendidos = turnosAtendidosNuevos
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    setTurnosAtendidos(sortedTurnosAtendidos.slice(0, 5)); // Mostrar los primeros 5 turnos atendidos en orden descendente
  };

  useEffect(() => {
    const atendidos = visibleTurnos.filter(turno => turno.atendido);
    if (atendidos.length > 0) {
      atendidos.forEach(turno => {
        if (!parpadeandoTurnos.has(turno._id)) {
          setParpadeandoTurnos(prev => new Set(prev).add(turno._id));
          setTimeout(() => {
            setParpadeandoTurnos(prev => {
              const newSet = new Set(prev);
              newSet.delete(turno._id);
              return newSet;
            });
            setVisibleTurnos(prev => prev.filter(t => t._id !== turno._id));
            setTurnosAtendidos(prev => {
              const newAtendidos = [turno, ...prev.filter(t => t._id !== turno._id)];
              return newAtendidos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).slice(0, 5);
            });
          }, 5000);
        }
      });
    }
  }, [visibleTurnos]);

  const renderTurnosGrid = (turnos) => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const columns = [];
      for (let j = 0; j < 5; j++) {
        const index = i * 5 + j;
        const turno = turnos[index];
        columns.push(
          <div key={j} className="turno-grid-item">
            {turno ? (
              <div className={`turno-tablero-item ${turno.atendido ? 'turno-tablero-enable' : 'turno-tablero-disable'} ${parpadeandoTurnos.has(turno._id) ? 'parpadeando' : ''}`}>
                {turno.codigo}
              </div>
            ) : (
              <div className="turno-tablero-item empty-slot"></div>
            )}
          </div>
        );
      }
      rows.push(
        <div key={i} className="turno-grid-row">
          {columns}
        </div>
      );
    }
    return rows;
  };


  const renderColumnsAtendidos = (turnosAtendidos: Turno[]) => {
    // Divide los turnos en grupos de 5
    const groupedTurnos = [];
    for (let i = 0; i < turnosAtendidos.length; i += 5) {
      groupedTurnos.push(turnosAtendidos.slice(i, i + 5));
    }

    // Renderiza cada grupo en una fila
    return groupedTurnos.map((group, index) => (
      <Row key={index} className="turno-tablero-estudiante">
        {group.map(turno => (
          <Col key={turno._id} xl={2} lg={2} md={2} sm={2} xs={2} className="turno-tablero-estudiante">
            <ul>
              <li
                className={`turno-tablero-item-estudiante ${turno.atendido ? 'turno-tablero-enable' : 'turno-tablero-disable'} ${parpadeandoTurnos.has(turno._id) ? 'parpadeando' : ''}`}
              >
                {turno.codigo}
                {turno.atendido ? <i className="ri-checkbox-circle-line"></i> : <i className="ri-close-circle-line"></i>}
              </li>
            </ul>
          </Col>
        ))}
      </Row>
    ));
  };


  console.log('turnosAtendidos', turnosAtendidos);

  return (
    <div className="card turno-card-pantalla">
      <div className="turno-tablero-pantalla">
        <div className="turno-grid-container">{renderTurnosGrid(visibleTurnos)}</div>
        <h2 className="header-title turno-title">Últimos Turnos Atendidos</h2>
        <Row><div className="turno-grid-container">{renderColumnsAtendidos(turnosAtendidos)}</div></Row>
      </div>
    </div>
  );

};

export default TurnoTableroUsuario;

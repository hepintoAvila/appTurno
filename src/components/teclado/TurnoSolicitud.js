// src/components/TurnoSolicitud.js
import React, { useContext } from 'react';
import NumericKeypad from './NumericKeypad';
import TurnoTablero from './TurnoTablero';
import './TurnoSolicitud.css';
import { DashboardContext } from '../../layouts/context/DashboardContext';

const TurnoSolicitud = () => {
  const {
    turnos,
    handleAtenderTurno,
    handleTurnoSubmit,
  } = useContext(DashboardContext);

  return (
    <div className="turno-solicitud">
      <h1>Solicitud de Turno</h1>
      <NumericKeypad onSubmit={handleTurnoSubmit} />
      <TurnoTablero turnos={turnos} onAtenderTurno={handleAtenderTurno} />
    </div>
  );
};

export default TurnoSolicitud;

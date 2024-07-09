// src/components/TurnoTablero.js
import React from 'react';
import './TurnoTablero.css';

const TurnoTablero = ({ turnos, onAtenderTurno }) => {
  return (
    <div className="turno-tablero">
      <h2>Tablero de Turnos</h2>
      <ul>
        {turnos.map((turno, index) => (
          <li key={index} className={turno.atendido ? 'atendido' : ''}>
            Turno: {turno.numero}
            <button onClick={() => onAtenderTurno(index)} disabled={turno.atendido}>
              {turno.atendido ? 'Atendido' : 'Marcar como atendido'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TurnoTablero;

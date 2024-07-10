 import React, { useEffect, useState } from 'react';
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

  return (
    <div className="turno-tablero">
      <h2>Tablero de Turnos</h2>
      <ul>
        {localTurnos?.map((turno, index) => (
                    <li key={index} className={turno.atendido ? 'turno-tablero-enable' : 'turno-tablero-desnable'}>
                    Turno: {turno.numero}
                    <button onClick={() => onAtenderTurno(index)} disabled={turno.atendido}>
                      {turno.atendido ?  <i className="mdi mdi-emoticon"></i>: <i className="mdi mdi-emoticon-angry-outline"></i>}

                    </button>
                  </li>
        ))}
      </ul>
    </div>
  );
};

export default TurnoTablero;

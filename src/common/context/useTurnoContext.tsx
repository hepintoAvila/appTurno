import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

interface Turno {
  codigo: string;
  numero: string;
  atendido: boolean;
  _id: string;
  __v: number;
}

interface TurnoContextProps {
  turnos: Turno[];
  handleAtenderTurno: (turno: Turno) => void; // Cambiar a recibir Turno como parámetro

}

const TurnoContext = createContext<TurnoContextProps | undefined>(undefined);

export const useTurnoContext = () => {
  const context = useContext(TurnoContext);
  if (!context) {
    throw new Error('useTurnoContext must be used within a TurnoProvider');
  }
  return context;
};

export const TurnoProvider: React.FC = ({ children }) => {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('turnoAtendido', (data: Turno) => {
      setTurnos(prevTurnos =>
        prevTurnos.map(turno =>
          turno._id === data._id ? { ...turno, atendido: true } : turno
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    axios.get<Turno[]>('http://localhost:5000/api/turnos')
      .then(response => {
        setTurnos(response.data);
      })
      .catch(error => {
        console.error('Error fetching turnos:', error);
      });
  }, []);

  const handleAtenderTurno = (turno: Turno) => {
    const updatedTurnos = turnos?.map(t =>
      t._id === turno._id ? { ...t, atendido: true } : t
    );
    setTurnos(updatedTurnos);

    // Emitir evento a través de Socket.io
    const socket = io('http://localhost:5000');
    socket.emit('turnoAtendido', turno);
    socket.disconnect();
  };

  return (
    <TurnoContext.Provider value={{ turnos, handleAtenderTurno }}>
      {children}
    </TurnoContext.Provider>
  );
};

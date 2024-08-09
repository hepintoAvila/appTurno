import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import config from '../../config';
interface Turno {
  codigo: string;
  identificacion: string;
  atendido: boolean;
  fecha: Date;
  _id: string;
  __v: number;
}

interface TurnoContextProps {
  turnos: Turno[];
  handleAtenderTurno: (turno: Turno) => void;
  setSelectedOpcion: (selectedOpcion: string) => void;
  selectedOpcion: string;
}

const TurnoContext = createContext<TurnoContextProps | undefined>(undefined);
const URL_SERVER = config.API_URL;
export const useTurnoContext = () => {
  const context = useContext(TurnoContext);
  if (!context) {
    throw new Error('useTurnoContext must be used within a TurnoProvider');
  }
  return context;
};

export const TurnoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [selectedOpcion, setSelectedOpcion] = useState('');

  useEffect(() => {
    const socket = io(`${URL_SERVER}`);

    socket.on('turnoAtendido', (data: Turno) => {
      console.log('Turno atendido recibido:', data); // Verifica el evento recibido
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
    axios.get<Turno[]>(`${URL_SERVER}/api/turnos`)
      .then(response => {
        //console.log('Fetched turnos:', response.data); // Verifica los turnos recibidos
        setTurnos(response.data);
      })
      .catch(error => {
        console.error('Error fetching turnos:', error);
      });
  }, []);

  const handleAtenderTurno = async (turno: Turno) => {
    try {
      // Actualiza el estado localmente
      const updatedTurnos = turnos?.map(t =>
        t._id === turno._id ? { ...t, atendido: true } : t
      );
      console.log('Updated turnos locally:', updatedTurnos); // Verifica actualización local
      setTurnos(updatedTurnos);

      // Actualiza en la base de datos
      const response = await fetch(`${URL_SERVER}/api/turnos/${turno._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update turno');
      }

      // Emitir evento a través de Socket.io
      const socket = io(`${URL_SERVER}`);
      socket.emit('turnoAtendido', turno);
      socket.disconnect();
    } catch (error) {
      console.error('Error updating turno:', error);
    }
  };

  return (
    <TurnoContext.Provider value={{ turnos, handleAtenderTurno, selectedOpcion, setSelectedOpcion }}>
      {children}
    </TurnoContext.Provider>
  );
};

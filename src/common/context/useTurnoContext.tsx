import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

type Turno = {
  numero: string;
  atendido: boolean;
};

interface TurnoContextProps {
  turnos: Turno[];
  handleTurnoSubmit: (value: string) => void;
  handleAtenderTurno: (index: number) => void;
}

const TurnoContext = createContext<TurnoContextProps | undefined>(undefined);

export function useTurnoContext() {
  const context = useContext(TurnoContext);
  if (context === undefined) {
    throw new Error('useTurnoContext must be used within a TurnoProvider');
  }
  return context;
}

export function TurnoProvider({ children }: { children: ReactNode }) {
  const [turnos, setTurnos] = useState<Turno[]>(() => {
    const savedTurnos = localStorage.getItem('turnos');
    return savedTurnos ? JSON.parse(savedTurnos) : [];
  });

  useEffect(() => {
    localStorage.setItem('turnos', JSON.stringify(turnos));
  }, [turnos]);

  const generateTurnoNumber = (input: string) => {
    const prefix = 'A';
    const maxTurnos = 9999;
    let currentTurno = 0;

    if (turnos.length > 0) {
      const lastTurno = turnos[turnos.length - 1].numero;
      currentTurno = parseInt(lastTurno.slice(1), 10);
    }

    if (currentTurno >= maxTurnos) {
      throw new Error('Max turnos reached');
    }

    const newTurno = prefix + String(currentTurno + 1).padStart(4, '0');
    return newTurno;
  };

  const handleTurnoSubmit = useCallback((input: string) => {
    const newTurno = generateTurnoNumber(input);
    setTurnos(prevTurnos => [...prevTurnos, { numero: newTurno, atendido: false }]);
  }, [turnos]);

  const handleAtenderTurno = useCallback((index: number) => {
    setTurnos(prevTurnos => {
      const nuevosTurnos = [...prevTurnos];
      if (nuevosTurnos[index]) {
        nuevosTurnos[index].atendido = true;
      }
      return nuevosTurnos;
    });
  }, []);

  return (
    <TurnoContext.Provider
      value={{
        turnos,
        handleTurnoSubmit,
        handleAtenderTurno,
      }}
    >
      {children}
    </TurnoContext.Provider>
  );
}

export type Turno = {
  identificacion?: string;
  atendido: boolean;
};

export interface TurnoContextProps {
  turnos: Turno[];
  handleTurnoSubmit: (identificacion: string) => void;
  handleAtenderTurno: (index: number) => void;
};

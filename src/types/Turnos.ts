export type Turno = {
  numero?: string;
  atendido: boolean;
};

export interface TurnoContextProps {
  turnos: Turno[];
  handleTurnoSubmit: (numero: string) => void;
  handleAtenderTurno: (index: number) => void;
};

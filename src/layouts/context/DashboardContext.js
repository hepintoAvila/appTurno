/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useState} from 'react';

//import { useAdminUsuarios } from '../../hooks/useAdminUsuarios';

const DashboardContext = createContext();
const DashboardProvider = ({ children }) => {
  const [turnos, setTurnos] = useState([]);

  const handleTurnoSubmit = (numero) => {

    setTurnos([...turnos, { numero, atendido: false }]);
  };

  const handleAtenderTurno = (index) => {
    const nuevosTurnos = [...turnos];
    nuevosTurnos[index].atendido = true;
    setTurnos(nuevosTurnos);
  };
  const data = {
    handleTurnoSubmit,
    handleAtenderTurno,
    turnos,
  };
  return (
    <>
      <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
    </>
  );
};
export { DashboardContext, DashboardProvider };

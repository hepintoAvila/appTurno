import React, {createContext,useState} from 'react';

const ValidarContext = createContext();
const ValidarProvider = ({ children }) => {
    
    const [validateSanciones, setErrorSanciones] = useState({
        errorAcademica:false,
        errorDisciplinaria:false,
        errorInasistencias:false,
        errorVerbal:false,
        errorEscrito:false,    
    });

const data = {
    validateSanciones, setErrorSanciones,
};

    return (
      <>
          <ValidarContext.Provider value={data}>{children}</ValidarContext.Provider>
      </>
  );
};
export { ValidarContext, ValidarProvider};

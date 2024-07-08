import React, {createContext, useState} from 'react';

const ValidadorContext = createContext();
const ValidadorProvider = ({ children }) => {



    const [validateError, setError] = useState({
      name:'',
      value: false,
    });

    const [validado, setValidado] = useState({
      name:'',
      value: false,
    });


const data = {
    validateError, setError,validado,setValidado
};

    return (
      <>
          <ValidadorContext.Provider value={data}>{children}</ValidadorContext.Provider>
      </>
  );
};
  export { ValidadorContext, ValidadorProvider};

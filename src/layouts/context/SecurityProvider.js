import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const SecurityContext = createContext();

// Crear un componente proveedor para el contexto
export const SecurityProvider = ({ children }) => {
  const [errors, setErrors] = useState({});


  const checkSpecialChars = (field, value) => {
    const stringValue = String(value).trim(); // Convertir value a cadena de texto y eliminar espacios en blanco
    let fieldErrors = { hasSpecialChar: false, isEmpty: false };
    if (stringValue === '') {
      fieldErrors.isEmpty = true;
    } else if (field !== 'fecha' && /[^a-zA-Z0-9\s.,:áéíóúÁÉÍÓÚñÑ@]/.test(stringValue)) {
      fieldErrors.hasSpecialChar = true;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: fieldErrors,
    }));
  };

  return (
    <SecurityContext.Provider value={{ errors, checkSpecialChars }}>
      {children}
    </SecurityContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
export const useSecurity = () => {
  return useContext(SecurityContext);
};

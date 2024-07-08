import React from 'react';
import { useSecurity } from '../layouts/context/SecurityProvider';

const InputValidado = ({ label, type, rows, name, value, onChange, placeholder, containerClass }) => {
  const { errors } = useSecurity(); // Usamos el hook useSecurity
  const fieldErrors = errors[name] || {};

  return (
    <div className={containerClass}>
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea
          rows={rows}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {fieldErrors.hasSpecialChar && (
        <p style={{ color: 'red' }}>Caracteres especiales no están permitidos!</p>
      )}
      {fieldErrors.isEmpty && (
        <p style={{ color: 'red' }}>La entrada no puede estar vacía!</p>
      )}
    </div>
  );
};

export default InputValidado;

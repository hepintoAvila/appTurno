import React, { useState } from 'react';
import './NumericKeypad.css';

interface NumericKeypadProps {
  onSubmit: (value: string) => void;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onSubmit }) => {

  const [display, setDisplay] = useState<string>('');

  const handleButtonClick = (value: number) => {
    setDisplay(prevDisplay => prevDisplay + value.toString());
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/turnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numero: display }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit turno');
      }

      //const data = await response.json();
      // Actualiza el contexto de turnos con el nuevo turno
      setDisplay(''); // Limpia el display después de enviar el turno
      window.location.reload();

    } catch (error) {
      console.error('Error submitting turno:', error);
    }
  };

  return (
    <div className="numeric-keypad">
      <div className="display">{display}</div>
      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button key={number} onClick={() => handleButtonClick(number)}>
            {number}
          </button>
        ))}
        <button onClick={handleClear}>C</button>
        <button onClick={handleSubmit}>{'>>'}</button>
      </div>
    </div>
  );
};

export default NumericKeypad;

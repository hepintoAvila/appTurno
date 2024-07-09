// src/components/NumericKeypad.js
import React, { useState } from 'react';
import './NumericKeypad.css';

const NumericKeypad = ({ onSubmit }) => {
  const [display, setDisplay] = useState('');

  const handleButtonClick = (value) => {
    setDisplay(display + value);
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleSubmit = () => {
    onSubmit(display);
    setDisplay('');
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

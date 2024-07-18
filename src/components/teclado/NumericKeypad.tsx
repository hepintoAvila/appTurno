import React, { useEffect, useState } from 'react';
import './NumericKeypad.css';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { useTurnoContext } from '@/common';

interface NumericKeypadProps {
  onSubmit: (value: string) => void;
}

interface Opcion {
  opcion: string;
  key: string;
  _id: string;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onSubmit }) => {

  const [display, setDisplay] = useState<string>('');
  const [opciones, setOpciones] = useState<Opcion[]>([]);
  const { selectedOpcion, setSelectedOpcion } = useTurnoContext();
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [isNumericKeyPadActive, setIsNumericKeyPadActive] = useState<boolean>(true);

  const handleButtonClick = (value: number) => {
    if (!isOptionSelected && value >= 1 && value <= 4) {
      // Do nothing if an option is already selected and number is 1-4
      return;
    }
    setDisplay(prevDisplay => prevDisplay + value.toString());
  };

  const handleClear = () => {
    setDisplay('');
    setSelectedOpcion('');
    setIsOptionSelected(false);
    setIsNumericKeyPadActive(true); // Re-enable numeric keypad on clear
  };

  const handleSubmit = async () => {
    try {
      //console.log('Attempting to submit with:', { display, selectedOpcion });
      if (display && selectedOpcion) {
        const response = await fetch('http://localhost:5000/api/turnos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identificacion: display, opcion: selectedOpcion }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit turno');
        }

        setDisplay(''); // Limpia el display después de enviar el turno
        setSelectedOpcion('');
        setIsOptionSelected(false);
        setIsNumericKeyPadActive(true); // Re-enable numeric keypad after submission
        //window.location.reload();
      } else {
        alert('Please select an option and enter a number');
      }
    } catch (error) {
      console.error('Error submitting turno:', error);
    }
  };

  useEffect(() => {
    // Obtener las opciones de la API
    axios.get('http://localhost:5000/api/opciones')
      .then((response) => {
        setOpciones(response.data);
      })
      .catch((error) => {
        console.error('Error fetching opciones:', error);
      });
  }, []);

  const handleOptionSelect = (key: string) => {
    const opcion = opciones.find(op => op.key === key);
    if (opcion) {
      setSelectedOpcion(opcion.opcion);
      setIsOptionSelected(true);
      setIsNumericKeyPadActive(false); // Disable numeric keypad after option select
      //console.log('Option selected:', opcion.opcion);
    } else {
      alert('Invalid option selected');
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (key >= '1' && key <= '4' && isNumericKeyPadActive) {
      handleOptionSelect(key);
    } else if (isOptionSelected && key >= '0' && key <= '9') {
      handleButtonClick(parseInt(key));
    } else if (key === 'Enter') {
      if (!isOptionSelected) {
        alert('Please select an option first');
      } else if (display) {
        handleSubmit();
      } else {
        alert('Please enter a number');
      }
    } else if (key === 'Backspace') {
      handleClear();
    } else if (key >= '0' && key <= '9') {
      // Check Num Lock status
      if (event.getModifierState('NumLock')) {
        alert('Please disable Num Lock to continue');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opciones, selectedOpcion, isOptionSelected, display, isNumericKeyPadActive]);

  return (
    <>
      <Row>
        <Col xl={6} lg={{ span: 6, order: 1 }}>
          <div className="numeric-keypad">
            <div className="options">
              <ul>
                {opciones?.map((opcion) => (
                  <li key={opcion._id} className={'options-lista'}>
                    <button
                      onClick={() => handleOptionSelect(opcion.key)}
                      className={'options-lista'}
                      disabled={!isNumericKeyPadActive} // Disable option buttons when numeric keypad is inactive
                    >
                      {opcion.opcion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
        <Col xl={6} lg={{ span: 6, order: 2 }}>
          <div className="numeric-keypad">
            <div className="display">{display}</div>
            <div className="keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
                <button key={number} onClick={() => handleButtonClick(number)}>
                  {number}
                </button>
              ))}
              <button onClick={handleClear}>C</button>
              <button onClick={handleSubmit}><li className={'teclado-enter ri-corner-down-right-line'}></li></button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default NumericKeypad;

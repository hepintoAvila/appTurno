import React, { useEffect, useState } from 'react';
import './NumericKeypad.css';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
interface NumericKeypadProps {
  onSubmit: (value: string) => void;
}
interface Opcion {
  opcion: string;
  _id: string;
}
const NumericKeypad: React.FC<NumericKeypadProps> = ({ onSubmit }) => {

  const [display, setDisplay] = useState<string>('');
  const [opciones, setOpciones] = useState<Opcion[]>([]);
  const [selectedOpcion, setSelectedOpcion] = useState('');

  const handleButtonClick = (value: number) => {
    setDisplay(prevDisplay => prevDisplay + value.toString());
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleSubmit = async () => {
    try {
      if (display && selectedOpcion) {
      const response = await fetch('http://localhost:5000/api/turnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numero: display,opcion: selectedOpcion}),
      });

      if (!response.ok) {
        throw new Error('Failed to submit turno');
      }

      setDisplay(''); // Limpia el display después de enviar el turno
      setSelectedOpcion('');
      window.location.reload();
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

  return (
    <>
    <Row>

    <Col xl={6} lg={{ span: 6, order: 1 }}>
    <div className="numeric-keypad">
    <div className="options">
        <h3>Motivo de la Atención</h3>
        <ul>
        {opciones?.map((opcion) => (
           <li key={opcion._id} className={'options-lista'}>
          <button
            key={opcion._id}
            onClick={() => setSelectedOpcion(opcion.opcion)}
            className={'options-lista'}
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
        <button onClick={handleSubmit}><li className={'teclado-enter ri-corner-down-right-line'}></li> </button>
      </div>
      </div>
    </Col>

  </Row>
   </>



  );
};

export default NumericKeypad;

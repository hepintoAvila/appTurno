// models/Turno.js
const mongoose = require('mongoose');
const turnoSchema = new mongoose.Schema({
  codigo: { type: String, required: true }, // Campo para almacenar el código consecutivo
  identificacion: { type: String, required: true },
  atendido: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now },
  opcion: { type: String, required: true }
});

const Turno = mongoose.model('Turno', turnoSchema);

// Función para generar el próximo código consecutivo
async function generarCodigoConsecutivo(opcion) {

  const prefixMap = {
    'Atención Estudiantes': 'AE',
    'Certificados y Constancias de Egresados': 'AEG',
    'Constancias y Certificados de Estudios': 'CCE'
    // Agrega más opciones aquí si es necesario
  };

  const prefix = prefixMap[opcion] || 'OTR'; // 'OTR' para 'Otras' o un valor predeterminado
  //const userCode =localStorage.getItem('_HYPER_AUTH') ? JSON.parse(localStorage.getItem('_HYPER_AUTH') || '{}')
  //: {}; // Aquí puedes implementar la lógica para asignar el usuario de ventanilla
  //const userCode = 1;
  const turnos = await Turno.find({ opcion }).sort({ fecha: -1 }).limit(1);
  const lastTurno = turnos[0];
  const lastNumber = lastTurno ? parseInt(lastTurno.codigo.slice(-4)) : 0;
  const newNumber = lastNumber + 1;
  const newNumberStr = newNumber.toString().padStart(4, '0');

  return `${prefix}-${newNumberStr}`;
}

module.exports = { Turno, generarCodigoConsecutivo };

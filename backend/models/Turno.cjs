// models/Turno.js
const mongoose = require('mongoose');
const turnoSchema = new mongoose.Schema({
  codigo: { type: String, required: true }, // Campo para almacenar el código consecutivo
  numero: { type: String, required: true },
  atendido: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now },
  opcion: { type: String, required: true }
});

const Turno = mongoose.model('Turno', turnoSchema);

// Función para generar el próximo código consecutivo
async function generarCodigoConsecutivo() {
  const count = await Turno.countDocuments();
  return `A${(count + 1).toString().padStart(4, '0')}`; // Genera el código como 'A0001', 'A0002', etc.
}

module.exports = { Turno, generarCodigoConsecutivo };

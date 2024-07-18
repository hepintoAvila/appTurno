// models/Opcion.js

const mongoose = require('mongoose');

const opcionSchema = new mongoose.Schema({
  opcion: { type: String, required: true, unique: true },
  key: { type: String, required: true, unique: true },
});

const Opcion = mongoose.model('Opcion', opcionSchema);

module.exports = Opcion;

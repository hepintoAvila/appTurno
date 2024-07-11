// backend/routes/turnos.js
const express = require('express');
const Turno = require('../models/Turno.cjs');
const router = express.Router();

// Obtener todos los turnos
router.get('/', async (req, res) => {
  const turnos = await Turno.find();
  res.json(turnos);
});

// Crear un nuevo turno
router.post('/', async (req, res) => {
  const nuevoTurno = new Turno(req.body);
  await nuevoTurno.save();
  res.json(nuevoTurno);
});

// Marcar un turno como atendido
router.put('/:id', async (req, res) => {
  const turnoActualizado = await Turno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(turnoActualizado);
});

module.exports = router;

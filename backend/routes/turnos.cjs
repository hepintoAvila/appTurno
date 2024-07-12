// routes/turnos.js

const express = require('express');
const router = express.Router();
const Turno = require('../models/Opcion.cjs');

// Obtener todos los turnos
router.get('/', async (req, res) => {
  try {
    const turnos = await Turno.find().sort({ fecha: -1 });
    res.json(turnos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo turno
router.post('/', async (req, res) => {
  const turno = new Turno({
    numero: req.body.numero,
    fecha: req.body.fecha || Date.now()
  });

  try {
    const newTurno = await turno.save();
    res.status(201).json(newTurno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un turno
router.patch('/:id', async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id);
    if (turno == null) {
      return res.status(404).json({ message: 'Cannot find turno' });
    }

    if (req.body.atendido != null) {
      turno.atendido = req.body.atendido;
    }

    const updatedTurno = await turno.save();
    res.json(updatedTurno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

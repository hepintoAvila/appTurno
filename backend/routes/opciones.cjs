// routes/opciones.js

const express = require('express');
const router = express.Router();
const Opcion = require('../models/Opcion.cjs');

// Obtener todas las opciones
router.get('/', async (req, res) => {
  try {
    const opciones = await Opcion.find();
    res.json(opciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva opción
router.post('/', async (req, res) => {
  const opcion = new Opcion({
    opcion: req.body.opcion
  });

  try {
    const newOpcion = await opcion.save();
    res.status(201).json(newOpcion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

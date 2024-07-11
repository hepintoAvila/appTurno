// controllers/turnoController.js
const Turno = require('../models/Turno.cjs');

exports.getTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).send('Error fetching turnos');
  }
};

exports.atenderTurno = async (req, res) => {
  const { id } = req.params;
  try {
    const turno = await Turno.findByIdAndUpdate(id, { atendido: true }, { new: true });
    res.json(turno);
  } catch (error) {
    res.status(500).send('Error updating turno');
  }
};

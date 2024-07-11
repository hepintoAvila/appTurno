// routes/turnoRoutes.js
const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController.cjs');

router.get('/turnos', turnoController.getTurnos);
router.put('/turnos/:id', turnoController.atenderTurno);

module.exports = router;


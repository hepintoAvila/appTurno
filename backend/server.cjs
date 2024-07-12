// server.cjs
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io'); // Cambiado aquí
const http = require('http');
const { Turno, generarCodigoConsecutivo } = require('./models/Turno.cjs'); // Ajusta la ruta según sea necesario
const turnoRoutes = require('./routes/turnoRoutes.cjs');
const opcionesRouter = require('./routes/opciones.cjs'); // Asegúrate de tener esta línea

// Configurar dotenv para cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Verificar que la variable de entorno MONGO_URI esté definida
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

// Configurar middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Ajusta esto según sea necesario
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('turnoAtendido', (data) => {
    io.emit('turnoAtendido', data); // Emitir evento a todos los clientes conectados
  });
});

// Definir rutas
app.get('/api/turnos', async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).send('Error fetching turnos');
  }
});
// Ruta para guardar un nuevo turno
app.post('/api/turnos', async (req, res) => {
  const { numero,opcion } = req.body;

  if (!numero) {
    return res.status(400).json({ error: 'Número de turno requerido' });
  }
  if (!opcion) {
    return res.status(400).json({ error: 'Opcion requerido' });
  }
  try {
    const codigo = await generarCodigoConsecutivo();
    const nuevoTurno = new Turno({ codigo, numero,opcion });
    await nuevoTurno.save();

    res.status(201).json(nuevoTurno);
  } catch (error) {
    console.error('Error al guardar turno:', error);
    res.status(500).json({ error: 'Error al guardar turno' });
  }
});
// Ruta para actualizar el campo 'atendido'
app.put('/api/turnos/:id', async (req, res) => {
  try {
    const turno = await Turno.findByIdAndUpdate(
      req.params.id,
      { atendido: true },
      { new: true }
    );
    if (!turno) {
      return res.status(404).send('Turno not found');
    }
    res.send(turno);
  } catch (error) {
    res.status(500).send('Error updating turno: ' + error.message);
  }
});
app.use('/api', turnoRoutes);
app.use('/api/opciones', opcionesRouter);
// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

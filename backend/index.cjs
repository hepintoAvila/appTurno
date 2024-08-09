// server.cjs
const { exec } = require('child_process');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');
const { Turno, generarCodigoConsecutivo } = require('./models/Turno.cjs'); // Ajusta la ruta según sea necesario
const turnoRoutes = require('./routes/turnoRoutes.cjs');
const opcionesRouter = require('./routes/opciones.cjs');
const printQueue = [];
let isPrinting = false;

const enqueuePrintJob = (job) => {
  printQueue.push(job);
  processPrintQueue();
};

const processPrintQueue = async () => {
  if (isPrinting || printQueue.length === 0) return;

  isPrinting = true;
  const job = printQueue.shift(); // Retira el primer trabajo de la cola
  if (job) {
    try {
      await job();
    } catch (error) {
      console.error("Error al procesar la cola de impresión:", error);
    }
  }
  isPrinting = false;
  processPrintQueue(); // Procesa la siguiente tarea en la cola
};
const player = require('play-sound')(opts = {}); // Paquete para reproducir sonido
// Ruta del script Python
const pythonScriptPath = path.join(__dirname, 'print.py');

// Función para imprimir texto
function printText(textToPrint) {
  return new Promise((resolve, reject) => {
    const escapedText = textToPrint.replace(/"/g, '\\"').replace(/\n/g, '\\n'); // Escapa las comillas dobles y los saltos de línea
    exec(`python "${pythonScriptPath}" "${escapedText}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar el script de Python: ${error}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Error de stderr: ${stderr}`);
        return reject(stderr);
      }
      console.log(`Salida del script de Python: ${stdout}`);
      resolve(stdout);
    });
  });
}
const convertTextToSpeech = (text, callback) => {
  // Ruta al script Python
  const pythonScriptPathSpeech = path.join(__dirname, 'text_to_speech.py');
  const command = `python ${pythonScriptPathSpeech} "${text}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando el script Python: ${error.message}`);
      return callback(error);
    }
    if (stderr) {
      console.error(`Error en el script Python: ${stderr}`);
      return callback(new Error(stderr));
    }

    // Procesar el archivo de audio generado
    const audioFile = path.join(__dirname, 'output.mp3');
    if (fs.existsSync(audioFile)) {
      callback(null, audioFile);
    } else {
      callback(new Error('Archivo de audio no encontrado.'));
    }
  });
};


const redis = require('@redis/client');
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Conectar al cliente
client.connect().catch(console.error);

async function enqueueAudioFile(audioFile) {
  try {
    // Agregar el archivo de audio a la cola
    const reply = await client.rPush('audioQueue', audioFile);
    console.log('Audio agregado a la cola:', reply);

    // Procesar la cola (puedes mover esto a otra función si prefieres)
    await processQueue();
  } catch (err) {
    console.error('Error al agregar el audio a la cola:', err);
  }
}

async function processQueue() {
  try {
    // Obtener el archivo de audio de la cola
    const audioFile = await client.lPop('audioQueue');
    if (audioFile) {
      // Aquí puedes reproducir el audio o hacer lo que necesites con él
      player.play(audioFile, (err) => {
        if (err) {
          console.error('Error al reproducir el audio:', err);
        } else {
          console.log('Reproducción de audio completa');
        }
      });

      console.log('Procesando archivo de audio:', audioFile);
    } else {
      console.log('No hay más archivos en la cola');
    }
  } catch (err) {
    console.error('Error al obtener el audio de la cola:', err);
  }
}

// Ejemplo de uso




// Configurar dotenv para cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
//const NETWORK = process.env.NETWORK;

// Verificar que la variable de entorno MONGO_URI esté definida
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

// Configurar middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Mover esto aquí para evitar errores de middleware

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

app.get('/api/turnos', async (req, res) => {
  try {
    const { date } = req.query;

    let startDate = new Date();
    let endDate = new Date();

    if (date) {
      startDate = new Date(date);
      endDate = new Date(date);
    }

    // Set start of the day
    startDate.setHours(0, 0, 0, 0);

    // Set end of the day
    endDate.setHours(23, 59, 59, 999);

    const turnos = await Turno.find({
      fecha: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res?.json(turnos);

  } catch (error) {
    res?.status(500).send('Error fetching turnos');
  }
});

// Ruta para guardar un nuevo turno
app.post('/api/turnos', async (req, res) => {
  const { identificacion, opcion } = req.body;

  if (!identificacion) {
    return res.status(400).json({ error: 'Número de turno requerido' });
  }
  if (!opcion) {
    return res.status(400).json({ error: 'Opcion requerido' });
  }

  try {
    const codigo = await generarCodigoConsecutivo(opcion);
    const nuevoTurno = new Turno({ codigo, identificacion, opcion });
    await nuevoTurno.save();

    // Notificar a todos los clientes sobre el nuevo turno
    io.emit('nuevoTurno', nuevoTurno);

    // Crear la tarea de impresión y agregarla a la cola
    enqueuePrintJob(async () => {
      const turno = {
        codigo: nuevoTurno.codigo,
        identificacion: nuevoTurno.identificacion,
        opcion: nuevoTurno.opcion,
        fecha: new Date()
      };

      const textToPrint = `\nTurno:${turno.codigo} \nIdentificación: ${turno.identificacion} \nOpción: ${turno.opcion} \nFecha: ${turno.fecha}`;

      try {
        await printText(textToPrint);
        console.log("Texto enviado a imprimir");
      } catch (error) {
        console.error("Error al imprimir:", error);
      }
    });

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

    io.emit('turnoAtendido', turno);

    const { codigo } = req.body;
    const textToPrint = `Turno:${codigo}`;
    convertTextToSpeech(textToPrint, (err, audioFile) => {
      if (err) {
        console.error('Error en la conversión de texto a voz:', err);
      } else {
        console.log('Archivo de audio generado:', audioFile);
        // Empujar la tarea a la cola
        enqueueAudioFile(audioFile);
      }
    });

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



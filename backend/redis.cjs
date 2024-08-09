const redis = require('redis');
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

client.on('connect', () => {
  console.log('Conectado a Redis');
});

client.on('error', (err) => {
  console.error('Error en la conexión a Redis:', err);
});

module.exports = client;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configurar Middleware
app.use(cors());
app.use(express.json());

// Configuración de PostgreSQL (Neon DB)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Manejar errores de conexión inactiva en el pool
pool.on('error', (err, client) => {
  console.error('Error inesperado en el cliente de base de datos:', err);
});

pool.connect()
  .then(client => {
    console.log('Conectado exitosamente a Neon DB');
    client.release();
  })
  .catch(err => console.error('Error conectando a la base de datos:', err));

// Rutas Básicas (Ejemplo)
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de FluencyLoop' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: Validar credenciales en DB
  console.log(`Login para: ${email}`);
  res.json({ message: 'Login exitoso (Simulado)', token: '12345' });
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  // TODO: Insertar usuario en DB
  console.log(`Registro para: ${name}, ${email}`);
  res.status(201).json({ message: 'Usuario registrado exitosamente (Simulado)' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});

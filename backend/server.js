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
  .then(async (client) => {
    console.log('Conectado exitosamente a Neon DB');
    
    // Inicializar tabla de idiomas y datos por defecto
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS languages (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            code VARCHAR(10) NOT NULL,
            icon_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      // Insertar idioma por defecto si no existe
      await client.query(`
        INSERT INTO languages (name, code, icon_url)
        SELECT 'English', 'EN', 'https://flagcdn.com/w320/gb.png'
        WHERE NOT EXISTS (SELECT 1 FROM languages WHERE code = 'EN');
      `);
      console.log('Tabla de idiomas verificada/creada exitosamente');
    } catch (err) {
      console.error('Error inicializando tablas:', err);
    } finally {
      client.release();
    }
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
  res.json({ 
    message: 'Login exitoso (Simulado)', 
    token: '12345',
    user: { id: 1, name: email ? email.split('@')[0] : 'Estudiante', email: email }
  });
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  // TODO: Insertar usuario en DB
  console.log(`Registro para: ${name}, ${email}`);
  res.status(201).json({ 
    message: 'Usuario registrado exitosamente (Simulado)',
    user: { id: 1, name, email }
  });
});

// --- OPERACIONES CRUD PARA IDIOMAS ---

// CREATE
app.post('/api/languages', async (req, res) => {
  const { name, code, icon_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO languages (name, code, icon_url) VALUES ($1, $2, $3) RETURNING *',
      [name, code, icon_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando idioma' });
  }
});

// READ (All)
app.get('/api/languages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM languages ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo idiomas' });
  }
});

// READ (One)
app.get('/api/languages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM languages WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Idioma no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo idioma' });
  }
});

// UPDATE
app.put('/api/languages/:id', async (req, res) => {
  const { id } = req.params;
  const { name, code, icon_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE languages SET name = $1, code = $2, icon_url = $3 WHERE id = $4 RETURNING *',
      [name, code, icon_url, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Idioma no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error actualizando idioma' });
  }
});

// DELETE
app.delete('/api/languages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM languages WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Idioma no encontrado' });
    res.json({ message: 'Idioma eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando idioma' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});

-- Archivo de inicialización de tablas para Neon DB (PostgreSQL)

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ejemplos de otras tablas que podrías necesitar en el futuro para FluencyLoop:

-- CREATE TABLE IF NOT EXISTS progress (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     lesson_id INTEGER NOT NULL,
--     score INTEGER DEFAULT 0,
--     completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

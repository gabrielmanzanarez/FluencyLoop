-- Archivo de inicialización de tablas para Neon DB (PostgreSQL)

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Idiomas Disponibles
CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    code VARCHAR(10) NOT NULL,
    icon_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ejemplo de tabla para progreso (Relación usuario -> idioma)
-- CREATE TABLE IF NOT EXISTS user_languages (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     language_id INTEGER REFERENCES languages(id) ON DELETE CASCADE,
--     progress_percentage INTEGER DEFAULT 0,
--     started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

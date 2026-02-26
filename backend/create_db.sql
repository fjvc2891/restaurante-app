-- =============================================
-- Script para crear la base de datos del Restaurante
-- Ejecutar con: psql -U postgres -f create_db.sql
-- =============================================

-- Crear usuario de la BD (opcional, si prefieres uno dedicado)
-- CREATE USER restaurante_user WITH PASSWORD 'tu_password';

-- Crear la base de datos
CREATE DATABASE restaurante
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    TEMPLATE = template0;

-- Conectar y dar permisos (si usas usuario dedicado)
-- GRANT ALL PRIVILEGES ON DATABASE restaurante TO restaurante_user;

-- Para verificar: \l  (lista las bases de datos)
-- Para conectar: \c restaurante

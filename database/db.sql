CREATE DATABASE skylink;

CREATE TABLE usuario(
    id VARCHAR(20) PRIMARY KEY,
    rol INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fecha DATE NOT NULL,
    pais VARCHAR(100) NOT NULL,
    millas INT NOT NULL DEFAULT 0
);
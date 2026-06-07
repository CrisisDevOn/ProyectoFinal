import db from './database.js';

/**
 * schema.js — Crea todas las tablas de la base de datos si no existen.
 * Ejecutado automáticamente al iniciar el servidor desde server.js.
 */

db.exec(`
    -- ============================================================
    -- SCHEMA: pan_brunch
    -- Motor: SQLite via better-sqlite3
    -- ============================================================

    CREATE TABLE IF NOT EXISTS rol (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre      VARCHAR(50)  NOT NULL UNIQUE,
        descripcion VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS usuario (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        id_rol        INTEGER      NOT NULL,
        nombre        VARCHAR(100) NOT NULL,
        username      VARCHAR(50)  NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        activo        INTEGER      NOT NULL DEFAULT 1,
        created_at    DATETIME     NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (id_rol) REFERENCES rol(id)
    );

    CREATE TABLE IF NOT EXISTS categoria (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre      VARCHAR(100) NOT NULL UNIQUE,
        descripcion VARCHAR(255),
        imagen_url  VARCHAR(500),
        activa      INTEGER      NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS producto (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        id_categoria INTEGER      NOT NULL,
        nombre       VARCHAR(150) NOT NULL,
        descripcion  TEXT,
        precio       REAL         NOT NULL,
        imagen_url   VARCHAR(500),
        disponible   INTEGER      NOT NULL DEFAULT 1,
        FOREIGN KEY (id_categoria) REFERENCES categoria(id)
    );

    CREATE TABLE IF NOT EXISTS ocasion (
        id     INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS cliente (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre   VARCHAR(150) NOT NULL,
        telefono VARCHAR(15)  NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reservacion (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        id_cliente   INTEGER     NOT NULL,
        id_ocasion   INTEGER     NOT NULL,
        num_personas INTEGER     NOT NULL CHECK (num_personas >= 1),
        fecha        DATE        NOT NULL,
        hora         TIME        NOT NULL,
        alergias     TEXT,
        status       VARCHAR(20) NOT NULL DEFAULT 'pendiente'
                                 CHECK (status IN ('pendiente','confirmada','cancelada')),
        created_at   DATETIME    NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (id_cliente) REFERENCES cliente(id),
        FOREIGN KEY (id_ocasion) REFERENCES ocasion(id)
    );

    CREATE TABLE IF NOT EXISTS notificacion (
        id               INTEGER PRIMARY KEY AUTOINCREMENT,
        id_reservacion   INTEGER  NOT NULL,
        mensaje_whatsapp TEXT     NOT NULL,
        enviado_at       DATETIME NOT NULL DEFAULT (datetime('now')),
        enviado          INTEGER  NOT NULL DEFAULT 1,
        FOREIGN KEY (id_reservacion) REFERENCES reservacion(id)
    );

    CREATE TABLE IF NOT EXISTS historial_estado (
        id               INTEGER PRIMARY KEY AUTOINCREMENT,
        id_reservacion   INTEGER     NOT NULL,
        id_usuario       INTEGER     NOT NULL,
        status_anterior  VARCHAR(20) NOT NULL,
        status_nuevo     VARCHAR(20) NOT NULL,
        cambiado_at      DATETIME    NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (id_reservacion) REFERENCES reservacion(id),
        FOREIGN KEY (id_usuario)     REFERENCES usuario(id)
    );
`);

console.log('[DB] Schema verificado/creado correctamente.');

export default db;

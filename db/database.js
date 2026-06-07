import { createRequire } from 'module';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const initSqlJs = require('sql.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, 'panbrunch.db');

// Cargar o crear la base de datos
const SQL = await initSqlJs();
let db;

if (existsSync(DB_PATH)) {
    const fileBuffer = readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
} else {
    db = new SQL.Database();
}

// Guardar en disco después de cada escritura
export const saveDb = () => {
    const data = db.export();
    writeFileSync(DB_PATH, Buffer.from(data));
};

// Activar llaves foráneas
db.run('PRAGMA foreign_keys = ON;');

console.log('[DB] Conectado a SQLite (sql.js)');

export default db;
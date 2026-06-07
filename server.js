import express from 'express';
import './db/schema.js';          // crea las tablas al iniciar si no existen
import errorHandler from './middlewares/errorHandler.js';

// ── Importar rutas (se implementarán en la siguiente tarea) ──────────────────
import authRoutes          from './routes/auth.routes.js';
import menuRoutes          from './routes/menu.routes.js';
import reservacionRoutes   from './routes/reservacion.routes.js';
import adminRoutes         from './routes/admin.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ──────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS básico para desarrollo con React/Vite en puerto 5173
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// ── Rutas ─────────────────────────────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
app.use('/api',               menuRoutes);
app.use('/api/reservaciones', reservacionRoutes);
app.use('/api/admin',         adminRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', proyecto: 'Pan & Brunch API', version: '1.0.0' });
});

// 404 para rutas no definidas
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: `Ruta ${req.originalUrl} no encontrada` });
});

// ── Middleware global de errores (SIEMPRE al final) ───────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`\nPan & Brunch API corriendo en http://localhost:${PORT}`);
    console.log(`   Modo: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Tip:  npm run seed  - llenar BD con datos de prueba\n`);
});

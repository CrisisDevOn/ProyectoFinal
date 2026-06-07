import { Router } from 'express';

const router = Router();

// ── Gestión de productos (solo admin) ────────────────────────────────────────

// POST   /api/admin/productos          →  Crear producto
router.post('/productos', (req, res) => {
    res.status(501).json({ message: 'Endpoint POST /api/admin/productos — pendiente de implementar' });
});

// PATCH  /api/admin/productos/:id      →  Editar producto
router.patch('/productos/:id', (req, res) => {
    res.status(501).json({ message: 'Endpoint PATCH /api/admin/productos/:id — pendiente de implementar' });
});

// DELETE /api/admin/productos/:id      →  Eliminar producto
router.delete('/productos/:id', (req, res) => {
    res.status(501).json({ message: 'Endpoint DELETE /api/admin/productos/:id — pendiente de implementar' });
});

// ── Gestión de categorías (solo admin) ───────────────────────────────────────

// POST   /api/admin/categorias         →  Crear categoría
router.post('/categorias', (req, res) => {
    res.status(501).json({ message: 'Endpoint POST /api/admin/categorias — pendiente de implementar' });
});

// PATCH  /api/admin/categorias/:id     →  Editar categoría
router.patch('/categorias/:id', (req, res) => {
    res.status(501).json({ message: 'Endpoint PATCH /api/admin/categorias/:id — pendiente de implementar' });
});

// ── Historial y notificaciones (admin/staff) ─────────────────────────────────

// GET    /api/admin/historial          →  Ver historial de cambios de estado
router.get('/historial', (req, res) => {
    res.status(501).json({ message: 'Endpoint GET /api/admin/historial — pendiente de implementar' });
});

// GET    /api/admin/notificaciones     →  Ver notificaciones WhatsApp generadas
router.get('/notificaciones', (req, res) => {
    res.status(501).json({ message: 'Endpoint GET /api/admin/notificaciones — pendiente de implementar' });
});

export default router;

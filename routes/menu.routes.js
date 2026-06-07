import { Router } from 'express';

const router = Router();

// GET /api/menu            →  Categorías activas + productos disponibles (agrupados)
router.get('/menu', (req, res) => {
    res.status(501).json({ message: 'Endpoint GET /api/menu — pendiente de implementar' });
});

// GET /api/categorias      →  Lista de categorías activas
router.get('/categorias', (req, res) => {
    res.status(501).json({ message: 'Endpoint GET /api/categorias — pendiente de implementar' });
});

// GET /api/productos       →  Lista de productos disponibles
router.get('/productos', (req, res) => {
    res.status(501).json({ message: 'Endpoint GET /api/productos — pendiente de implementar' });
});

// GET /api/ocasiones       →  Lista de tipos de ocasión (para el formulario público)
router.get('/ocasiones', (req, res) => {
    res.status(501).json({ message: 'Endpoint GET /api/ocasiones — pendiente de implementar' });
});

export default router;

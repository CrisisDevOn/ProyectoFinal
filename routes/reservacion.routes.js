import { Router } from 'express';

const router = Router();

// POST /api/reservaciones              →  Crear nueva reservación (público)
router.post('/', (req, res) => {
    res.status(501).json({ message: 'Endpoint POST /api/reservaciones — pendiente de implementar' });
});

// GET  /api/reservaciones              →  Listar todas las reservaciones (admin/staff)
router.get('/', (req, res) => {
    res.status(501).json({ message: 'Endpoint GET /api/reservaciones — pendiente de implementar' });
});

// GET  /api/reservaciones/:id          →  Ver detalle de una reservación (admin/staff)
router.get('/:id', (req, res) => {
    res.status(501).json({ message: 'Endpoint GET /api/reservaciones/:id — pendiente de implementar' });
});

// PATCH /api/reservaciones/:id/status  →  Cambiar estado (admin/staff)
router.patch('/:id/status', (req, res) => {
    res.status(501).json({ message: 'Endpoint PATCH /api/reservaciones/:id/status — pendiente de implementar' });
});

export default router;

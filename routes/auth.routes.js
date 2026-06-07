import { Router } from 'express';

const router = Router();

// POST /api/auth/login  →  Iniciar sesión, devuelve JWT
router.post('/login', (req, res) => {
    res.status(501).json({ message: 'Endpoint POST /api/auth/login — pendiente de implementar' });
});

// POST /api/auth/logout  →  Cerrar sesión (invalidar token en cliente)
router.post('/logout', (req, res) => {
    res.status(501).json({ message: 'Endpoint POST /api/auth/logout — pendiente de implementar' });
});

export default router;

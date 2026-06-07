import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'panbrunch_secret_dev';

/**
 * Verifica que la petición incluya un token JWT válido.
 * Extrae el payload y lo adjunta en req.usuario para los controladores.
 */
export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return next(new AppError('Token de autenticación requerido', 401));
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.usuario = payload; // { id, username, id_rol, nombre }
        next();
    } catch (err) {
        return next(new AppError('Token inválido o expirado', 401));
    }
};

/**
 * Verifica que el usuario autenticado tenga rol de administrador (id_rol = 1).
 * Debe usarse después de verificarToken.
 */
export const soloAdmin = (req, res, next) => {
    if (req.usuario?.id_rol !== 1) {
        return next(new AppError('Acceso restringido: se requiere rol de administrador', 403));
    }
    next();
};

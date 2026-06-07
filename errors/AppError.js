/**
 * AppError — Clase de error personalizada para Pan & Brunch
 * Extiende la clase Error nativa de JavaScript.
 *
 * Permite distinguir entre:
 *   - Errores operacionales (esperados): validación, 404, 401, 403
 *   - Errores de programación (inesperados): bugs, fallos de BD → 500
 */
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;

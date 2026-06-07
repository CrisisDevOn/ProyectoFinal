import AppError from '../errors/AppError.js';

/**
 * Middleware global de manejo de errores.
 * DEBE registrarse al final de todos los middlewares en server.js.
 * Express lo reconoce como manejador de errores por tener 4 parámetros: (err, req, res, next)
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${err.stack}`);

    // Error operacional: lanzado intencionalmente con AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    // Error no operacional: bug, fallo de BD, librería externa, etc.
    return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Ha ocurrido un error inesperado en el servidor.',
    });
};

export default errorHandler;

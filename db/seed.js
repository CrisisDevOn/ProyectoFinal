/**
 * seed.js — Pobla la base de datos con datos de prueba.
 * Ejecutar con: npm run seed
 *
 * ADVERTENCIA: Este script limpia e inserta datos de prueba.
 * No ejecutar en producción.
 */

import './schema.js';   // garantiza que las tablas existen
import db from './database.js';
import bcrypt from 'bcryptjs';

console.log('[SEED] Iniciando población de datos de prueba...\n');

// ── Función auxiliar para insertar solo si la tabla está vacía ──────────────
const seedTable = (tableName, insertFn) => {
    const count = db.prepare(`SELECT COUNT(*) as c FROM ${tableName}`).get().c;
    if (count === 0) {
        insertFn();
        console.log(`[SEED] ✓ ${tableName} poblada`);
    } else {
        console.log(`[SEED] ✗ ${tableName} ya tiene datos, se omitió`);
    }
};

// ── 1. roles ─────────────────────────────────────────────────────────────────
seedTable('rol', () => {
    const insert = db.prepare(`INSERT INTO rol (nombre, descripcion) VALUES (?, ?)`);
    insert.run('administrador', 'Acceso completo al sistema');
    insert.run('staff',         'Consulta y cambio de estado de reservaciones');
});

// ── 2. usuarios ──────────────────────────────────────────────────────────────
seedTable('usuario', () => {
    const insert = db.prepare(`
        INSERT INTO usuario (id_rol, nombre, username, password_hash)
        VALUES (?, ?, ?, ?)
    `);
    const hashAdmin = bcrypt.hashSync('admin123', 10);
    const hashStaff = bcrypt.hashSync('staff123', 10);

    insert.run(1, 'Emmanuel Admin', 'admin',   hashAdmin);
    insert.run(2, 'Ana Staff',      'anastaff', hashStaff);
});

// ── 3. categorías ─────────────────────────────────────────────────────────────
seedTable('categoria', () => {
    const insert = db.prepare(`
        INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)
    `);
    insert.run('Pasteles',          'Pasteles personalizados para toda ocasión');
    insert.run('Panes Artesanales', 'Panes horneados cada mañana');
    insert.run('Desayunos',         'Opciones de brunch calientes y fríos');
    insert.run('Bebidas',           'Cafés, jugos y bebidas especiales');
    insert.run('Postres',           'Opciones dulces para cerrar tu visita');
});

// ── 4. productos ──────────────────────────────────────────────────────────────
seedTable('producto', () => {
    const insert = db.prepare(`
        INSERT INTO producto (id_categoria, nombre, descripcion, precio)
        VALUES (?, ?, ?, ?)
    `);
    // Pasteles (id=1)
    insert.run(1, 'Pastel de Tres Leches',    'Clásico esponjoso bañado en tres tipos de leche', 350.00);
    insert.run(1, 'Pastel Red Velvet',        'Con betún de queso crema y cobertura de terciopelo', 420.00);
    insert.run(1, 'Pastel de Chocolate',      'Relleno de ganache y cubierto con crema de chocolate', 380.00);
    // Panes (id=2)
    insert.run(2, 'Croissant de Mantequilla', 'Masa hojaldrada artesanal, horneada cada mañana', 45.00);
    insert.run(2, 'Pan de Queso',             'Con queso manchego fundido en el centro', 38.00);
    // Desayunos (id=3)
    insert.run(3, 'Eggs Benedict',            'Con jamón serrano, huevos pochados y salsa holandesa', 180.00);
    insert.run(3, 'French Toast',             'Pan brioche con maple, frutos del bosque y crema', 145.00);
    insert.run(3, 'Granola Bowl',             'Con yogurt griego, miel y frutas de temporada', 120.00);
    // Bebidas (id=4)
    insert.run(4, 'Café de Olla',             'Preparado con canela y piloncillo', 55.00);
    insert.run(4, 'Matcha Latte',             'Té matcha japonés con leche espumada', 75.00);
    insert.run(4, 'Jugo Verde',               'Apio, pepino, piña, limón y jengibre', 65.00);
    // Postres (id=5)
    insert.run(5, 'Cheesecake de Fresa',      'Base de galleta, relleno cremoso y coulis de fresa', 95.00);
    insert.run(5, 'Creme Brûlée',             'Crema de vainilla con costra de caramelo quemado', 110.00);
});

// ── 5. ocasiones ──────────────────────────────────────────────────────────────
seedTable('ocasion', () => {
    const insert = db.prepare(`INSERT INTO ocasion (nombre) VALUES (?)`);
    ['Cumpleaños', 'Aniversario', 'Graduación',
     'Reunión de trabajo', 'Festejo general', 'Otro'
    ].forEach(n => insert.run(n));
});

// ── 6. clientes de prueba ─────────────────────────────────────────────────────
seedTable('cliente', () => {
    const insert = db.prepare(`INSERT INTO cliente (nombre, telefono) VALUES (?, ?)`);
    insert.run('María López Ruiz',    '9931001122');
    insert.run('Carlos Méndez Peña',  '9932003344');
    insert.run('Sofía Torres Chan',   '9933005566');
    insert.run('Roberto Uc Cobos',    '9934007788');
});

// ── 7. reservaciones de prueba ────────────────────────────────────────────────
seedTable('reservacion', () => {
    const insert = db.prepare(`
        INSERT INTO reservacion
            (id_cliente, id_ocasion, num_personas, fecha, hora, alergias, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insert.run(1, 1, 8,  '2025-08-15', '13:00', 'Ninguna',         'pendiente');
    insert.run(2, 5, 4,  '2025-08-16', '11:00', 'Nueces',          'confirmada');
    insert.run(3, 2, 2,  '2025-08-17', '14:30', null,              'pendiente');
    insert.run(4, 3, 10, '2025-08-18', '12:00', 'Gluten, lactosa', 'cancelada');
});

// ── 8. notificaciones de prueba ───────────────────────────────────────────────
seedTable('notificacion', () => {
    const insert = db.prepare(`
        INSERT INTO notificacion (id_reservacion, mensaje_whatsapp, enviado)
        VALUES (?, ?, ?)
    `);
    const msg1 = `🎂 *Nueva Reservación - Pan & Brunch*\n\n👤 Cliente: María López Ruiz\n📱 Teléfono: 9931001122\n👥 Personas: 8\n📅 Fecha: 2025-08-15\n🕐 Hora: 13:00\n🎉 Ocasión: Cumpleaños\n🚫 Alergias: Ninguna`;
    const msg2 = `🎂 *Nueva Reservación - Pan & Brunch*\n\n👤 Cliente: Carlos Méndez Peña\n📱 Teléfono: 9932003344\n👥 Personas: 4\n📅 Fecha: 2025-08-16\n🕐 Hora: 11:00\n🎉 Ocasión: Festejo general\n🚫 Alergias: Nueces`;
    insert.run(1, msg1, 1);
    insert.run(2, msg2, 1);
});

// ── 9. historial de estados ───────────────────────────────────────────────────
seedTable('historial_estado', () => {
    const insert = db.prepare(`
        INSERT INTO historial_estado
            (id_reservacion, id_usuario, status_anterior, status_nuevo)
        VALUES (?, ?, ?, ?)
    `);
    insert.run(2, 1, 'pendiente', 'confirmada');
    insert.run(4, 1, 'pendiente', 'cancelada');
});

console.log('\n[SEED] ✅ Base de datos poblada exitosamente.');

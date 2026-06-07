# 🥐 Pan & Brunch — Backend API REST

Sistema de gestión de reservaciones y menú digital para la pastelería **Pan & Brunch**, Villahermosa, Tabasco.

---

## Equipo de desarrollo

| Nombre | Matrícula | Rol |
|--------|-----------|-----|
| Ing. Emmanuel | 210785 | Desarrollador Full Stack |

**Materia:** Sistemas Cliente-Servidor 1 / Desarrollo de Aplicaciones con Bases de Datos / Desarrollo de Aplicaciones con Bibliotecas JS  
**Profesor:** _(nombre del profesor)_  
**Institución:** _(nombre de la institución)_  
**Semestre:** 2025-B

---

## Descripción del proyecto

Aplicación web full stack que funciona simultáneamente como **landing page pública** (menú y formulario de reservaciones) y **panel de administración** con autenticación JWT. Las reservaciones generan automáticamente un mensaje formateado para WhatsApp.

**Stack:** React + Vite (frontend) · Node.js + Express (backend) · SQLite via `better-sqlite3`  
**Deploy:** Render (backend) + Render Static Sites (frontend)

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/CrisisDevOn/ProyectoFinal.git
cd ProyectoFinal

# Instalar dependencias
npm install

# Poblar la base de datos con datos de prueba
npm run seed

# Iniciar el servidor en modo desarrollo
npm run dev
```

El servidor corre en: `http://localhost:3000`

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor con `node --watch` (recarga automática) |
| `npm start` | Inicia el servidor en modo producción |
| `npm run seed` | Crea y puebla la BD con datos de prueba |

---

## Estructura del proyecto

```
pan-brunch-server/
├── db/
│   ├── database.js       # Conexión singleton a SQLite
│   ├── schema.js         # Creación de tablas (DDL)
│   └── seed.js           # Datos de prueba
├── errors/
│   └── AppError.js       # Clase de error personalizada
├── middlewares/
│   ├── authJWT.js        # Verificación de token JWT
│   └── errorHandler.js   # Middleware global de errores
├── routes/
│   ├── auth.routes.js        # Autenticación
│   ├── menu.routes.js        # Menú público
│   ├── reservacion.routes.js # Reservaciones
│   └── admin.routes.js       # Panel administrativo
├── controllers/          # Lógica de negocio (próxima tarea)
├── .gitignore
├── package.json
├── README.md
└── server.js             # Punto de entrada
```

---

## Endpoints del sistema

> **Base URL:** `http://localhost:3000/api`  
> Los endpoints marcados con 🔒 requieren token JWT en el header:  
> `Authorization: Bearer <token>`  
> Los marcados con 👑 además requieren rol de **administrador**.

---

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/login` | Iniciar sesión. Recibe `{ username, password }`, devuelve `{ token, nombre, rol }` | Público |
| `POST` | `/auth/logout` | Cerrar sesión (invalida token en cliente) | 🔒 |

---

### Menú público

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/menu` | Categorías activas con sus productos disponibles agrupados | Público |
| `GET` | `/categorias` | Lista de todas las categorías activas | Público |
| `GET` | `/productos` | Lista de todos los productos disponibles | Público |
| `GET` | `/ocasiones` | Lista de tipos de ocasión para el formulario de reserva | Público |

---

### Reservaciones

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/reservaciones` | Crear nueva reservación. Guarda cliente, reservación y genera notificación WhatsApp | Público |
| `GET` | `/reservaciones` | Listar todas las reservaciones (con filtros opcionales: `?status=pendiente&fecha=2025-08-15`) | 🔒 |
| `GET` | `/reservaciones/:id` | Ver detalle completo de una reservación | 🔒 |
| `PATCH` | `/reservaciones/:id/status` | Cambiar estado de la reservación (`pendiente` / `confirmada` / `cancelada`). Registra en historial. | 🔒 |

---

### Panel de administración

#### Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/admin/productos` | Crear nuevo producto en el menú | 👑 |
| `PATCH` | `/admin/productos/:id` | Editar datos de un producto (nombre, precio, disponibilidad) | 👑 |
| `DELETE` | `/admin/productos/:id` | Eliminar producto del menú | 👑 |

#### Categorías

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/admin/categorias` | Crear nueva categoría | 👑 |
| `PATCH` | `/admin/categorias/:id` | Editar categoría (nombre, activar/desactivar) | 👑 |

#### Historial y auditoría

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/admin/historial` | Ver historial completo de cambios de estado en reservaciones | 🔒 |
| `GET` | `/admin/notificaciones` | Ver mensajes WhatsApp generados por reservación | 🔒 |

---

## Modelo de datos

El sistema cuenta con **9 tablas** normalizadas hasta 3NF:

`rol` · `usuario` · `categoria` · `producto` · `ocasion` · `cliente` · `reservacion` · `notificacion` · `historial_estado`

Consulta el diagrama ER completo en el archivo `210785-tareabd1.md`.

---

## Credenciales de prueba (seed)

| Username | Password | Rol |
|----------|----------|-----|
| `admin` | `admin123` | Administrador |
| `anastaff` | `staff123` | Staff |

> ⚠️ Solo para entorno de desarrollo. No usar en producción.

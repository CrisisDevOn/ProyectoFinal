# Pan & Brunch — Backend API REST

Sistema de gestión de reservaciones y menú digital para la pastelería **Pan & Brunch**, Villahermosa, Tabasco.

---

## Equipo de desarrollo

| Nombre | Matrícula | Rol |
|----------|----------|----------|
| Cristofer Emmanuel de la Cruz Aparicio | 210785 | Estudiante de ISC 8vo ciclo |

**Materia:** Sistemas Cliente-Servidor 1 / Desarrollo de Aplicaciones con Bases de Datos / Desarrollo de Aplicaciones con Bibliotecas JS  
**Profesor:** Jesus Alejandro Flores Hernandez  
**Institución:** Universidad Autónoma del Carmen  
**Semestre:** 8vo

---

## Descripción del proyecto

Aplicación web full stack que funciona simultáneamente como **landing page pública** (menú y formulario de reservaciones) y **panel de administración** con autenticación JWT. Las reservaciones generan automáticamente un mensaje con formato para WhatsApp.

**Stack:** React + Vite (frontend) · Node.js + Express (backend) · SQLite mediante `better-sqlite3`  
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

El servidor corre en:

```text
http://localhost:3000
```

---

## Scripts disponibles

| Script | Descripción |
|----------|----------|
| `npm run dev` | Inicia el servidor con `node --watch` (recarga automática) |
| `npm start` | Inicia el servidor en modo producción |
| `npm run seed` | Crea y puebla la base de datos con datos de prueba |

---

## Estructura del proyecto

```text
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
├── controllers/          # Lógica de negocio
├── .gitignore
├── package.json
├── README.md
└── server.js             # Punto de entrada
```

---

## Endpoints del sistema

**Base URL**

```text
http://localhost:3000/api
```

Los endpoints marcados con **[JWT]** requieren token JWT en el encabezado:

```text
Authorization: Bearer <token>
```

Los marcados con **[ADMIN]** requieren además rol de administrador.

---

### Autenticación

| Método | Endpoint | Descripción | Acceso |
|----------|----------|----------|----------|
| `POST` | `/auth/login` | Iniciar sesión. Recibe `{ username, password }` y devuelve `{ token, nombre, rol }` | Público |
| `POST` | `/auth/logout` | Cerrar sesión (invalida el token en cliente) | [JWT] |

---

### Menú público

| Método | Endpoint | Descripción | Acceso |
|----------|----------|----------|----------|
| `GET` | `/menu` | Categorías activas con productos disponibles agrupados | Público |
| `GET` | `/categorias` | Lista de categorías activas | Público |
| `GET` | `/productos` | Lista de productos disponibles | Público |
| `GET` | `/ocasiones` | Lista de tipos de ocasión para reservaciones | Público |

---

### Reservaciones

| Método | Endpoint | Descripción | Acceso |
|----------|----------|----------|----------|
| `POST` | `/reservaciones` | Crear reservación y generar notificación WhatsApp | Público |
| `GET` | `/reservaciones` | Listar reservaciones con filtros opcionales | [JWT] |
| `GET` | `/reservaciones/:id` | Obtener detalle de una reservación | [JWT] |
| `PATCH` | `/reservaciones/:id/status` | Actualizar estado de reservación y registrar historial | [JWT] |

---

### Panel de administración

#### Productos

| Método | Endpoint | Descripción | Acceso |
|----------|----------|----------|----------|
| `POST` | `/admin/productos` | Crear producto | [ADMIN] |
| `PATCH` | `/admin/productos/:id` | Editar producto | [ADMIN] |
| `DELETE` | `/admin/productos/:id` | Eliminar producto | [ADMIN] |

#### Categorías

| Método | Endpoint | Descripción | Acceso |
|----------|----------|----------|----------|
| `POST` | `/admin/categorias` | Crear categoría | [ADMIN] |
| `PATCH` | `/admin/categorias/:id` | Editar categoría | [ADMIN] |

#### Historial y auditoría

| Método | Endpoint | Descripción | Acceso |
|----------|----------|----------|----------|
| `GET` | `/admin/historial` | Consultar historial de cambios de estado | [JWT] |
| `GET` | `/admin/notificaciones` | Consultar mensajes WhatsApp generados | [JWT] |

---

## Modelo de datos

El sistema cuenta con **9 tablas** normalizadas hasta la Tercera Forma Normal (3NF):

```text
rol
usuario
categoria
producto
ocasion
cliente
reservacion
notificacion
historial_estado
```

Consulta el diagrama Entidad-Relación completo en el archivo:

```text
210785-tareabd1.md
```

---

## Credenciales de prueba

| Usuario | Contraseña | Rol |
|----------|----------|----------|
| `admin` | `admin123` | Administrador |
| `anastaff` | `staff123` | Staff |

> Estas credenciales son únicamente para entornos de desarrollo y pruebas.
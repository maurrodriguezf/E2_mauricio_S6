# Backend API REST - MiApp

Backend Node.js/Express con autenticación JWT, bcrypt y SQLite.

## 🚀 Características

- ✅ **Autenticación JWT**: Tokens seguros para sesiones
- ✅ **Hash de contraseñas**: bcrypt con salt rounds
- ✅ **Validación server-side**: express-validator
- ✅ **Base de datos SQLite**: Persistencia local
- ✅ **CORS configurado**: Soporte para Ionic/Capacitor
- ✅ **API RESTful**: Endpoints CRUD completos

## 📦 Instalación

```bash
cd backend
npm install
```

## 🔧 Configuración

Edita el archivo `.env` con tus valores:

```env
PORT=3000
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

**⚠️ IMPORTANTE**: Cambia `JWT_SECRET` en producción por un valor único y seguro.

## 🏃 Ejecutar

```bash
# Desarrollo con nodemon (auto-reload)
npm run dev

# Producción
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📡 API Endpoints

### Autenticación

#### POST `/api/auth/register`
Registra un nuevo usuario.

**Request:**
```json
{
  "username": "usuario123",
  "email": "usuario@ejemplo.com",
  "password": "mipassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "created_at": "2025-12-12T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

**Validaciones:**
- `username`: 3-50 caracteres, solo letras, números y guiones bajos
- `email`: Email válido
- `password`: Mínimo 6 caracteres, debe contener letra y número

---

#### POST `/api/auth/login`
Inicia sesión.

**Request:**
```json
{
  "username": "usuario123",
  "password": "mipassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

#### POST `/api/auth/verify`
Verifica un token JWT.

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com"
  },
  "valid": true
}
```

---

#### GET `/api/auth/me`
Obtiene información del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com"
  }
}
```

---

### Eventos

#### GET `/api/events`
Obtiene todos los eventos del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "events": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Partido de fútbol",
      "description": "Partido amistoso",
      "date": "2025-12-20T18:00:00Z",
      "location": "Cancha Municipal",
      "created_at": "2025-12-12T...",
      "updated_at": "2025-12-12T..."
    }
  ]
}
```

---

#### GET `/api/events/:id`
Obtiene un evento específico.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "event": {
    "id": 1,
    "user_id": 1,
    "title": "Partido de fútbol",
    "description": "Partido amistoso",
    "date": "2025-12-20T18:00:00Z",
    "location": "Cancha Municipal"
  }
}
```

---

#### POST `/api/events`
Crea un nuevo evento.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Partido de fútbol",
  "description": "Partido amistoso",
  "date": "2025-12-20T18:00:00Z",
  "location": "Cancha Municipal"
}
```

**Validaciones:**
- `title`: 3-100 caracteres (requerido)
- `description`: Máximo 500 caracteres (opcional)
- `date`: Fecha ISO8601 (requerido)
- `location`: Máximo 200 caracteres (opcional)

**Response (201):**
```json
{
  "success": true,
  "event": {
    "id": 1,
    "user_id": 1,
    "title": "Partido de fútbol",
    "description": "Partido amistoso",
    "date": "2025-12-20T18:00:00Z",
    "location": "Cancha Municipal"
  }
}
```

---

#### PUT `/api/events/:id`
Actualiza un evento.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:** (mismo formato que POST)

**Response (200):**
```json
{
  "success": true,
  "event": { ... }
}
```

---

#### DELETE `/api/events/:id`
Elimina un evento.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Evento eliminado correctamente"
}
```

---

### Health Check

#### GET `/api/health`
Verifica el estado del servidor.

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-12T..."
}
```

---

## 🔐 Seguridad

### Hash de contraseñas
- Utiliza **bcryptjs** con 10 salt rounds
- Las contraseñas NUNCA se almacenan en texto plano
- Comparación segura con `bcrypt.compare()`

### JWT (JSON Web Tokens)
- Tokens firmados con HS256
- Expiración configurable (default: 24h)
- Secret almacenado en variable de entorno
- Payload contiene: `id`, `username`, `email`

### Validación
- **express-validator** para validación de inputs
- Sanitización automática de datos
- Mensajes de error descriptivos
- Validaciones específicas por endpoint

### CORS
Configurado para aceptar requests desde:
- `http://localhost:8100` (Ionic serve)
- `http://localhost:4200` (Angular dev)
- `capacitor://localhost` (Apps nativas)
- `ionic://localhost` (Apps nativas)

## 📁 Estructura

```
backend/
├── database.js              # Conexión y configuración SQLite
├── server.js                # Servidor Express principal
├── .env                     # Variables de entorno
├── package.json            # Dependencias
├── middleware/
│   ├── auth.js             # Middleware JWT
│   └── validator.js        # Validaciones
├── routes/
│   ├── auth.js             # Rutas de autenticación
│   └── events.js           # Rutas de eventos
└── services/
    └── authService.js      # Lógica de autenticación
```

## 🗄️ Base de Datos

### Tabla `users`
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `events`
```sql
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
```

## 🧪 Probar la API

### Con curl

```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test123","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test123","password":"test123"}'

# Obtener eventos (reemplaza TOKEN)
curl -X GET http://localhost:3000/api/events \
  -H "Authorization: Bearer TOKEN"
```

### Con Postman / Thunder Client

1. POST `http://localhost:3000/api/auth/register`
   - Body: JSON con username, email, password
2. Copiar el `token` de la respuesta
3. Agregar header `Authorization: Bearer <token>` en siguientes requests

## 📝 Códigos de Estado HTTP

- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Datos de entrada inválidos
- `401 Unauthorized`: Token no proporcionado o inválido
- `403 Forbidden`: Token expirado
- `404 Not Found`: Recurso no encontrado
- `409 Conflict`: Usuario/email ya existe
- `500 Internal Server Error`: Error del servidor

## 🚀 Despliegue en Producción

### Variables de entorno requeridas:
```env
PORT=3000
JWT_SECRET=<generar_secreto_fuerte_aleatorio>
JWT_EXPIRES_IN=24h
NODE_ENV=production
```

### Generar JWT Secret seguro:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Recomendaciones:
- Usar HTTPS en producción
- Implementar rate limiting
- Configurar logs estructurados
- Usar base de datos PostgreSQL/MySQL en producción
- Implementar refresh tokens
- Agregar verificación de email
- Implementar recuperación de contraseña

## 📚 Tecnologías

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite3** - Base de datos
- **bcryptjs** - Hash de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **express-validator** - Validación de inputs
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno

## 🤝 Integración con Frontend

El frontend (Ionic/Angular) debe:

1. Configurar `apiUrl` en `environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api'
   };
   ```

2. Incluir token en headers:
   ```typescript
   const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });
   ```

3. Manejar errores de autenticación (401/403)

Ver documentación del frontend para más detalles.

## 📞 Soporte

Para problemas o preguntas, revisar:
- Logs del servidor en consola
- Estado de la base de datos SQLite
- Configuración de CORS
- Validez del token JWT

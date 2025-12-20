# Backend API REST con JWT y bcrypt

Implementación completa de un backend seguro con autenticación JWT y hash de contraseñas.

## ✅ Implementaciones Completadas

### 1. **Hash de Contraseñas con bcrypt** ✓
- **Librería**: `bcryptjs` v2.4.3
- **Salt Rounds**: 10 (balance seguridad/performance)
- **Ubicación**: `backend/services/authService.js`

**Características:**
```javascript
// Hash de contraseña en registro
const hashedPassword = await bcrypt.hash(password, 10);

// Verificación segura en login  
const isValid = await bcrypt.compare(password, hashedPassword);
```

**Beneficios:**
- ❌ Contraseñas en texto plano eliminadas
- ✅ Salt único por contraseña
- ✅ Resistente a ataques de fuerza bruta
- ✅ Compatible con rainbow tables protection

---

### 2. **Tokens JWT para Sesiones** ✓
- **Librería**: `jsonwebtoken` v9.0.2
- **Algoritmo**: HS256 (HMAC SHA-256)
- **Expiración**: Configurable (default 24h)
- **Ubicación**: `backend/services/authService.js`, `backend/middleware/auth.js`

**Características:**
```javascript
// Generación de token
const token = jwt.sign({ id, username, email }, SECRET, { expiresIn: '24h' });

// Verificación en middleware
jwt.verify(token, SECRET, (err, decoded) => {
  if (!err) req.user = decoded;
});
```

**Payload:**
```json
{
  "id": 1,
  "username": "usuario123",
  "email": "user@example.com",
  "iat": 1702387200,
  "exp": 1702473600
}
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

---

### 3. **Backend API REST** ✓
- **Framework**: Express v4.18.2
- **Base de datos**: SQLite3 v5.1.6
- **Puerto**: 3000 (configurable)
- **CORS**: Configurado para Ionic/Capacitor

**Endpoints Implementados:**

#### Autenticación
- `POST /api/auth/register` - Registro con validación
- `POST /api/auth/login` - Login con JWT
- `POST /api/auth/verify` - Verificar token
- `GET /api/auth/me` - Obtener usuario actual

#### Eventos (CRUD completo)
- `GET /api/events` - Listar eventos del usuario
- `GET /api/events/:id` - Obtener evento específico
- `POST /api/events` - Crear evento
- `PUT /api/events/:id` - Actualizar evento
- `DELETE /api/events/:id` - Eliminar evento

#### Health
- `GET /api/health` - Estado del servidor
- `GET /` - Documentación de endpoints

**Estructura:**
```
backend/
├── server.js              # Servidor principal
├── database.js            # SQLite connection
├── middleware/
│   ├── auth.js           # JWT verification
│   └── validator.js      # Input validation
├── routes/
│   ├── auth.js           # Auth endpoints
│   └── events.js         # Events CRUD
└── services/
    └── authService.js    # Business logic
```

---

### 4. **Validación Server-Side** ✓
- **Librería**: `express-validator` v7.0.1
- **Ubicación**: `backend/middleware/validator.js`

**Validaciones Implementadas:**

#### Registro (`validateRegister`)
```javascript
username: {
  min: 3, max: 50,
  pattern: /^[a-zA-Z0-9_]+$/,
  message: "Solo letras, números y guiones bajos"
}

email: {
  validEmail: true,
  normalized: true
}

password: {
  min: 6,
  requiresDigit: true,
  requiresLetter: true
}
```

#### Login (`validateLogin`)
```javascript
username: required, notEmpty
password: required, notEmpty
```

#### Eventos (`validateEvent`)
```javascript
title: { min: 3, max: 100, required }
description: { max: 500, optional }
date: { ISO8601, required }
location: { max: 200, optional }
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "password",
      "message": "La contraseña debe contener al menos un número"
    }
  ]
}
```

---

## 🔐 Seguridad Implementada

### Características de Seguridad

| Feature | Implementado | Descripción |
|---------|-------------|-------------|
| Hash de contraseñas | ✅ | bcrypt con 10 salt rounds |
| JWT Tokens | ✅ | HS256, expirable, firmado |
| Validación de inputs | ✅ | express-validator en todas las rutas |
| CORS configurado | ✅ | Whitelist de orígenes permitidos |
| SQL Injection protection | ✅ | Prepared statements |
| Sanitización de datos | ✅ | Automática con validator |
| Error handling | ✅ | No expone detalles internos |
| HTTPS ready | ✅ | Compatible con proxy reverso |

### Flujo de Autenticación

```
1. Usuario → POST /register → {username, email, password}
2. Backend → Validar inputs (express-validator)
3. Backend → Hashear password (bcrypt)
4. Backend → Guardar en SQLite
5. Backend → Generar JWT token
6. Backend → Responder {user, token}
7. Frontend → Guardar token en localStorage
8. Frontend → Incluir token en headers: "Authorization: Bearer <token>"
9. Backend → Verificar token en cada request (middleware)
```

---

## 🚀 Uso del Sistema

### Instalación

```bash
# Instalar dependencias del backend
npm run backend:install

# O manualmente
cd backend && npm install
```

### Ejecución

```bash
# Desarrollo (con auto-reload)
npm run backend:dev

# Producción
npm run backend
```

### Variables de Entorno

Editar `backend/.env`:
```env
PORT=3000
JWT_SECRET=<generar-secreto-seguro>
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

**Generar JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📱 Integración con Frontend

El frontend Angular/Ionic ya está actualizado para usar el backend:

### AuthService (Frontend)
```typescript
// src/app/services/auth.service.ts
async login(username: string, password: string): Promise<boolean> {
  const response = await this.http.post<AuthResponse>(
    `${this.apiUrl}/auth/login`,
    { username, password }
  ).toPromise();
  
  if (response?.token) {
    this.saveAuthData(response.token, response.user);
    return true;
  }
  return false;
}
```

### Configuración
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

---

## 🧪 Testing

### Probar con curl

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@test.com","password":"demo123"}'

# Respuesta:
# {
#   "success": true,
#   "user": {"id":1,"username":"demo","email":"demo@test.com"},
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
# }

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'

# 3. Usar token (copiar de respuesta anterior)
export TOKEN="<tu-token-jwt>"

# 4. Obtener eventos
curl -X GET http://localhost:3000/api/events \
  -H "Authorization: Bearer $TOKEN"

# 5. Crear evento
curl -X POST http://localhost:3000/api/events \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Partido de prueba",
    "description": "Test",
    "date": "2025-12-20T18:00:00Z",
    "location": "Cancha Central"
  }'
```

### Tests Unitarios Actualizados

```bash
# Frontend - 78 pruebas (actualizadas para API REST)
npm run test:headless
```

**Cambios en los tests:**
- ✅ AuthService usa HttpClientTestingModule
- ✅ LoginPage prueba con username en vez de email
- ✅ RegisterPage prueba con username
- ✅ Mocks actualizados para respuestas HTTP

---

## 📊 Comparativa: Antes vs Después

| Aspecto | Antes (localStorage) | Después (API REST + JWT) |
|---------|---------------------|--------------------------|
| **Contraseñas** | ❌ Texto plano | ✅ Hasheadas con bcrypt |
| **Sesiones** | ❌ localStorage solo | ✅ JWT con expiración |
| **Validación** | ⚠️ Solo frontend | ✅ Frontend + Backend |
| **Seguridad** | ❌ Mínima | ✅ Industry standard |
| **Escalabilidad** | ❌ Local only | ✅ Multi-dispositivo |
| **Backend** | ❌ No existe | ✅ API REST completa |
| **Base de datos** | ⚠️ SQLite local | ✅ SQLite server-side |
| **CORS** | N/A | ✅ Configurado |
| **Producción ready** | ❌ No | ✅ Sí (con HTTPS) |

---



## 📚 Documentación de Referencia

- [Backend README](backend/README.md) - Documentación completa de la API
- [bcrypt](https://www.npmjs.com/package/bcryptjs) - Hash de contraseñas
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT
- [express-validator](https://express-validator.github.io/) - Validación
- [OWASP](https://owasp.org/) - Mejores prácticas de seguridad

---

## ⚠️ Avisos de Seguridad

1. **JWT_SECRET**: NUNCA commitear en control de versiones
2. **HTTPS**: Obligatorio en producción (tokens viajan en headers)
3. **Salt Rounds**: No reducir por debajo de 10
4. **Token Expiration**: Balancear UX vs seguridad
5. **CORS**: Restringir orígenes en producción
6. **Logs**: No loguear contraseñas ni tokens

---

## 🏆 Logros Completados

✅ **Hash de contraseñas con bcrypt** - Implementado  
✅ **Tokens JWT para sesiones** - Implementado  
✅ **Backend API REST** - Implementado  
✅ **Validación server-side** - Implementado  
✅ **Frontend integrado** - Actualizado  
✅ **Tests unitarios** - Actualizados (78 pruebas)  
✅ **Documentación** - Completa  

**Estado**: ✅ **PRODUCCIÓN READY** (con HTTPS y variables de entorno correctas)

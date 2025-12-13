# 🚀 Quick Start Guide - Backend + Frontend

Guía rápida para ejecutar el proyecto completo con autenticación JWT y bcrypt.

## ⚡ Inicio Rápido (3 pasos)

### 1️⃣ Instalar Dependencias

```bash
# Instalar dependencias del frontend (si no lo has hecho)
npm install

# Instalar dependencias del backend
npm run backend:install
# O manualmente: cd backend && npm install
```

### 2️⃣ Iniciar el Backend

```bash
# Terminal 1: Iniciar backend API REST
npm run backend:dev
```

Deberías ver:
```
╔═══════════════════════════════════════════════╗
║   🚀 MiApp Backend API REST                   ║
║   Server running on port 3000                 ║
║   Environment: development                    ║
║   API Docs: http://localhost:3000             ║
╚═══════════════════════════════════════════════╝
```

### 3️⃣ Iniciar el Frontend

```bash
# Terminal 2: Iniciar frontend Ionic
npm start
# O: ionic serve
```

Navega a: http://localhost:8100

---

## ✅ Verificar que Todo Funciona

### 1. Backend Health Check

```bash
# En una terminal nueva
curl http://localhost:3000/api/health
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-12T..."
}
```

### 2. Registrar Usuario de Prueba

En el navegador:
1. Ve a http://localhost:8100/register
2. Completa el formulario:
   - **Usuario**: `demo`
   - **Email**: `demo@test.com`
   - **Contraseña**: `demo123`
   - **Confirmar**: `demo123`
3. Click en "Registrarse"

Deberías ser redirigido al dashboard ✅

### 3. Verificar en Backend

En la terminal del backend verás:
```
2025-12-12T... - POST /api/auth/register
```

### 4. Login

1. Cierra sesión si estás autenticado
2. Ve a http://localhost:8100/login
3. Ingresa:
   - **Usuario**: `demo`
   - **Contraseña**: `demo123`
4. Click en "Entrar"

---

## 🔍 Inspeccionar la Base de Datos

```bash
cd backend
sqlite3 database.sqlite

# Ver usuarios (contraseñas hasheadas con bcrypt)
sqlite> SELECT id, username, email FROM users;

# Salir
sqlite> .quit
```

Ejemplo de salida:
```
1|demo|demo@test.com
```

**Nota**: Las contraseñas están hasheadas con bcrypt, no verás `demo123` en la base de datos ✅

---

## 📡 Probar la API Manualmente

### Con curl

```bash
# 1. Registrar
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'

# Copia el token de la respuesta
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 2. Obtener eventos
curl -X GET http://localhost:3000/api/events \
  -H "Authorization: Bearer $TOKEN"

# 3. Crear evento
curl -X POST http://localhost:3000/api/events \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primer evento",
    "description": "Evento de prueba",
    "date": "2025-12-20T18:00:00Z",
    "location": "Online"
  }'
```

### Con extensiones de VS Code

**Thunder Client / REST Client:**

```http
### Registrar
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}

### Login
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "test123"
}

### Obtener eventos (reemplaza TOKEN)
GET http://localhost:3000/api/events
Authorization: Bearer <TOKEN>
```

---

## 🧪 Ejecutar Pruebas

```bash
# Pruebas unitarias frontend (78 pruebas)
npm run test:headless

# Pruebas E2E con Cypress
npm run e2e
```

---

## 🛠️ Comandos Útiles

### Frontend
```bash
npm start              # Desarrollo (http://localhost:8100)
npm run build          # Compilar para producción
npm test               # Tests en modo watch
npm run test:headless  # Tests una vez
npm run e2e            # Cypress E2E
```

### Backend
```bash
npm run backend:dev    # Desarrollo con nodemon (auto-reload)
npm run backend        # Producción
cd backend && npm start # Alternativa
```

### Ambos
```bash
# Terminal 1
npm run backend:dev

# Terminal 2
npm start
```

---

## 📱 Compilar para Móvil

### Android

```bash
# 1. Agregar plataforma Android (primera vez)
npx cap add android

# 2. Compilar frontend
npm run build

# 3. Sincronizar con Capacitor
npx cap sync

# 4. Abrir en Android Studio
npx cap open android
```

**⚠️ Importante**: Cambiar `apiUrl` en producción:
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://tu-servidor.com/api' // URL de tu backend en producción
};
```

### iOS

```bash
npx cap add ios
npm run build
npx cap sync
npx cap open ios
```

---

## 🔐 Seguridad

### JWT Secret

**⚠️ IMPORTANTE**: Cambiar en producción

```bash
# Generar un secret seguro
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Editar backend/.env
JWT_SECRET=<tu-secret-generado>
```

### Variables de Entorno

**backend/.env** (ya configurado para desarrollo):
```env
PORT=3000
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion_12345
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

---

## 🐛 Troubleshooting

### Puerto 3000 ocupado

```bash
# Cambiar en backend/.env
PORT=3001
```

### CORS Error

El backend ya está configurado para aceptar:
- http://localhost:8100 (Ionic)
- http://localhost:4200 (Angular)
- capacitor://localhost (Apps nativas)

Si usas otro puerto, edita `backend/server.js`:
```javascript
cors({
  origin: ['http://localhost:8100', 'http://localhost:TU_PUERTO']
})
```

### Backend no conecta con frontend

Verifica:
1. ✅ Backend corriendo en http://localhost:3000
2. ✅ Frontend en `environment.ts` tiene `apiUrl: 'http://localhost:3000/api'`
3. ✅ No hay errores de CORS en consola del navegador

### Tests fallan

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run test:headless
```

---

## 📂 Estructura del Proyecto

```
E2_mauricio_rodriguez_S8/
├── backend/                    # 🔐 Backend API REST
│   ├── server.js              # Express server
│   ├── database.js            # SQLite
│   ├── middleware/            # JWT + Validation
│   ├── routes/                # API endpoints
│   ├── services/              # Business logic
│   └── package.json           # Backend deps
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── auth.service.ts  # ⚡ Integrado con API
│   │   └── pages/
│   │       ├── login/         # Username login
│   │       └── register/      # Username register
│   └── environments/
│       ├── environment.ts      # apiUrl configurado
│       └── environment.prod.ts # Para producción
├── package.json               # Scripts del proyecto
└── README.md                  # Documentación principal
```

---

## 📚 Documentación Completa

- [README.md](../README.md) - Visión general del proyecto
- [backend/README.md](../backend/README.md) - Documentación completa de la API
- [API_REST_IMPLEMENTATION.md](../API_REST_IMPLEMENTATION.md) - Detalles de implementación
- [SQLITE_MIGRATION.md](../SQLITE_MIGRATION.md) - Migración de SQLite
- [TESTING.md](../TESTING.md) - Guía de pruebas

---

## 🎯 Checklist de Inicio

- [ ] `npm install` ejecutado ✅
- [ ] `npm run backend:install` ejecutado ✅
- [ ] Backend corriendo (Terminal 1) ✅
- [ ] Frontend corriendo (Terminal 2) ✅
- [ ] http://localhost:3000/api/health responde ✅
- [ ] http://localhost:8100 carga ✅
- [ ] Registro de usuario funciona ✅
- [ ] Login funciona ✅
- [ ] Tests pasan (`npm run test:headless`) ✅

---

## 💡 Tips

1. **DevTools**: Inspecciona Network tab para ver requests a `/api/auth/login`
2. **JWT Token**: Se guarda en localStorage como `auth_token`
3. **Logs**: Backend muestra cada request en consola
4. **Database**: `backend/database.sqlite` se crea automáticamente
5. **Hot Reload**: Nodemon reinicia backend automáticamente al editar código

---

## 🚀 ¡Listo para Desarrollar!

Ahora tienes:
- ✅ Backend API REST con JWT y bcrypt
- ✅ Frontend integrado con autenticación segura
- ✅ Base de datos SQLite
- ✅ Validación server-side
- ✅ 78 pruebas unitarias pasando
- ✅ Documentación completa

**¡Happy coding! 🎉**

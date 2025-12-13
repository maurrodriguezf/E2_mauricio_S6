# Entrega: Proyecto Ionic

Proyecto Ionic con Angular que incluye autenticación, gestión de eventos, y base de datos SQLite.

## 🚀 Características Implementadas

- ✅ **Backend API REST**: Node.js + Express con endpoints completos
- ✅ **Hash de contraseñas**: bcrypt con 10 salt rounds
- ✅ **Autenticación JWT**: Tokens seguros con expiración configurable
- ✅ **Validación server-side**: express-validator en todos los endpoints
- ✅ **Base de datos SQLite**: Persistencia en backend
- ✅ **Pruebas Unitarias**: 78 pruebas con Jasmine/Karma
- ✅ **Pruebas E2E**: Suite completa con Cypress
- ✅ **CORS configurado**: Soporte para Ionic/Capacitor
- ✅ **Arquitectura REST**: Separación frontend/backend

## � Quick Start

```bash
# 1. Instalar dependencias
npm install
npm run backend:install

# 2. Iniciar backend (Terminal 1)
npm run backend:dev

# 3. Iniciar frontend (Terminal 2)
npm start
```

Navega a http://localhost:8100

Ver [QUICK_START.md](QUICK_START.md) para guía detallada.

## �📦 Instalación

```bash
# Clonar repositorio
git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
npm install

# Sincronizar con Capacitor
npx cap sync
```

## 🏃 Comandos Disponibles
Frontend (Ionic serve)
npm run backend:dev       # Backend con nodemon
npm run build            # Compilar producción
```

### Pruebas
```bash
npm test                 # Pruebas unitarias (watch mode)
npm run test:headless    # Pruebas unitarias (una vez)
npm run e2e              # Pruebas E2E con Cypress
npm run cypress:open     # Cypress modo interactivo
```

### Backend
```bash
npm run backend          # Iniciar backend producción
npm run backend:dev      # Backend desarrollo (auto-reload)
npm run backend:install  # Instalar deps del backend mode)
npm run test:headless    # Pruebas unitarias (una vez)
npm run e2e              # Pruebas E2E con Cypress
npm run cypress:open     # Cypress modo interactivo
```

### Plataformas Móviles
```bash
npx cap add android      # Agregar Android
npx cap add ios          # Agregar iOS
npx cap sync            # Sincronizar plugins
npx cap open android    # Abrir Android Studio
npx cap open ios        # Abrir Xcode
```

## 📁 Estructura del Proyecto

```
src/
├── assets/            # Recursos estáticos
└── environments/      # Configuración por entorno

backend/
├── server.js          # Servidor Express principal
├── Backend SQLite (Server-side)
- **Ubicación**: `backend/database.sqlite`
- **Tablas**: users, events
- **Características**: 
  - Contraseñas hasheadas con bcrypt
  - Relaciones con foreign keys
  - Índices para performance
  - Transacciones automáticas

### Schema
```sql
-- Usuarios con contraseñas hasheadas
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,  -- bcrypt hash
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Eventos asociados a usuarios
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  location TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```QUICK_START.md](QUICK_START.md) - Guía rápida de inicio (¡Empieza aquí!)
- [backend/README.md](backend/README.md) - Documentación completa de la API REST
- [API_REST_IMPLEMENTATION.md](API_REST_IMPLEMENTATION.md) - Detalles de implementación JWT/bcrypt
- [TESTING.md](TESTING.md) - Guía completa de pruebas
- [SQLITE_MIGRATION.md](SQLITE_MIGRATION.md) - Documentación de SQLite (legacy)
Ver [backend/README.md](backend/README.md) para detalles completos de la API
### Frontend
- **Framework**: Ionic 8 + Angular 20
- **UI**: Angular Material + Ionic Components
- **HTTP**: HttpClient con interceptores
- **Pruebas**: Jasmine + Karma + Cypress
- **State**: Services + RxJS

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18
- **Base de Datos**: SQLite3
- **Autenticación**: JWT (jsonwebtoken)
- **Seguridad**: bcrypt, express-validator, CORS
- **Desarrollo**: nodemon (auto-reload)
- **Android/iOS**: Base de datos SQLite nativa
- **Tablas**: users, events
- **Características**: Transacciones, índices, persistencia
✅ IMPLEMENTADO** en este proyecto:
- ✅ Hash de contraseñas con bcrypt (10 salt rounds)
- ✅ JWT tokens con expiración (24h configurable)
- ✅ Validación server-side (express-validator)
- ✅ CORS configurado correctamente
- ✅ SQL Injection protection (prepared statements)
- ✅ Sanitización de inputs
- ✅ Error handling sin exponer detalles



## 🧪 Pruebas

### Cobertura de Pruebas

- **78 pruebas unitarias** pasando
- **5 suites E2E** configuradas
- Cobertura de: Servicios, Componentes, Guards

Ver [TESTING.md](TESTING.md) para guía completa de pruebas.

## 📚 Documentación

- [TESTING.md](TESTING.md) - Guía completa de pruebas
- [SQLITE_MIGRATION.md](SQLITE_MIGRATION.md) - Migración a SQLite
- [DELIVERY.md](DELIVERY.md) - Instrucciones de entrega

## 🔧 Tecnologías

- **Framework**: Ionic 8 + Angular 20
- **UI**: Angular Material + Ionic Components
- **Base de Datos**: SQLite (Capacitor Community)
- **Pruebas**: Jasmine + Karma + Cypress
- **State Management**: Services + localStorage/SQLite
- **Animaciones**: Angular Animations

## ⚠️ Notas de Seguridad

**IMPORTANTE**: Esta implementación es educativa. En producción:
- Hashear contraseñas (bcrypt/argon2)
- Usar JWT para sesiones
- Implementar backend API REST
- Validación server-side
- HTTPS en todas las comunicaciones
as

## 📝 Commits

Este proyecto usa commits descriptivos:
- `feat:` Nuevas características
- `fix:` Correcciones
- `test:` Pruebas
- `docs:` Documentación
- `refactor:` Refactorización

## 👥 Autor

Mauricio Rodríguez - Evaluación 2 Semestre 8

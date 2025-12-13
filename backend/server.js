require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database');

// Importar rutas
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:8100', 'http://localhost:4200', 'capacitor://localhost', 'ionic://localhost'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);

// Ruta de healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MiApp Backend API REST',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        verify: 'POST /api/auth/verify',
        me: 'GET /api/auth/me'
      },
      events: {
        list: 'GET /api/events',
        get: 'GET /api/events/:id',
        create: 'POST /api/events',
        update: 'PUT /api/events/:id',
        delete: 'DELETE /api/events/:id'
      },
      health: 'GET /api/health'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Inicializar base de datos y servidor
database.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   🚀 MiApp Backend API REST                   ║
║                                               ║
║   Server running on port ${PORT}                ║
║   Environment: ${process.env.NODE_ENV || 'development'}                  ║
║                                               ║
║   API Docs: http://localhost:${PORT}            ║
║   Health: http://localhost:${PORT}/api/health   ║
║                                               ║
╚═══════════════════════════════════════════════╝
      `);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await database.close();
  process.exit(0);
});

module.exports = app;

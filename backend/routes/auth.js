const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { validateRegister, validateLogin } = require('../middleware/validator');

/**
 * POST /api/auth/register
 * Registra un nuevo usuario
 */
router.post('/register', validateRegister, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const result = await authService.register(username, email, password);
    
    res.status(201).json(result);
  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error.message.includes('ya existe')) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario'
    });
  }
});

/**
 * POST /api/auth/login
 * Inicia sesión
 */
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const result = await authService.login(username, password);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en login:', error);
    
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión'
    });
  }
});

/**
 * POST /api/auth/verify
 * Verifica un token JWT
 */
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }
    
    const decoded = authService.verifyToken(token);
    const user = await authService.getUserById(decoded.id);
    
    res.status(200).json({
      success: true,
      user,
      valid: true
    });
  } catch (error) {
    console.error('Error al verificar token:', error);
    
    res.status(401).json({
      success: false,
      message: error.message,
      valid: false
    });
  }
});

/**
 * GET /api/auth/me
 * Obtiene información del usuario autenticado
 */
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }
    
    const decoded = authService.verifyToken(token);
    const user = await authService.getUserById(decoded.id);
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    
    res.status(401).json({
      success: false,
      message: 'No autorizado'
    });
  }
});

module.exports = router;

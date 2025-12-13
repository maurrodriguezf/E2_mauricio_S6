const express = require('express');
const router = express.Router();
const database = require('../database');
const { verifyToken } = require('../middleware/auth');
const { validateEvent } = require('../middleware/validator');

/**
 * GET /api/events
 * Obtiene todos los eventos del usuario autenticado
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const events = await database.query(
      'SELECT * FROM events WHERE user_id = ? ORDER BY date DESC',
      [userId]
    );
    
    res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error al obtener eventos'
    });
  }
});

/**
 * GET /api/events/:id
 * Obtiene un evento específico
 */
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const event = await database.get(
      'SELECT * FROM events WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error al obtener evento:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error al obtener evento'
    });
  }
});

/**
 * POST /api/events
 * Crea un nuevo evento
 */
router.post('/', verifyToken, validateEvent, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const userId = req.user.id;
    
    const result = await database.run(
      'INSERT INTO events (user_id, title, description, date, location) VALUES (?, ?, ?, ?, ?)',
      [userId, title, description || '', date, location || '']
    );
    
    const event = await database.get(
      'SELECT * FROM events WHERE id = ?',
      [result.id]
    );
    
    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error al crear evento:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error al crear evento'
    });
  }
});

/**
 * PUT /api/events/:id
 * Actualiza un evento
 */
router.put('/:id', verifyToken, validateEvent, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location } = req.body;
    const userId = req.user.id;
    
    // Verificar que el evento existe y pertenece al usuario
    const existingEvent = await database.get(
      'SELECT * FROM events WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }
    
    await database.run(
      'UPDATE events SET title = ?, description = ?, date = ?, location = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', date, location || '', id]
    );
    
    const event = await database.get(
      'SELECT * FROM events WHERE id = ?',
      [id]
    );
    
    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error al actualizar evento'
    });
  }
});

/**
 * DELETE /api/events/:id
 * Elimina un evento
 */
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Verificar que el evento existe y pertenece al usuario
    const existingEvent = await database.get(
      'SELECT * FROM events WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }
    
    await database.run(
      'DELETE FROM events WHERE id = ?',
      [id]
    );
    
    res.status(200).json({
      success: true,
      message: 'Evento eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error al eliminar evento'
    });
  }
});

module.exports = router;

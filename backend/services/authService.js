const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

class AuthService {
  /**
   * Genera un token JWT para un usuario
   */
  generateToken(user) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  /**
   * Verifica un token JWT
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  /**
   * Hashea una contraseña
   */
  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  /**
   * Compara una contraseña con su hash
   */
  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Registra un nuevo usuario
   */
  async register(username, email, password) {
    try {
      // Validar que el usuario no exista
      const existingUser = await database.get(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, email]
      );

      if (existingUser) {
        throw new Error('El usuario o email ya existe');
      }

      // Hashear la contraseña
      const hashedPassword = await this.hashPassword(password);

      // Insertar el usuario
      const result = await database.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      // Obtener el usuario creado
      const user = await database.get(
        'SELECT id, username, email, created_at FROM users WHERE id = ?',
        [result.id]
      );

      // Generar token
      const token = this.generateToken(user);

      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Inicia sesión
   */
  async login(username, password) {
    try {
      // Buscar usuario
      const user = await database.get(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      // Verificar contraseña
      const isValidPassword = await this.comparePassword(password, user.password);

      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      // Generar token
      const token = this.generateToken(user);

      // Retornar usuario sin la contraseña
      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un usuario por ID
   */
  async getUserById(userId) {
    try {
      const user = await database.get(
        'SELECT id, username, email, created_at FROM users WHERE id = ?',
        [userId]
      );

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();

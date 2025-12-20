const bcrypt = require('bcryptjs');
const database = require('./database');

const SALT_ROUNDS = 10;

async function createAdminUser() {
  try {
    await database.connect();
    
    // Hashear la contraseña 'admin123'
    const hashedPassword = await bcrypt.hash('admin123', SALT_ROUNDS);
    
    // Verificar si el admin ya existe
    const existingAdmin = await database.get(
      'SELECT * FROM users WHERE username = ?',
      ['admin']
    );
    
    if (existingAdmin) {
      // Actualizar la contraseña del admin existente
      await database.run(
        'UPDATE users SET password = ?, email = ? WHERE username = ?',
        [hashedPassword, 'admin@miapp.com', 'admin']
      );
      console.log('\n✅ Contraseña del usuario admin actualizada!\n');
    } else {
      // Crear el usuario admin
      await database.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        ['admin', 'admin@miapp.com', hashedPassword]
      );
      console.log('\n✅ Usuario admin creado exitosamente!\n');
    }
    
    console.log('═══════════════════════════════════');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('  Email: admin@miapp.com');
    console.log('═══════════════════════════════════\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creando usuario admin:', error);
    process.exit(1);
  }
}

createAdminUser();

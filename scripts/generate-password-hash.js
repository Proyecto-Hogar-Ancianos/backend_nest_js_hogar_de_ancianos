/**
 * Script para generar hash de contraseña para usuarios de prueba
 * 
 * Uso:
 * 1. Instala bcrypt: npm install bcrypt
 * 2. Ejecuta: node scripts/generate-password-hash.js
 */

const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('===========================================');
console.log('  GENERADOR DE HASH DE CONTRASEÑA');
console.log('===========================================\n');

rl.question('Ingresa la contraseña a hashear: ', async (password) => {
  if (!password || password.length < 6) {
    console.error('\n❌ Error: La contraseña debe tener al menos 6 caracteres');
    rl.close();
    return;
  }

  try {
    console.log('\n⏳ Generando hash...\n');
    
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('✅ Hash generado exitosamente!\n');
    console.log('===========================================');
    console.log('Contraseña original:', password);
    console.log('Hash bcrypt:', hash);
    console.log('===========================================\n');
    console.log('📋 Copia el hash de arriba y úsalo en tu INSERT SQL:\n');
    console.log(`INSERT INTO users (
  u_identification, 
  u_name, 
  u_f_last_name, 
  u_s_last_name, 
  u_email, 
  u_password, 
  u_is_active, 
  role_id
) VALUES (
  '123456789',
  'Juan',
  'Pérez',
  'González',
  'admin@hogar.com',
  '${hash}',
  TRUE,
  1
);`);
    console.log('\n===========================================\n');
    
    // Verificar el hash
    const isValid = await bcrypt.compare(password, hash);
    console.log('✅ Verificación del hash:', isValid ? 'CORRECTA' : 'INCORRECTA');
    
  } catch (error) {
    console.error('\n❌ Error al generar hash:', error.message);
  }
  
  rl.close();
});

rl.on('close', () => {
  console.log('\n👋 ¡Hasta luego!\n');
  process.exit(0);
});

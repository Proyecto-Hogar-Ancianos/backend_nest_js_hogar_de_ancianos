/**
 * Script para crear super usuarios predeterminados al iniciar la app
 */

const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const superUsers = [
  {
    u_identification: '604700548',
    u_name: 'Antony',
    u_f_last_name: 'Monge',
    u_s_last_name: 'Lopez',
    u_email: 'antony.mongelopez@ucr.ac.cr',
    password: 'tonyml123',
    role_id: 1
  },
  {
    u_identification: 'C35380',
    u_name: 'Jonathan',
    u_f_last_name: 'Moreno',
    u_s_last_name: 'Fajardo',
    u_email: 'jonathanfajardo406@gmail.com',
    password: 'jona123',
    role_id: 1
  },
  {
    u_identification: 'C36589',
    u_name: 'Luis',
    u_f_last_name: 'Rivera',
    u_s_last_name: 'Lopez',
    u_email: 'luis.riveralopez@ucr.ac.cr',
    password: 'luis123',
    role_id: 1
  }
];

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hogar_de_ancianos'
};

async function createSuperUsers() {
  const connection = await mysql.createConnection(dbConfig);

  for (const user of superUsers) {
    // Verificar si el usuario ya existe
    const [rows] = await connection.execute(
      'SELECT id FROM users WHERE u_identification = ? OR u_email = ?',
      [user.u_identification, user.u_email]
    );

    if (rows.length > 0) {
      console.log(`👤 Usuario ${user.u_name} ya existe en la DB, saltando...`);
      continue;
    }

    // Generar hash de contraseña
    const hash = await bcrypt.hash(user.password, 10);

    // Insertar en la DB
    const insertQuery = `
      INSERT INTO users (
        u_identification,
        u_name,
        u_f_last_name,
        u_s_last_name,
        u_email,
        u_password,
        u_is_active,
        role_id
      ) VALUES (?, ?, ?, ?, ?, ?, TRUE, ?)
    `;

    await connection.execute(insertQuery, [
      user.u_identification,
      user.u_name,
      user.u_f_last_name,
      user.u_s_last_name,
      user.u_email,
      hash,
      user.role_id
    ]);

    console.log(`  Super usuario ${user.u_name} creado exitosamente`);
  }

  await connection.end();
}

createSuperUsers()
  .then(() => console.log('\n🎉 Proceso completado'))
  .catch(err => console.error('❌ Error:', err));

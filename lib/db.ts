import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
};

// Crear un pool de conexiones para manejar múltiples solicitudes
const pool = mysql.createPool(dbConfig);

export async function query(sql: string, values: any[] = []) {
  try {
    const [rows] = await pool.execute(sql, values);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

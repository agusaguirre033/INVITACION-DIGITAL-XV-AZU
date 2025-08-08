import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Importa la función de consulta de la base de datos

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { family, song, artist } = body;

    if (!family || !song) {
      return NextResponse.json(
        { error: 'Familia y canción son requeridos' },
        { status: 400 }
      );
    }

    // Inserta la nueva canción en la base de datos
    const sql = `
      INSERT INTO songs (family, song, artist)
      VALUES (?, ?, ?)
    `;
    const values = [family, song, artist || null];
    const result = await query(sql, values);

    // Asumiendo que el resultado contiene el ID insertado (depende del driver y la configuración)
    // Para mysql2, `insertId` está en el primer elemento del array de resultados para INSERT
    const insertedId = (result as any).insertId;

    return NextResponse.json(
      { 
        message: 'Canción agregada exitosamente', 
        song: { id: insertedId, family, song, artist: artist || null, created_at: new Date().toISOString() }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al agregar canción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Obtiene todas las canciones de la base de datos, ordenadas por fecha de creación
    const sql = `
      SELECT id, family, song, artist, created_at
      FROM songs
      ORDER BY created_at DESC
    `;
    const songs = await query(sql);

    return NextResponse.json({ songs }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener canciones:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

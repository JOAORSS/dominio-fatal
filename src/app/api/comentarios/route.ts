import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@/utils/mysqlProps';

export async function POST(request: Request) {
  const connectionParams = GetDBSettings();

  const { produto, usuario, comentario }: { produto: number, usuario:string, comentario: string} = await request.json();

  if (!produto || comentario.length < 4 || !usuario) {
    return NextResponse.json({ error: 'Produto ID is missing or comment is too short' }, { status: 400 });
  }

  const values: [number, string, string] = [produto, usuario, comentario];

  try {
      const connection = await mysql.createConnection(connectionParams);
      const query = `INSERT INTO comentarios (produto_id, usuario, comentario) VALUES (?, ?, ?);`;
      await connection.execute<mysql.RowDataPacket[]>(query, values);
      
      connection.end();
  
      return NextResponse.json({ status: 201 }, { status: 201 });

  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);
    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function GET(request: Request) {
    const connectionParams = GetDBSettings();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Produto ID is missing' }, { status: 400 });
    }

    const values: [number] = [parseInt(id)];
  
      try {
          const connection = await mysql.createConnection(connectionParams);
          const query = "SELECT usuario, comentario FROM comentarios WHERE produto_id = ? ORDER BY data_comentario ASC;";
          const [results] = await connection.execute<mysql.RowDataPacket[]>(query, values);
        
          connection.end();
      
          return NextResponse.json(results, { status: 200 });
  
    } catch (err) {
      console.log('ERROR: API - ', (err as Error).message);
      const response = {
        error: (err as Error).message,
        returnedStatus: 500,
      };
      return NextResponse.json(response, { status: 500 });
    }
  }
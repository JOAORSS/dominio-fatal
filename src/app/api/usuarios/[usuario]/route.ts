import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@/utils/mysqlProps';

export async function POST(request: Request) {

    try {
        const connection = await mysql.createConnection(GetDBSettings());
        const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?;";
        const { email, senha } = await request.json();
        const values: [string, string] = [email, senha];

        const [results] = await connection.execute<mysql.RowDataPacket[]>(query, values);

        connection.end();

        if (results.length === 0) {
            return NextResponse.json({ error: 'Usuário ou senha inválidos' }, { status: 401 });
        }

        return NextResponse.json(results[0]);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
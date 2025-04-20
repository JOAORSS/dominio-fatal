"use server"

import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse<string | null>> {
    const { name, email } = await req.json();

    const payload = {
        name,
        email,
    };

    const token = jwt.sign(payload, process.env.SECRET_JWT_SERVER!, { expiresIn: '10m' });

    return NextResponse.json(token);
}
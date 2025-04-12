"use server"

import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: 
    {
        name: string;
        email: string;
    }
): Promise<NextResponse<string | null>>{

    const payload = {
        name: req.name,
        email: req.email,
    }

    const token = jwt.sign(payload, process.env.SECRET_JWT_SERVER!, { expiresIn: '10m' });

    return NextResponse.json(token);
}
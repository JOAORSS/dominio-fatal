import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(`https://sandbox.sdk.pagseguro.com/checkout-sdk/sessions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${process.env.PAGBANK_TOKEN}`
            }
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Tente novamente, mais tarde" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'Ocorreu um erro, tente novamente' }, { status: 500 });
    }
}
// src/app/api/calcularFrete/route.ts
import { NextResponse } from 'next/server';
import apiMENV from '@/lib/melhorEnvio';

interface RequestType {
    peso: string;
    comprimento: string;
    altura: string;
    largura: string;
}


export async function POST(request: Request) {
  try {
    const { peso, comprimento, altura, largura }: RequestType = await request.json();

    const url = new URL(request.url);
    const cepDestino = url.searchParams.get('cepDestino');

    const melhorEnvioResponse = await apiMENV.post('/api/v2/me/shipment/calculate', {
      from: { postal_code: '99200000' },
      to: { postal_code: cepDestino },
      package: {
        weight: peso,
        height: altura,
        width: largura,
        length: comprimento,
      },
      options: {
        insurance_value: 0,
        receipt: false, 
        own_hand: false,
      },
      services: '1,2',
    });

    return NextResponse.json(melhorEnvioResponse.data);
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    return NextResponse.json({ error: 'Erro ao calcular frete' }, { status: 500 });
  }
}
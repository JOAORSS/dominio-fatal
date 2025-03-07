"use server"

import { NextResponse } from 'next/server';
import { Cor } from '@/module/produtoApi';
import createClientServer from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('produto');

  if (!id) {
    return NextResponse.json({ error: 'Produto ID is missing' }, { status: 400 });
  }

  const produtoId = parseInt(id);

  try {
    const supabase = await createClientServer();

    const { data: produtos } = await supabase
    .from('produtos')
    .select('*')
    .eq('id', produtoId)
    .single()

    const { data: coresRes } = await supabase
    .from('estoque_produtos')
    .select(`
      cor_id,
      cores!inner(nome, hex),
      tamanhos!inner(id),
      quantidade
    `)
    .eq('produto_id', produtoId);

    if (!coresRes) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    const cores = agruparTamanhosPorCor(coresRes as unknown as { cor_id: number, quantidade: number, cores: { hex: string, nome: string }, tamanhos: { id: number } }[]);

    produtos.cores = cores;

    return NextResponse.json(produtos, { status: 200 });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);
    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

const agruparTamanhosPorCor = (quantidades: 
  { 
    cor_id: number,
    quantidade: number,
    cores: {
      hex: string,
      nome: string
    },
    tamanhos: {
      id: number
    }
  }[]): Cor[] => {
  
    const coresMap = new Map<number, Cor>();

    quantidades.forEach((item) => {
      if (!coresMap.has(item.cor_id)) {
        coresMap.set(item.cor_id, {
          cor_id: item.cor_id,
          cor: item.cores.nome,
          hex: item.cores.hex,
          tamanhos: [],
        });
      }

    const cor = coresMap.get(item.cor_id);
    cor?.tamanhos.push({
      tamanho: item.tamanhos.id,
      quantidade: item.quantidade,
    });
  });

  return Array.from(coresMap.values());
};
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@/utils/mysqlProps';
import { Cor, Produto } from '@/module/produtoApi';

export async function GET(request: Request) {
  const connectionParams = GetDBSettings();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('produto');

  if (!id) {
    return NextResponse.json({ error: 'Produto ID is missing' }, { status: 400 });
  }

  const values: [number] = [parseInt(id)];

  try {
    const connection = await mysql.createConnection(connectionParams);
    const queryProduto = "SELECT * FROM produtos WHERE id = ?;";
    const queryQuantidade = `
      SELECT
      c.id AS cor_id,
      c.nome AS cor, 
      c.hex AS hex, 
      t.id AS tamanho, 
      ep.quantidade 
      FROM estoque_produto ep 
      JOIN cores c ON ep.cor_id = c.id 
      JOIN tamanhos t ON ep.tamanho_id = t.id 
      WHERE ep.produto_id = 1 
      ORDER BY c.nome, FIELD(t.nome, 'PP', 'P', 'M', 'G', 'GG', 'GX');`;

    const [resultsProduto] = await connection.execute<mysql.RowDataPacket[]>(queryProduto, values);
    const [resultsQuantidade] = await connection.execute<mysql.RowDataPacket[]>(queryQuantidade, values);

    connection.end();

    const agruparTamanhosPorCor = (quantidades: { cor_id: number; cor: string; hex: string; tamanho: number; quantidade: number; }[]): Cor[] => {
      const coresMap = new Map<number, Cor>();

      quantidades.forEach((item) => {
        if (!coresMap.has(item.cor_id)) {
          coresMap.set(item.cor_id, {
            cor_id: item.cor_id,
            cor: item.cor,
            hex: item.hex,
            tamanhos: [],
          });
        }

        const cor = coresMap.get(item.cor_id);
        cor?.tamanhos.push({
          tamanho: item.tamanho,
          quantidade: item.quantidade,
        });
      });

      return Array.from(coresMap.values());
    };

    const produto: Produto = {
      id: resultsProduto[0].id,
      nome: resultsProduto[0].nome,
      preco: resultsProduto[0].preco,
      tecido: resultsProduto[0].tecido,
      imagens: resultsProduto[0].imagens,
      maisCores: resultsProduto[0].mais_cores,
      descricao: resultsProduto[0].descricao,
      cores: agruparTamanhosPorCor(resultsQuantidade as { cor_id: number; cor: string; hex: string; tamanho: number; quantidade: number; }[]),
    };

    return NextResponse.json(produto, { status: 200 });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);
    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
"use server"

import Container from "@/components/container";
import ProdutoLeyout from "./leyoutProduto";
import ProdutoDetalhes from "@/components/produtoPagina";
import PageLeyout from "@/components/pageLeyout";
import CoretorUrlProduto from "@/utils/coretorUrlProduto";
// import GradeProduto from "@/components/gradeProdutos";
import { Produto } from '@/module/produtoApi';

interface PaginaProdutoProps {
    params: Promise<{
        produtos: string,
        id: string,
        produto: string,
    }>,
}



export default async function PaginaProduto({ params }: PaginaProdutoProps) {
    const awaitParams = await params;
    const { id, produto } = awaitParams;

    const produtoJson = await fetch(`${process.env.API_PRODUTOS}=${id}`, {
        cache: 'no-store',
    });

    const produtoRes: Produto = await produtoJson.json();

    const comentarioRes = [
        { usuario: "User1", comentario: "Great product!" },
        { usuario: "User2", comentario: "Very useful." },
        { usuario: "User3", comentario: "Highly recommend." }
    ];

    return (
        <PageLeyout>
            <Container center>
                <CoretorUrlProduto id={id} nome={produto} nomeCorreto={produtoRes.nome} />
                <ProdutoLeyout>
                    <ProdutoDetalhes comentarios={comentarioRes} produto={produtoRes} />
                </ProdutoLeyout>
            </Container>
        </PageLeyout>
    );
}

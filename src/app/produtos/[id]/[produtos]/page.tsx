import Container from "@/components/container";
import ProdutoLeyout from "./leyout";
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

    const resProduto = await fetch(`${process.env.API_PRODUTOS}=${id}`, {
        cache: 'no-store',
    });

    const resComentario = await fetch(`${process.env.API_COMENTARIOS}?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
    });

    const produtoRes: Produto = await resProduto.json();
    const comentarioRes: {usuario: string, comentario:string}[] = await resComentario.json();

    return(
        <PageLeyout>
            <Container center>
                <CoretorUrlProduto id={id} nome={produto} nomeCorreto={produtoRes.nome} />
                <ProdutoLeyout>
                    <ProdutoDetalhes comentarios={comentarioRes} produto={produtoRes} />
                </ProdutoLeyout>
                {/* <GradeProduto filter={false} produtos={[produtoRes]} /> */}
            </Container>
        </PageLeyout>
    )
}
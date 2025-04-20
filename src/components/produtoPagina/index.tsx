import { Produto } from '@/module/produtoApi';
import styles from "./produtoDetalhes.module.css"
import ProdutoImagens from "./produtoImagens"
import ProdutoInfo from "./produtoInfo"
import ProdutoOpcoes from "./produtoOpcoes"
import ProdutoDescricao from "./produtoDescricao"
import ProdutoTabela from "./produtoTabela"
import ProdutoAvaliacao from "./produtoAvaliacao"

export default function ProdutoPagina(
    { 
        comentarios,
        produto 
    } : 
    { 
        comentarios: {usuario: string, comentario:string}[], 
        produto: Produto 
    }) {
    return (
        <>
            <div className={styles.produto}>
                <ProdutoImagens imagens={produto.imagens.split(",")} />
                <ProdutoInfo produto={produto} />
                <ProdutoOpcoes produto={produto} />
            </div>
            <div className={styles.produto}>
                <ProdutoDescricao descricao={produto.descricao} />
            </div>
            <div className={styles.produto}>
                <ProdutoTabela />
            </div>
            <ProdutoAvaliacao comentarios={comentarios} />
        </>
    )
}
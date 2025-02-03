import { Produto } from '@/module/produtoApi';
import styles from "./produtoInfo.module.css"

export default function ProdutoInfo({ produto }: { produto: Produto }) {
    return (
        <div className={styles.produtoDetalhes}>
            <h1 className={styles.nome}>{produto.nome}</h1>
            <div className={styles.info}>
                <p className={styles.detalhe__conteudo} ><span className={styles.detalhe__label}>Cor: </span>Colorido</p>
                <p className={styles.detalhe__conteudo} ><span className={styles.detalhe__label}>Tamanho: </span>Variado</p>
                <p className={styles.detalhe__conteudo} ><span className={styles.detalhe__label}>Tecido: </span>Cetim</p>
            </div>
        </div>
    )
}
"use client"

import Image from "next/image";
import styles from "./produto.module.css"
import type ProdutoCarrinho from "@/module/produto/produtoCarrinho";
import ActionButton from "./actionButton";
import useCarrinhoContext from "@/hooks/useCarrinhoContext";
import Link from "next/link";

export default function ProdutoCarrinhoComponent({produto}:{produto: ProdutoCarrinho}){
    
    const { 
        adicionarQuantidadeCarrinho, 
        excluiProdutoCarrinho, 
        removeUmProdutoCarrinho, 
        editaQuantidadeProdutoCarrinho
     } = useCarrinhoContext();

    return(
            <div className={styles.sacola}>
                <Image
                    className={styles.imagem}
                    src={produto.imagens[0]}
                    alt={produto.nome}
                    width={90}
                    height={90} 
                />
                <div className={styles.infoContainer}>
                    <div className={styles.info}>
                        <h2 className={styles.info__nome}>{produto.nome}</h2>
                        <div className={styles.acoes}>
                            <button onClick={() => excluiProdutoCarrinho(produto)}>Excluir</button>
                            <button>Salvar</button>
                            <Link className={styles.link} href={"/comprar"}>Comprar agora</Link>
                        </div>
                    </div>
                    <div className={styles.quantidade}>
                        <ActionButton minus action={() => removeUmProdutoCarrinho(produto)} />
                        <input 
                            className={styles.quantidade__valor} 
                            value={produto.quantidade} 
                            onChange={(e) => (editaQuantidadeProdutoCarrinho(produto, Number(e.target.value))) }
                        />
                        <ActionButton plus action={() => adicionarQuantidadeCarrinho(produto)} />
                    </div>
                </div>
                <p className={styles.preco} >{produto.preco.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL"
                })}</p>
            </div>
    )
}
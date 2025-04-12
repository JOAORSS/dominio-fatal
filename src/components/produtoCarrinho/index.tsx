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

    const imagens = produto.imagens.split(",");

    return(
            <div className={styles.sacola}>
                <Image
                    className={styles.imagem}
                    src={imagens[0]}
                    alt={produto.nome}
                    width={90}
                    height={90} 
                />
                <div className={styles.infoContainer}>
                    <div className={styles.info}>
                        <div style={{display: "flex", alignItems: "center", flexDirection: "row", gap: "10px"}}>
                            <h2 className={styles.info__nome}>{produto.nome}</h2>
                            {produto.mais_cores && <span 
                                className={styles.corPop} 
                                style={{backgroundColor: produto.cores.find(cor => cor.cor === produto.cor)?.hex}} 
                            />}
                            <span className={styles.tamanho} >{produto.tamanho}</span>
                        </div>

                        <div className={styles.acoes}>
                            <button onClick={() => excluiProdutoCarrinho(produto, produto.cor, produto.tamanho)}>Excluir</button>
                            <button>Salvar</button>
                            <Link className={styles.link} href={"/comprar"}>Comprar agora</Link>
                        </div>
                    </div>
                    <div className={styles.quantidade}>
                        <ActionButton minus action={() => removeUmProdutoCarrinho(produto, produto.cor, produto.tamanho)} />
                        <input 
                            className={styles.quantidade__valor} 
                            value={produto.quantidade} 
                            onChange={(e) => (editaQuantidadeProdutoCarrinho(produto, Number(e.target.value), produto.cor, produto.tamanho)) }
                        />
                        <ActionButton plus action={() => adicionarQuantidadeCarrinho(produto, produto.cor, produto.tamanho)} />
                    </div>
                </div>
                <p className={styles.preco} >{produto.preco.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL"
                })}</p>
            </div>
    )
}
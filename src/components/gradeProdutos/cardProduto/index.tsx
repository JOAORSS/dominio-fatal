"use client"

import Image from "next/image"
import styles from "./cardProduto.module.css"
import Produto from "@/module/produto"
import Button from "@/components/button";
import { corrigeUrlProduto } from "@/utils/coretorUrlProduto";
import Link from "next/link";

interface CardProdutoProps {
    produto: Produto;
    active?: boolean;
}

export default function CardProduto({ produto }: CardProdutoProps) {
    
    return(
        <Link href={`/produtos/${produto.id}/${corrigeUrlProduto(produto.nome)}`}
            className={styles.cardProduto}
        >
            <Image 
                className={styles.imagem}
                src={produto.imagens[0]} 
                width={600} 
                height={600} 
                alt="Produto"
            />
                <h2 className={styles.nome} >{produto.nome}</h2>
                {produto.maisCores && 
                    <span className={styles.maisCores} >
                        <Image 
                            src={"/images/amostra.svg"}
                            alt="o produto possui mais cores"
                            width={25}
                            height={25}
                        />
                    <p className={styles.maisCores__legenda}>Disponivel em mais cores</p>
                    </span>
                }
                <span className={styles.preco} >
                    {produto.preco.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                </span>
                <Button
                    type="outline"
                >Ver os detalhes
                </Button>
        </Link>
    )
}
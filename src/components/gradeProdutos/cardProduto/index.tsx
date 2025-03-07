"use client"

import Image from "next/image"
import styles from "./cardProduto.module.css"
import Produto from "@/module/produto"
import Button from "@/components/button";
import { corrigeUrlProduto } from "@/utils/coretorUrlProduto";
import Link from "next/link";
import { useState } from "react";

interface CardProdutoProps {
    produto: Produto;
    active?: boolean;
}

export default function CardProduto({ produto }: CardProdutoProps) {

    const imagens = produto.imagens.split(",");

    const [hover, setHover] = useState(false);
    
    return(
        <Link 
            href={`/produtos/${produto.id}/${corrigeUrlProduto(produto.nome)}`}
            className={styles.cardProduto}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div style={{position: "relative", width: "100%", height: "100%"}} >
                <Image 
                    className={styles.imagem}
                    src={imagens[0]} 
                    width={600} 
                    height={600} 
                    alt="Produto"
                />
                {produto.mais_cores && 
                    <span 
                        className={styles.maisCores}
                        style={{position: "absolute", bottom: 0, left: 0, animation: (hover ? "mais 500ms" : "")}}
                    >
                        <Image 
                            src={"/images/amostra.svg"}
                            alt="o produto possui mais cores"
                            width={25}
                            height={25}
                        />
                        {hover && <p className={styles.maisCores__legenda}>Disponivel em mais cores</p>}
                    </span>
                }
            </div>
            <h2 className={styles.nome} >{produto.nome}</h2>
            <span className={styles.preco} >
                {produto.preco.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
            </span>
            <Button type="outline">
                Ver os detalhes
            </Button>
        </Link>
    )
}
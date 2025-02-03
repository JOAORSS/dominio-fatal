"use client"

import Image from "next/image"
import styles from "./cardProduto.module.css"
import Produto from "@/module/produto"
import Button from "@/components/button";
import { useState } from "react";
import { corrigeUrlProduto } from "@/utils/coretorUrlProduto";
import { useRouter } from "next/navigation";

interface CardProdutoProps {
    produto: Produto;
    active?: boolean;
}

export default function CardProduto({ produto }: CardProdutoProps) {
    const [active, setActive] = useState(false);
    const router = useRouter();
    

    function handleMouseEnter() {
        setActive(true);
    }

    function handleMouseLeave() {
        setActive(false);
    }


    return(
        <div 
            className={styles.cardProduto}
            onClick={() => router.push(`/produtos/${produto.id}/${corrigeUrlProduto(produto.nome)}`)}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()} 
            style={active ? {borderRadius: "6px", outline: "4px solid var(--cor-primaria)", gap: "0px", height: "380.6px", transition: "500ms"} : {transition: "10ms"}} 
        >
            <Image 
                className={styles.imagem}
                src={produto.imagens[0]} 
                width={600} 
                height={600} 
                alt="Produto"
                style={active ? {height: "100%", transition: "500ms"} : {}} 
            />
                {!active && <h2 className={styles.nome} >{produto.nome}</h2>}
                {produto.maisCores && 
                    <span className={styles.maisCores} >
                        { !active 
                        &&<Image 
                            src={"/images/amostra.svg"}
                            alt="o produto possui mais cores"
                            width={25}
                            height={25}
                        />}
                    {!active && <p className={styles.maisCores__legenda}>Disponivel em mais cores</p>}
                    </span>
                }
                {!active && <span className={styles.preco} >
                    {produto.preco.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                </span>
                }
            {active 
                ? <Button
                 link={`/produtos/${produto.id}/${corrigeUrlProduto(produto.nome)}`} 
                 type="full"
                >Ver os detalhes
                </Button> 
                : <Button
                    link={`/produtos/${produto.id}/${corrigeUrlProduto(produto.nome)}`} 
                    type="outline"
                >Ver os detalhes
                </Button>}
        </div>
    )
}
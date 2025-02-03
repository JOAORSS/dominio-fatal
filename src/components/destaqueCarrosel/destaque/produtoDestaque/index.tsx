"use client"

import Image from "next/image";
import styles from "../destaque.module.css"
import Produto from "@/module/produto";
import Button from "@/components/button";
import PageMarker from "./PageMarker";
import useDestaqueContext from "@/hooks/useDestaqueContext";
import { corrigeUrlProduto } from "@/utils/coretorUrlProduto";

export default function ProdutoDestaque({ produto }: { produto: Produto }) {
    const { indexDestaque, setIndexDestaque } = useDestaqueContext();

    return(
        <div className={styles.produto__container}>
            <div className={styles.produto}>
                <Image className={styles.produto__imagem}
                    src={produto.imagens[0]}
                    alt={produto.nome}
                    width={1080}
                    height={1080}
                />
                <div className={styles.produto__info}>
                    <h2 className={styles.info__titulo}>{produto.nome}</h2>
                    {produto.maisCores && 
                        <span className={styles.produto__maisCores}>
                            <Image 
                                src={"/images/amostra.svg"}
                                alt="o produto possui mais cores"
                                width={40}
                                height={40}
                            />
                            <p className={styles.maisCores__legenda}>Disponivel em mais cores</p>
                        </span>}
                    <div className={styles.produto__preco}>
                        <span className={styles.preco__valor}>
                            {produto.preco.toLocaleString("pt-br", {
                                style: "currency", 
                                currency: "BRL"
                            })}
                        </span>
                        <Button 
                            maxWidht="300px"
                            type="full"
                            link={`/produtos/${produto.id}/${corrigeUrlProduto(produto.nome)}`} 
                        >Ver os detalhes
                        </Button>
                    </div>
                </div>
            </div>
            <nav className={styles.pages}>
                { [1, 2, 3, 4].map((page, i) => 
                    indexDestaque === i 
                    ? <PageMarker active onClick={()=>{}} key={i} /> 
                    : <PageMarker onClick={() => setIndexDestaque(i)} key={i} />
                )}
            </nav>
        </div>
    )
}
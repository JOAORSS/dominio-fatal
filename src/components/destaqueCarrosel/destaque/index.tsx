"use client"

import styles from "./destaque.module.css"
import Container from "../../container"
import Produto from "@/module/produto";
import SectionLabel from "../../sectionLabel";
import ProdutoDestaque from "./produtoDestaque";
import ArrowButton from "./arrowButton";

export default function Destaque({ produto }: { produto: Produto }) {

    const styleBackground = {
        background: `linear-gradient(131deg, rgba(235, 235, 235, 0.64) 50%, rgba(0, 0, 0, 0.64) 90%),
                    url(${produto.imagens?.[0] || ''}) lightgray 50% / cover no-repeat`, 
    }

    return(
        <div>
            <SectionLabel title="Produtos em estaques" />
            <section className={styles.destaque}>
                <div className={styles.imagem} style={styleBackground}/>
                <Container center>
                    <div className={styles.content}>
                        <ArrowButton left />
                        <ProdutoDestaque produto={produto} />
                        <ArrowButton right />
                    </div>
                </Container>
            </section>
        </div>
    )
}
"use client";

import Container from "@/components/container";
import styles from "./sacola.module.css";
import SectionLabel from "@/components/sectionLabel";
import ProdutoCarrinhoComponent from "@/components/produtoCarrinho";
import Button from "@/components/button";
import useCarrinhoContext from "@/hooks/useCarrinhoContext";
import ProdutoCarrinhoType from "@/module/produto/produtoCarrinho";
import { Fragment, JSX } from "react";


export default function SacolaWarper({ }) {
    const { carrinho } = useCarrinhoContext();
    return(
        <>
            <Sacola carrinho={carrinho} />
        </>
    )
}


function NotaProdutos(
    {
        produto, 
        carrinho 

    }: 
    { 
        produto: ProdutoCarrinhoType, 
        carrinho: ProdutoCarrinhoType[]
    }
): JSX.Element {
    return (
        <div>
            <p className={styles.produto__nome}>
                {produto.nome + " "}
                <span className={styles.produto__quantidade}>
                    ({produto.quantidade})
                </span>
            </p>
            {carrinho
                .filter((item) => item.id === produto.id)
                .map((item, index) => (
                    <p key={`detalhe-${index}`} className={styles.produto__detalhe}>
                        Cor: {item.cor}, Tamanho: {item.tamanho}
                    </p>
                ))}
        </div>
    );
}

function Sacola({ carrinho } : { carrinho: ProdutoCarrinhoType[] }) {

    return(
                <Container>
                    <div className={styles.sacolaPage}>
                        <section 
                            style={(carrinho.length == 0 ? {backgroundImage: "url(/images/vazioCarrinho.png)"}:{})} 
                            className={styles.sacola}
                        >
                            <SectionLabel title="Sacola de produtos" />
                            <div className={styles.content}>
                                <div className={styles.produtos}>
                                    {carrinho.map((produto, index) => (
                                        <Fragment key={`produto-${index}`}>
                                            <ProdutoCarrinhoComponent produto={produto} />
                                            {index+1 != carrinho.length &&
                                            <div key={`divisoria-${index}`} className={styles.divisoria} />}           
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </section>
                        <div className={styles.nota}>
                            <h2 className={styles.nota__titulo}>Todos os items</h2>
                            <div className={styles.items}>
                                {carrinho
                                    .filter((produto, index, self) => 
                                        index === self.findIndex((p) => p.id === produto.id))
                                    .map((produto, index) => (
                                        <NotaProdutos key={`nota-${index}`} produto={produto} carrinho={carrinho} />
                                ))}
                            </div>
                            <div className={styles.total}>
                                <span className={styles.total__grafia}>Total</span>
                                {<span className={styles.total__grafia} >{carrinho.reduce((acc, produto) => 
                                    acc + produto.preco * produto.quantidade, 0)
                                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>}
                            </div>
                            <Button type="outline" >Continuar a compra</Button>
                        </div>
                    </div>
                </Container>
    )
}
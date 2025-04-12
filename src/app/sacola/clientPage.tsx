"use client";

import Container from "@/components/container";
import styles from "./sacola.module.css";
import SectionLabel from "@/components/sectionLabel";
import ProdutoCarrinhoComponent from "@/components/produtoCarrinho";
import Button from "@/components/button";
import useCarrinhoContext from "@/hooks/useCarrinhoContext";
import ProdutoCarrinhoType from "@/module/produto/produtoCarrinho";
import { Fragment, JSX } from "react";
import useCheckoutContext from "@/hooks/useCheckoutContext";
import { useRouter } from "next/navigation";


// salavar o carrinho da pessoa no banco pra ela acessar quando quiser

export default function SacolaWarper() {
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
                    ({carrinho.filter((item) => item.id === produto.id).reduce((acc, item) => acc + item.quantidade, 0)})
                </span>
            </p>
            {carrinho
                .filter((item) => item.id === produto.id)
                .map((item, index) => (
                    <p key={`detalhe-${index}`} className={styles.produto__detalhe}>
                        {produto.mais_cores ? `Cor: ${item.cor}, ` : ""}Tamanho: {item.tamanho} ({item.quantidade})
                    </p>
                ))}
        </div>
    );
}

function Sacola({ carrinho } : { carrinho: ProdutoCarrinhoType[] }) {
    const { setCheckout } = useCheckoutContext();
    const router = useRouter()

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
                        <form 
                            style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'fit-content'}}
                            method="POST" 
                            action="/sacola/checkout" 
                            className={styles.nota}
                            onSubmit={(event) => {
                                event.preventDefault();
                                const checkout: {
                                    objeto_pagamento: {
                                        produto_id: number,
                                        nome: string,
                                        preco: number,
                                        quantidade: number
                                    }[],
                                    objeto_adm: {
                                        produto_id: number,
                                        cor_id: number,
                                        tamanho_id: number,
                                        quantidade: number
                                    }[]
                                } = {
                                    objeto_pagamento: carrinho.map((produto) => ({
                                        produto_id: produto.id,
                                        nome: produto.nome,
                                        preco: produto.preco * 100,
                                        quantidade: produto.quantidade,
                                    })),
                                    objeto_adm: carrinho.map((produto) => ({
                                        produto_id: produto.objeto_de_venda.produto_id,
                                        cor_id: produto.objeto_de_venda.cor_id,
                                        tamanho_id: produto.objeto_de_venda.tamanho_id,
                                        quantidade: produto.objeto_de_venda.quantidade,
                                    }))
                                };
                                setCheckout(checkout);
                                router.push("/sacola/checkout");
                            }
                        }
                        >
                            <div>
                                <h2 className={styles.nota__titulo}>Todos os items</h2>
                                <div className={styles.items}>
                                    {carrinho
                                        .filter((produto, index, self) => 
                                            index === self.findIndex((p) => p.id === produto.id))
                                        .map((produto, index) => (
                                            <NotaProdutos key={`nota-${index}`} produto={produto} carrinho={carrinho} />
                                    ))}
                                </div>
                            </div>
                            <div className={styles.total}>
                                <span className={styles.total__grafia}>Total</span>
                                {<span className={styles.total__grafia} >{carrinho.reduce((acc, produto) => 
                                    acc + Number(produto.preco) * produto.quantidade, 0)
                                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>}
                            </div>
                            {carrinho.length > 0 && <Button
                                type="outline" 
                            >
                                    Finalizar a compra
                            </Button>}
                        </form>
                    </div>
                </Container>
    )
}
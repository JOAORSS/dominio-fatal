"use client";

import Container from "@/components/container";
import styles from "./sacola.module.css";
import SectionLabel from "@/components/sectionLabel";
import ProdutoCarrinhoComponent from "@/components/produtoCarrinho";
import Button from "@/components/button";
import useCarrinhoContext from "@/hooks/useCarrinhoContext";
import ProdutoCarrinhoType from "@/module/produto/produtoCarrinho";
import { Fragment, JSX, useState } from "react";
import useCheckoutContext from "@/hooks/useCheckoutContext";
import { useRouter } from "next/navigation";
import Script from "next/script";
import axios from "axios";
import Warning from "@/components/produtoPagina/produtoOpcoes/warning";
import LoadingPage from "@/components/loading";


declare global {
    interface Window {
      PagSeguro?: {
          setUp: (config: { session: string; env: string }) => void;
          encryptCard: (params: { 
              publicKey: string; 
              holder: string; 
              number: string; 
              expMonth: string; 
              expYear: string; 
              securityCode: string; 
          }) => { 
              encryptedCard: string; 
              hasErrors: boolean; 
              errors?: string[] | undefined; 
          };
      };
    }
  }


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
                    ({carrinho.filter((item) => item.id === produto.id)
                        .reduce((acc, item) => acc + item.quantidade, 0)})
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
    const [warning, setWarning] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

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
                    onSubmit={async (event) => {
                        event.preventDefault();
                        setLoading(true);
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

                        const { data } = await axios.get("/api/checkout/createSession")
                        const { session }:{session:string, expires_at:number} = data;

                        if (!data.session) {
                            setWarning("Erro ao criar sessão, tente novamente mais tarde");
                            return;
                        }

                        if (typeof window !== 'undefined' && window.PagSeguro) {
                            window.PagSeguro.setUp({
                                session: session,
                                env: 'SANDBOX'
                            });
                            router.push("/sacola/checkout?session=" + session + "&expiresAt=" + data.expires_at);
                        } else {
                            setWarning("Erro ao criar sessão, tente novamente mais tarde");
                        }

                        setLoading(true);
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
            <Script src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js" />
            {warning && Warning({text: warning, close: () => setWarning("")})}
            {loading && <LoadingPage />}
        </Container>
    )
}
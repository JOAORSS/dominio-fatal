"use client"

import styles from "./checkoutPage.module.css";
import useCheckoutContext from "@/hooks/useCheckoutContext";
import { FaPix, FaCreditCard } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { useState } from "react";
import Button from "../button";
import CampoTexto from "../campoTexto";
import callFreteApi from "@/utils/callFreteApi";
import Frete from "@/module/frete";
import Warning from "../produtoPagina/produtoOpcoes/warning";
import axios from "axios";
import { useEffect } from "react";
import TokenExpired from "./tokenExpired";
import jwt from 'jsonwebtoken';
import { useSession } from "next-auth/react";
import { IoIosArrowBack } from "react-icons/io";


export default function 
CheckoutPage({ jwt }: { jwt: string }) {

    const [expired, setExpired] = useState<boolean>(false);

    const { data: session } = useSession();
    

        useEffect(() => {
            const verifyToken = () => {
            setExpired(isTokenExpired(jwt));
            };

            verifyToken();
            const intervalId = setInterval(verifyToken, 1801000);

            return () => clearInterval(intervalId);
        }, [jwt]);


        const { checkout } = useCheckoutContext();
        
        const [frete, setFrete] = useState<Frete[]>([]);
        const [cep, setCep] = useState<string>("");
        const [warning, setWarning] = useState<string | false>(false);
        const [cpf, setCpf] = useState<string>("");
        
        const [formaPagamento, setFormaPagamento] = useState<string | false>(false);
        const [freteOption, setFreteOption] = useState<{name: string, valor: number} | undefined>(undefined);

        const totalPagamento = Number((checkout.objeto_pagamento.reduce((acc, item) => acc + item.preco * item.quantidade, 0) / 100).toFixed(2));
    
        return(
            !expired ?
            <section className={styles.checkout}>
                <div>
                    <div className={styles.checkout__container}>
                        <h1>Forma de pagamento</h1>
                        <FormaDePagamento set={setFormaPagamento} tipo="pix" />
                        <FormaDePagamento set={setFormaPagamento} tipo="cartao" />
                        <FormaDePagamento set={setFormaPagamento} tipo="boleto" />
                    </div> 
                    <div style={{
                        display: "flex",
                        gap: "20px",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "start",
                        width: "100%",
                        marginTop: "40px"}}>
                        <div 
                            className={styles.checkout__container} 
                            style={{
                                justifyContent: "space-between", 
                                alignItems: "center", 
                                width: "100%",
                                width: "fit-content"}}
                                >
                            {frete.length == 0 && <h1 style={{alignSelf: "flex-start"}}>Calcular frete</h1>}
                            <div style={{
                                display: "flex", 
                                gap: "20px", 
                                alignItems: "center", 
                                flexDirection: "row", 
                                width: "100%", 
                                justifyContent: "space-between"}}
                                >
                                {frete.length == 0 &&
                                <div style={{
                                    display: "flex", 
                                    gap: "15px", 
                                    alignItems: "flex-start", 
                                    flexDirection: "column"}}
                                    >
                                    <span>Informe seu cep!</span>
                                    <div style={{display: "flex", gap: "15px", alignItems: "center", flexDirection: "column" }}>
                                        <CampoTexto required text={cep} onChange={setCep} type="masked" maxWidth="256px" />
                                        <Button 
                                            onClick={() => {
                                                const sanitizedCep = cep.replace("-", "");
                                                if (sanitizedCep.length === 8) {
                                                    callFreteApi(sanitizedCep, setFrete);
                                                } else {
                                                    setWarning("Confira se o cep possuí os 8 digitos");
                                                }
                                            }}
                                            maxWidht="256px"
                                            type="full"
                                        >
                                            Calcular
                                        </Button>
                                    </div>
                                </div>}
                                {frete.length > 0 && 
                                    <div style={{display: "flex", gap: "14px", alignItems: "center", flexDirection: "column"}}>
                                    <button style={{
                                        cursor: "pointer", 
                                        alignSelf: "start", 
                                        background: "none", 
                                        border: "none", 
                                        alignItems: "center", 
                                        display: "flex", 
                                        padding: "none",
                                        transform: "translateX(-20px)"
                                        }}
                                        onClick={() => {setFrete([]); setFreteOption(undefined); setCep(""); setFormaPagamento(false); setWarning(false);}}
                                        ><IoIosArrowBack size={32} fill="var(--cor-primaria)" />voltar</button>
                                    <h3 style={{margin: "0px"}}>Selecionar frete</h3>
                                    <button 
                                        className={styles.frete__option +" "+ styles.slideInRight}
                                        onClick={(e) => (setFreteOption({name: frete[0].name, valor: frete[0].price}), e.currentTarget.querySelector("input")!.click())}
                                    >
                                        <input type="radio" name="frete" />
                                        <div className={styles.frete__option__frete}>
                                            <span><b>{frete[0].name}</b></span>
                                            <span style={{fontSize: "1rem"}}><b>Preço:</b> R${frete[0].price}</span>
                                            <span style={{textAlign: "left"}}><b>Prazo:</b> De {frete[0].delivery_range.min} até {frete[0].delivery_range.max} dias</span>
                                        </div>
                                    </button>
                                    <button 
                                        className={styles.frete__option +" "+ styles.slideInRight}
                                        onClick={(e) => (setFreteOption({name: frete[1].name, valor: frete[1].price}), e.currentTarget.querySelector("input")!.click())}
                                    >
                                        <input type="radio" name="frete" />
                                        <div className={styles.frete__option__frete}>
                                        <span><b>{frete[1].name}</b></span>
                                            <span style={{fontSize: "1rem"}}><b>Preço:</b> R${frete[1].price}</span>
                                            <span style={{textAlign: "left"}} ><b>Prazo:</b> De {frete[1].delivery_range.min} até {frete[1].delivery_range.max} dias</span>
                                        </div>
                                    </button>
                                    </div>}
                            </div>
                        </div>
                        <div
                            className={styles.checkout__container}
                            style={{width: "300px", alignItems: "start", gap: "10px", paddingBottom: "25px" , display: "flex", flexDirection: "column"}}
                        >
                            <h3 style={{margin: "0"}}>Informe o seu cpf:</h3>
                            <CampoTexto text={cpf} number onChange={setCpf} />
                            <Button type="outline" >Validar</Button>
                        </div>
                    </div>
                </div>
                <div style={{ 
                        width: "35%", 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        gap: "40px" 
                    }}>               
                    <div 
                        className={styles.checkout__container}
                        style={{width: "300px", alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center"}}
                    >
                        <h2>Resumo da compra:</h2>
                        <div className={styles.checkout__nota}>
                            <span>Produtos:</span>
                            <span className={styles.valorTotal}>{totalPagamento.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                        </div>
                        <div className={styles.checkout__nota +" "+ styles.checkout__nota__frete}>
                            <div className={styles.checkout__nota}>
                                <span>Frete:</span>
                                <span className={styles.valorTotal}>{(freteOption ? Number(freteOption.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ ----")}</span>
                            </div>
                        </div>
                        <span />
                        <div className={styles.checkout__nota} >
                            <span><b>Total:</b></span>
                            <span className={styles.valorTotal}><b>{soma(Number(totalPagamento), Number((freteOption ? freteOption.valor : 0))).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b></span>
                        </div>
                    </div>
                    <Button 
                        type="full" 
                        disabled={!formaPagamento || cpf.length < 8 || !freteOption?.valor}
                        onClick={async () => {

                            if (!formaPagamento) {
                                setWarning("Selecione uma forma de pagamento");
                                return;
                            }

                            if (!freteOption?.valor) {
                                setWarning("Selecione um frete");
                                return;
                            }

                            if (!cpf) {
                                setWarning("Informe o seu cpf");
                                return;
                            }

                            const body: {
                                jwt: string;
                                cpf: string;
                                email: string | undefined;
                                amount: number;
                                items: { reference_id: number; name: string; quantity: number; unit_amount: number }[];
                                numeroCartao?: string;
                            } = {
                                jwt: jwt,
                                cpf: cpf,
                                email: session?.user?.email,
                                amount: Number(soma(Number(totalPagamento), Number(freteOption.valor)) * 100),
                                items: checkout.objeto_pagamento.map(item => ({
                                    reference_id: item.produto_id,
                                    name: item.nome,
                                    quantity: item.quantidade,
                                    unit_amount: item.preco
                                })),
                            }

                            const headersData = {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                }
                            }

                            if (formaPagamento === "pix") {

                            }

                            if (formaPagamento === "cartao") {
                                body["numeroCartao"] = "4111111111111"
                            }
                            
                            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_DOMINIO}/api/checkout/${formaPagamento}`, 
                                body,
                                headersData
                            )

                                console.log(data); // aqui fazer a resposota do pagamento
                            
                        }
                    }>
                        Finalizar compra
                    </Button>
                </div>
                {warning && <Warning close={() => setWarning(false)} text={warning} key={warning} />}
            </section>
            : <TokenExpired />
        )
}


function soma(a: number, b: number):number {
    return a + b;
}


function FormaDePagamento({ tipo, set } : { tipo: "pix" | "cartao" | "boleto", set: (tipo:string) => void }) {    
    return(
        <button 
            onClick={(e) => {e.currentTarget.querySelector("input")!.click(); set(tipo)}}
            type="button"
            className={styles.configBox}
        >
            <input type="radio" name="forma_pagamento" style={{backgroundColor: "var(--cor-primaria)"}} />
            <div className={styles.configBoxContent}>
                {tipo === "pix" && <FaPix size={32} color="var(--cor-primaria)" />}
                {tipo === "cartao" && <FaCreditCard size={32} color="var(--cor-primaria)" />}
                {tipo === "boleto" && <BsBank2 size={32} color="var(--cor-primaria)" />}
                <div className={styles.textoBox}>
                    <h3 className={styles.titulo}>{tipo}</h3>
                    <p>
                        {tipo === "pix" && "Pague com Pix, aprovado em minutos!"}
                        {tipo === "cartao" && "Pague com Cartão"}
                        {tipo === "boleto" && "Pague com Boleto"}
                    </p>
                </div>
            </div>
        </button>
    )
}



export function isTokenExpired(token: string) {
    try {
        const decoded = jwt.decode(token);
        if (decoded && 
            (decoded as jwt.JwtPayload).exp! < Date.now() / 1000) {
            return true;
        }
        return false;
    } catch (e) {
        console.error(e);
        return true;
    }
}
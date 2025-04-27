"use client"

import Warning from "../produtoPagina/produtoOpcoes/warning";
import useCheckoutContext from "@/hooks/useCheckoutContext";
import { CartaoType } from "@/services/supabase/card/selectCard";
import { FaPix, FaCreditCard } from "react-icons/fa6";
import callFreteApi from "@/utils/callFreteApi";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./checkoutPage.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TokenExpired from "./tokenExpired";
import { BsBank2 } from "react-icons/bs";
import CampoTexto from "../campoTexto";
import Frete from "@/module/frete";
import Button from "../button";
import Image from "next/image";
import axios from "axios";
import CampoSelect from "../campoTexto/campoSelect";
import WarperModalButton from "../perfilPagina/perfil/cartao/warperCartaoButton";
import { useSearchParams } from "next/navigation";
import { randomBytes } from "crypto";


export default function CheckoutPage({ cartoesData }: { cartoesData: CartaoType[] }) {
    
    const { data: session } = useSession();
    const email = session?.user?.email;
    const searchParams = useSearchParams();

    const { checkout } = useCheckoutContext();

    const [expired, setExpired] = useState<boolean>(false);  
    const [expiresAt, setExpiresAt] = useState<number>();
    const [sessionId, setSessionId] = useState<string>("");
    const [frete, setFrete] = useState<Frete[]>([]);
    const [cep, setCep] = useState<string>("");
    const [warning, setWarning] = useState<string | false>(false);
    const [cpf, setCpf] = useState<string>("");
    const [formaPagamento, setFormaPagamento] = useState<string | false>(false);
    const [freteOption, setFreteOption] = useState<{name: string, valor: number} | undefined>(undefined);
    const [cartaoSelecionado, setCartaoSelecionado] = useState<{ultimos_digitos:string, tipo: "DEBIT_CARD" | "CREDIT_CARD"}>();
    const [parecelas, setParecelas] = useState<string>("1");

    useEffect(() => {
        const sessionFromUrl = searchParams.get("session") as string | undefined;
        const expiresAtFromUrl = searchParams.get("expiresAt") as string | undefined;

        if (sessionFromUrl && expiresAtFromUrl) {
        if (Number(expiresAtFromUrl) < Date.now()) {
            setExpired(true);
        }

        setExpiresAt(Number(expiresAtFromUrl));
        setSessionId(sessionFromUrl);

        } else {
        setExpired(true);
        }
    }, [searchParams]);


    useEffect(() => {
        if (expiresAt !== undefined) {
            const agora = Date.now();
            const tempoRestante = expiresAt - agora;

            if (tempoRestante <= 0) {
            setExpired(true);
            return;
            }

            const timeout = setTimeout(() => {
            setExpired(true);
            }, tempoRestante);
        
            return () => clearTimeout(timeout);
        }
    }, [expiresAt]);

        const totalPagamento = Number((checkout.objeto_pagamento.reduce((acc, item) => acc + item.preco * item.quantidade, 0) / 100).toFixed(2));        

        return(
            !expired ?
            <section className={styles.checkout}>
                <div>
                    <div className={styles.checkout__container}>
                        <h1>Forma de pagamento</h1>
                        <FormaDePagamento set={setFormaPagamento} tipo="pix" />
                        <FormaDePagamento set={setFormaPagamento} tipo="boleto" />
                        <div style={{width: "100%"}} >
                            <FormaDePagamento set={setFormaPagamento} tipo="cartao" />
                            {formaPagamento == "cartao" && 
                                cartoesData &&
                                cartoesData.length > 0 &&
                            <div className={styles.card__container}>
                                {cartoesData.map((cartao, index) => (
                                    <button 
                                        key={"card-key-"+index}
                                        type="button"
                                        style={{outline: cartaoSelecionado?.ultimos_digitos	 == cartao.ultimos_digitos ? "2px solid var(--cor-primaria)" : ""}}
                                        className={styles.configBox + " " + 
                                            styles.configBoxCartao +" "+ 
                                            (!cartaoSelecionado?.ultimos_digitos && 
                                                cartaoSelecionado?.ultimos_digitos != cartao.ultimos_digitos && 
                                                    styles.configBoxCartaoTransparente) + " " +
                                            (cartaoSelecionado?.ultimos_digitos == cartao.ultimos_digitos ? 
                                                styles.configBoxCartaoSelecionado : "")
                                            }
                                        onClick={() => {setCartaoSelecionado({
                                            ultimos_digitos: cartao.ultimos_digitos,
                                            tipo: cartao.tipo
                                        })}}
                                    >
                                        <Image 
                                            src={`/images/cartoes/${cartao.bandeira.toLowerCase()}.png`}
                                            className={styles.cartaoImage}
                                            alt="cartao"
                                            width={40}
                                            height={40}
                                            color="var(--cor-primaria)" 
                                        />
                                        <div className={styles.textoBox}>
                                            <h3 className={styles.titulo}>{cartao.nome_cartao}</h3>
                                            <p>
                                                ✱✱✱✱ ✱✱✱✱ ✱✱✱✱ <b>{cartao.ultimos_digitos.toString().slice(-4)}</b>
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>}
                            {cartoesData.length == 0 && <div className={styles.card__container} >
                                <WarperModalButton email={email!} />                             
                            </div>}
                        </div>
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
                                    <button 
                                        style={{
                                            cursor: "pointer", 
                                            alignSelf: "start", 
                                            background: "none", 
                                            border: "none", 
                                            alignItems: "center", 
                                            display: "flex", 
                                            padding: "none",
                                            transform: "translateX(-20px)"
                                        }}
                                        onClick={() => {setFrete([]); setFreteOption(undefined); setCep(""); setWarning(false);}}
                                        ><IoIosArrowBack size={32} fill="var(--cor-primaria)" />voltar</button>
                                        <h3 style={{margin: "0px"}}>Selecionar frete</h3>
                                        <div style={{display: "flex", gap: "20px", flexDirection: "row", alignItems: "center"}}>
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
                                            <button 
                                                className={styles.frete__option +" "+ styles.slideInRight}
                                                onClick={(e) => (setFreteOption({name: frete[1].name, valor: frete[1].price}), e.currentTarget.querySelector("input")!.click())}
                                            >
                                                <input type="radio" name="frete" />
                                                <div className={styles.frete__option__frete} title="Nós vamos até você! Um tipo de frete mais barata se você mora perto da região! (Guaporé e arredores)">
                                                <span><b>Vamos até você</b></span>
                                                    <span style={{fontSize: "1rem"}}><b>Preço:</b> R${frete[1].price}</span>
                                                    <span style={{textAlign: "left"}} ><b>Prazo:</b> De {frete[1].delivery_range.min} até {frete[1].delivery_range.max} dias</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>}
                            </div>
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
                        {formaPagamento == "cartao" && 
                            freteOption?.valor &&
                            cartaoSelecionado && 
                            cartaoSelecionado.tipo == "CREDIT_CARD" &&
                            <div className={styles.checkout__nota +" "+ styles.checkout__nota__frete}>
                                
                                    <CampoSelect 
                                    // da pra conslutar as parcelas por https://sandbox.api.pagseguro.com/charges/fees/calculate?payment_methods=CREDIT_CARD&value=8760&max_installments=6&max_installments_no_interest=4&credit_card_bin=554473&show_seller_fees=true
                                        onChange={setParecelas}
                                        selected={parecelas}
                                        required
                                        options={Array.from({ length: 6 }, (_, i) => ({
                                            label: `Em ${i + 1}x de ${((totalPagamento + (freteOption ? Number(freteOption.valor) : 0)) / (i + 1)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
                                            value: `${i + 1}`
                                        }))}
                                    />
                                
                        </div>}
                        <span />
                        <div className={styles.checkout__nota} >
                            <span><b>Total:</b></span>
                            <span className={styles.valorTotal}><b>{(totalPagamento + (freteOption ? Number(freteOption.valor) : 0)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b></span>
                        </div>
                    </div>
                    <div
                            className={styles.checkout__container}
                            style={{width: "300px", alignItems: "start", gap: "10px", paddingBottom: "25px" , display: "flex", flexDirection: "column"}}
                        >
                        <h3 style={{margin: "0"}}>Informe o seu cpf:</h3>
                        <CampoTexto text={cpf} number placeholder="000.000.000-00" onChange={setCpf} />
                    </div>
                    <Button 
                        type="full" 
                        disabled={!formaPagamento || cpf.length < 8 || !freteOption?.valor || checkout.objeto_pagamento.length == 0}
                        onClick={async () => handleSubmit()}
                        >
                        Finalizar compra
                    </Button>                        
                </div>
                {warning && <Warning close={() => setWarning(false)} text={warning} key={warning} />}
            </section>
            : <TokenExpired message="Sessão expirada, tente novamente" />
        )

        function FormaDePagamento({ tipo, set } : { tipo: "pix" | "cartao" | "boleto", set: (tipo:string) => void }) {    
            return(
                <>
                <button 
                    type="button" 
                    className={styles.configBox} 
                    onClick={() => set(tipo)}
                    style={{outline: formaPagamento == tipo ? "2px solid var(--cor-primaria)" : "none"}}
                    >
                    <div style={{
                        width: "8px",
                        height: "8px",
                        padding: "2px",
                        borderRadius: "12px",
                        border: "2px solid var(--background-interno)",
                        background: formaPagamento === tipo ? "var(--cor-primaria)" : "var(--background-interno)",
                        outline: "2px solid var(--cor-primaria)",
                        }} />
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
                </>
            )
        }
        async function handleSubmit() {

            if (checkout.objeto_pagamento.length == 0) {
                setWarning("Nenhum produto na compra");
                return;
            }

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

            if (!sessionId) {
                setWarning("Erro ao continuar, tente novamente mais tarde");
                return;
            }
        
            const body: {
                expiresAt: number;
                cpf: string;
                email: string | undefined;
                amount: number;
                items: { reference_id: number; name: string; quantity: number; unit_amount: number }[];
                numeroCartao?: string;
                parcelas?: string;
            } = {
                expiresAt: expiresAt!,
                cpf: cpf.replace(/\D/g, ''),
                email: session?.user?.email,
                amount: (Number(Number(totalPagamento) + Number(freteOption.valor)) * 100),
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
                if (!cartaoSelecionado) {
                    setWarning("Selecione um cartão");
                    return;
                }
        
                body.numeroCartao = cartaoSelecionado.ultimos_digitos;
                body.parcelas = parecelas;
        
            }
            
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_DOMINIO}/api/checkout/${formaPagamento}`, 
                body,
                headersData
            )
        
                console.log("teste"); // aqui fazer a resposota do pagamento
            
        }        
}

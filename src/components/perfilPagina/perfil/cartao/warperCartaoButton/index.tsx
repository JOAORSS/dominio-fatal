"use client"

import { IoIosAddCircle, IoIosClose } from "react-icons/io"
import styles from "./modalCartao.module.css"
import { useEffect, useState } from "react"
import LoadingPage from "@/components/loading";
import Button from "@/components/button";
import CampoTexto from "@/components/campoTexto";
import Warning from "@/components/produtoPagina/produtoOpcoes/warning";
import validarCartao from "@/utils/creditCardValidation";
import mascaraNumeroCartao, { mascaraNumeroPaste } from "@/utils/mascaras/numeros";
import verificaBandeiraCartao from "@/utils/verificaBandeiraCartao";
import { FaCreditCard, FaRegCreditCard } from "react-icons/fa6";
import insertCartao from "@/services/supabase/card/insertCard";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { encryptObject } from "@/utils/encriptCard";

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
export default function WarperModalButton({email} : {email: string}) {

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [warning, setWarning] = useState<string>("");

    return(
        <>
            <button 
                onClick={() => setOpen(true)}
                className={styles.infoBox +" "+ styles.adicionar}
                style={{marginLeft: "20px", marginTop: "10px"}}
            >
                <IoIosAddCircle size={50} color="var(--detalhes)" />
                <div className={styles.perfilInfo}>
                    <h3 
                        className={styles.nome} 
                        style={{color: "var(--detalhes)"}}
                    >Adicionar Cartão
                    </h3>
                </div>
            </button>
            {open && <ModalCartao open={open} email={email} setOpen={setOpen} setLoading={setLoading} setWarning={setWarning} />}
            {open && <div className="blackout" />}
            {warning && <Warning close={() => setWarning("")} text={warning} key={warning} />}
            {loading && <LoadingPage />}
        </>
    )

}

function ModalCartao(
    {
        open = true, 
        email,
        setOpen, 
        setWarning,
        setLoading,
    } : 
    {
        open: boolean, 
        email: string
        setOpen: (open: boolean) => void, 
        setWarning: (warning: string) => void,
        setLoading: (loading: boolean) => void,
    }) {

    const router = useRouter();
    
    async function handleSubmit(nome:string, cvv:string, numero:string, vencimento:string) {
        setLoading(true)
        if (nome.length > 2) {
            if (cvv.length == 3) {
                if (vencimento.length == 5) {
                    const mes = Number(vencimento.slice(0, 2));
                    const ano = Number(vencimento.slice(3, 5));
                    const dataAtual = new Date();
                    const mesAtual = dataAtual.getMonth() + 1;
                    const anoAtual = dataAtual.getFullYear() % 100;

                    if (ano < anoAtual || (ano == anoAtual && mes < mesAtual)) {
                        setWarning("Data de validade inválida")
                        setLoading(false)
                        return
                    }

                    if (validarCartao(numero)) {
                        const bandeira = verificaBandeiraCartao(numero);

                        const encryptedCard = encryptObject({
                            name: nome,
                            number: numero.replace(/\D/g, ''),
                            securityCode: cvv,
                            expMonth: mes.toString(),
                            expYear: `20${ano.toString()}`,
                        }, "teste") // adicionar o salt real

                        // if (typeof window !== 'undefined' && window.PagSeguro) {
                        //     const card = window.PagSeguro.encryptCard({
                        //       publicKey: process.env.NEXT_PUBLIC_PAGBANK_CHAVE_PUBLICA!,
                        //       holder: nome,
                        //       number: numero.replace(/\D/g, ''),
                        //       expMonth: mes.toString(),
                        //       expYear: `20${ano.toString()}`,
                        //       securityCode: cvv
                        //     })

                        console.log(encryptedCard);
                        
                        // const resp = await insertCartao({
                        //     nome: nome,
                        //     encrypted: encryptedCard,
                        //     numero: numero.slice(-4),
                        //     tipo: cardType,
                        //     bandeira: bandeira,
                        //     email: email,
                        // });

                        if (resp.operation == true) {
                            setOpen(false)
                            setWarning(resp.hint);
                            router.refresh();
                        } else {
                            setWarning(resp.hint);
                        };

                        setLoading(false)
                    } else {
                        setWarning("Numero do cartão inconsistente");
                    }

                } else {
                    setWarning("Data de validade inválida")
                }
            } else {
                setWarning("O código de segurança precisa ter 3 números");
            }
        } else {
            setWarning("Nome muito curto")
        }
        setLoading(false)
    } 

    const [nome, setNome] = useState<string>(""); 
    const [cvv, setCvv] = useState<string>(""); 
    const [numero, setNumero] = useState<string>("");
    const [vencimento, setVencimento] = useState<string>("");
    const [cardType, setCardType] = useState<string>("");

    const [mouseOverCard, setMouseOverCard] = useState<number>(0);

    useEffect(() => {
        mascaraNumeroCartao(numero, setNumero)
    }, [numero, setNumero])

    useEffect(() => {
        if (cvv.length > 3) {
            setCvv(cvv.slice(0, 3));
        }
    }, [cvv, setCvv])

    useEffect(() => {
        if (vencimento.length > 5) {
            setVencimento(vencimento.slice(0, 5));
        }

        if (vencimento.length == 3) {
            if (vencimento.charAt(2) != "/") {
                const formatedText = vencimento.slice(0, 2)
                    .concat("/")
                    .concat(vencimento.charAt(2));
                setVencimento(formatedText);
            }
        }
    }, [vencimento, setVencimento]);

    return(
        <dialog 
            className={styles.modalForm} 
            open={!!open}
            style={{transform: (cardType ? `translateY(100%)` : `translateY(150%)`)}}
            >
            <h2>Adicionar cartão</h2>

            { cardType.length == 0 &&
                <div className={styles.cardType}>
                    <button
                        onMouseEnter={() =>setMouseOverCard(1)}
                        onMouseLeave={() => setMouseOverCard(0)}
                        className={styles.cartao}
                        onClick={() => {setCardType("DEBIT_CARD")
                        }}>
                            <FaRegCreditCard 
                                color={mouseOverCard == 1 
                                    ? "var(--cor-primaria)" 
                                    : "var(--detalhes)" } 
                                size={46} 
                                className={styles.cartaoCard} />
                            <h3 
                                style={
                                    { color: (mouseOverCard == 1 
                                        ? "var(--cor-primaria)" 
                                        : "var(--detalhes)") }} 
                                className={styles.cartaoTexto}>
                            Cartão de débito</h3>
                    </button>
                    <button
                        onMouseEnter={() =>setMouseOverCard(2)}
                        onMouseLeave={() => setMouseOverCard(0)}
                        className={styles.cartao}
                        onClick={() => {setCardType("CREDIT_CARD")
                        }}>
                            <FaCreditCard color={mouseOverCard == 2 ? "var(--cor-primaria)" : "var(--detalhes)" } size={46} className={styles.cartaoCard} />
                            <h3 style={{ color: (mouseOverCard == 2 ? "var(--cor-primaria)" : "var(--detalhes)") }} className={styles.cartaoTexto}>Cartão de crédito</h3>
                    </button>
                </ div>}

            { cardType.length !== 0 && 
            <>
            <form 
                method="get" 
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true)
                    handleSubmit(nome, cvv, numero, vencimento);
                }}
            >
                <div>
                    <label>Nome</label>
                    <CampoTexto 
                        required
                        placeholder="Nome exemplo"
                        validation={() => nome.length < 2}
                        onChange={setNome}
                        text={nome}
                        maxWidth="224px"
                    />  
                </div>
                <div>
                    <label>Número do cartão</label>           
                    <CampoTexto 
                        validation={() => numero.length < 18}
                        required
                        onPaste={(e) => {
                            e.preventDefault();
                            const retornoPaste = mascaraNumeroPaste(setNumero, e.clipboardData.getData("text"));
                            if (retornoPaste.length > 19) setNumero(retornoPaste.slice(0, 19));
                        }}
                        onChange={setNumero}
                        text={numero}
                        placeholder="0000-0000-0000-0000"
                        maxWidth="224px"
                    />     
                </div>
                <div>
                    <label>CVV</label>           
                    <CampoTexto 
                        required
                        validation={() => cvv.length !== 3}
                        placeholder="000"
                        onChange={setCvv}
                        onPaste={(e) => {
                            e.preventDefault();
                            const retornoPaste = e.clipboardData.getData("text");
                            if (retornoPaste.length > 3) setCvv(retornoPaste.slice(0, 3));
                        }
                        }
                        text={cvv}
                        maxWidth="224px"
                    />     
                </div>
                <div>
                    <label>Data validade</label>           
                    <CampoTexto 
                        required
                        validation={() => vencimento.length !== 5}
                        placeholder="mm/aa"
                        onChange={setVencimento}
                        onPaste={(e) => {
                            e.preventDefault();
                            const retornoPaste = e.clipboardData.getData("text").split("");
                            retornoPaste.splice(2, 0, "/");
                            setVencimento(retornoPaste.slice(0, 5).join(""));
                        }}
                        text={vencimento}
                        maxWidth="224px"
                    />     
                </div>
                <Button maxWidht="300px" type="full" >Adicionar</Button>
            </form>
            </>
            }

            <form method="dialog" onSubmit={() => setOpen(false)}>
                <button className={styles.close} type="submit">
                    <IoIosClose color="var(--cor-primaria)" size={50} />
                </button>
            </form>
            <Script src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js" />
        </dialog>
    )
}


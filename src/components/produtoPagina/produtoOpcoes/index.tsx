"use client"

import { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { consolidarCores } from "@/utils/consolidarCores";
import { Produto } from '@/module/produtoApi';
import Frete from "@/module/frete";
import callFreteApi from "@/utils/callFreteApi";
import consolidarTamanho from "@/utils/consolidarTamanhos";
import useCarrinhoContext from "@/hooks/useCarrinhoContext";
import CampoTexto from "@/components/campoTexto";
import Button from "@/components/button";
import Tamanhos from "./tamanho";
import Warning from "./warning";
import Cores from "./cor";
import styles from "./produtoOpcoes.module.css"
import ProdutoFrete from "../produtoFrete";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";



export default function ProdutoOpcoes({ produto } : { produto: Produto }) {

    function validaPropsCarrinho(tamanho: string, cor: string): boolean {
        if (tamanho) {
            if (cor) {
                adicionarUmProdutoCarrinho(produto, corSelecionada, tamanhoSelecionado);
                console.log(produto, corSelecionada, tamanhoSelecionado)
                return true;
            } else {
                setWarning("Selecione uma cor para adicionar ao carrinho");
            }
        } else {
            setWarning("Selecione um tamanho para adicionar ao carrinho");
        }
        return false;
    }

    const [liked, setLiked] = useState<boolean>(false);
    const [corSelecionada, setCorSelecionada] = useState<string>("");
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [frete, setFrete] = useState<Frete[]>([]);
    
    const [warning, setWarning] = useState<string | false>(false);

    const { adicionarUmProdutoCarrinho } = useCarrinhoContext();

    const tamanhos = consolidarTamanho(produto.cores);
    const cores = consolidarCores(produto.cores);


    useEffect(() => {
        if (!produto.mais_cores) setCorSelecionada("default");
    }, [produto.mais_cores]);

    function handleLike(like : boolean = false) {
        setLiked(like);
    }

    const session = useSession();
    const router = useRouter();


    return(
        <div className={styles.produtoOpcoes}>
            <div className={styles.preco}>
                <div className={styles.preco__info}>
                    <span className={styles.info__valor}>
                        {produto.preco
                        .toLocaleString('pt-BR', 
                        {style: 'currency', 
                         currency: 'BRL' 
                        })}
                    </span>
                    <p className={styles.info__vezes}>Em até 6x sem juros</p>
                </div>
                {liked 
                ? <IoMdHeart 
                    style={{cursor: "pointer"}} 
                    onClick={() => handleLike(!liked)} 
                    color="var(--cor-primaria)" 
                    size={60} 
                /> 
                : <IoMdHeartEmpty
                    style={{cursor: "pointer"}}
                    onClick={() => handleLike(!liked)} 
                    size={60} 
                    color="var(--cor-primaria)" 
                />}
            </div>
            <div className={styles.opcoes}>
                {produto.mais_cores && <label className={styles.opcoes__label}>Cores:</label>}
                    {produto.mais_cores && <Cores setCor={setCorSelecionada} setTamanho={setTamanhoSelecionado}  cores={cores} />}
                <label className={styles.opcoes__label}>Tamanhos:</label>
                    {cores.map((cor) => (
                        cor.cor === corSelecionada && (
                            <Tamanhos 
                                key={cor.cor} 
                                setTamanho={setTamanhoSelecionado} 
                                tamanhos={
                                    tamanhos
                                        .filter((tamanho) => corSelecionada === tamanho.cor)
                                        .flatMap((tamanho) => tamanho.tamanhos)
                                }
                            />
                        )
                    ))}
                    {corSelecionada === "" && (
                        <Tamanhos 
                            empty 
                            tamanhos={[{tamanho: "PP" ,quantidade: 0}]} 
                            setTamanho={setTamanhoSelecionado} 
                            key={"empty"} />)}

            </div>
            <div className={styles.botoes}>
                {warning && <Warning close={() => setWarning(false)} text={warning} key={warning}/>}
                <Button 
                    onClick={() => {
                        if (session.status === "authenticated") {
                            const result = validaPropsCarrinho(tamanhoSelecionado, corSelecionada);
                            if (result) setWarning("Produto adicionado ao carrinho");
                        } else {
                            router.push("/login");
                        }
                    }} 
                    type="full" 
                >Adicionar ao carrinho</Button>
                <Button 
                    onClick={() => {
                        if (session.status === "authenticated") {
                            if (!produto.mais_cores) setCorSelecionada("default")
                            const result = validaPropsCarrinho(tamanhoSelecionado, corSelecionada);
                            // essa maluca aqui leva pro checkout direto só com esse produto
                        } else {
                            router.push("/login");
                        }
                    }} 
                    type="filled" 
                >Comprar agora</Button>
                <span className={styles.divisoria} />
                <div className={styles.frete}>
                    <label className={styles.frete__label}>Calcular prazo de entrega</label>
                    <div className={styles.frete__cep}>
                    <div className={styles.frete__inputs}>
                        <CampoTexto text={cep} onChange={setCep} type="masked" />
                        <Button 
                            onClick={() => {
                                const sanitizedCep = cep.replace("-", "");
                                if (sanitizedCep.length === 8) {
                                    callFreteApi(sanitizedCep, setFrete);
                                } else {
                                    setWarning("Informe o seu cep para consultar o prazo de entrega");
                                }
                            }}
                            maxWidht="88px"
                            type="full"
                        >
                            Calcular
                        </Button>
                    </div>
                            {frete.length > 0 
                                && frete[0].status != 500 
                                && <ProdutoFrete key={"produto-frete"} fretes={frete} />
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}
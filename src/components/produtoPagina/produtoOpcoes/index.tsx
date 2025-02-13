"use client"

import { useEffect, useState } from "react";
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
import useUserContext from "@/hooks/useUserContext";
import { useRouter } from "next/navigation";

function validaPropsCarrinho(tamanho: string, cor: string): boolean {
    if(tamanho && cor){
        return true;
    }
    return false;
}

export default function ProdutoOpcoes({ produto } : { produto: Produto }) {
    const [liked, setLiked] = useState<boolean>(false);
    const [corSelecionada, setCorSelecionada] = useState<string>("");
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [frete, setFrete] = useState<Frete[]>([]);
    
    const [warningCarrinho, setWarningCarrinho] = useState<boolean>(false);
    const [warningComprar, setWarningComprar] = useState<boolean>(false);
    const [warningFrete, setWarningFrete] = useState<boolean>(false);

    useEffect(() => {
        if (warningCarrinho) {
            setWarningComprar(false);
            setWarningFrete(false);
        }
    }, [warningCarrinho]);

    useEffect(() => {
        if (warningComprar) {
            setWarningFrete(false);
            setWarningCarrinho(false);
        }
    }, [warningComprar]);

    useEffect(() => {
        if (warningFrete) {
            setWarningCarrinho(false);
            setWarningComprar(false);
        }
    }, [warningFrete]);


    const { adicionarUmProdutoCarrinho, carrinho } = useCarrinhoContext();

    const tamanhos = consolidarTamanho(produto.cores);
    const cores = consolidarCores(produto.cores);

    function handleLike(like : boolean = false) {
        setLiked(like);
    }

    const { usuario } = useUserContext();
    const router = useRouter();


    return(
        <div className={styles.produtoOpcoes}>
            <div className={styles.preco}>
                <div className={styles.preco__info}>
                    <span className={styles.info__valor}>
                        {parseInt(produto.preco)
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
                <label className={styles.opcoes__label}>Cores:</label>
                    <Cores setCor={setCorSelecionada} setTamanho={setTamanhoSelecionado}  cores={cores} />
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
                {warningCarrinho && <Warning close={() => setWarningCarrinho(false)} text="Selecione uma cor e um tamanho para adicionar ao carrinho "/>}
                {warningComprar && <Warning close={() => setWarningComprar(false)} text="Selecione uma cor e um tamanho para comprar o produto "/>}
                <Button 
                    onClick={() => 
                        usuario 
                        ? (validaPropsCarrinho(tamanhoSelecionado, corSelecionada) 
                            ? (adicionarUmProdutoCarrinho(produto, corSelecionada, tamanhoSelecionado))
                            : setWarningCarrinho(true))
                        : router.push("/login")
                    } 
                    type="full" 
                >Adicionar ao carrinho</Button>
                <Button 
                    onClick={() => 
                        usuario 
                        ? (validaPropsCarrinho(tamanhoSelecionado, corSelecionada)
                            ? console.log(carrinho)
                            : setWarningComprar(true))
                        : router.push("/login")
                        
                    }
                    type="filled" 
                >Comprar agora</Button>
                <span className={styles.divisoria} />
                <div className={styles.frete}>
                    {warningFrete && <Warning close={() => setWarningFrete(false)} text="Informe o seu cep para consultar o prazo de entrega"/>}
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
                                    setWarningFrete(true);
                                }
                            }}
                            maxWidht="88px"
                            type="full"
                        >Calcular</Button>
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
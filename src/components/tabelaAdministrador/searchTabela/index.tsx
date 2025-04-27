"use client";

import CampoTexto from "@/components/campoTexto";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import styles from "./search.module.css";
import Produto from "@/module/produto";
import { useEffect } from "react";
import Button from "@/components/button";

export default function SearchTabela( 
    {
        produtoOriginal, 
        setProdutos,
        search,
        setSearch,
        tag,
        setTag,
        cores,
        setNenhumProduto,
    } : 
    {
        produtoOriginal: Produto[], 
        setProdutos: (arg: Produto[]) => void,
        search: string,
        setSearch: (arg: string) => void,
        tag: string,
        setTag: (arg: string) => void,
        cores: {id:string, nome:string, hex:string}[],
        setNenhumProduto: (arg: boolean) => void,
    }) {



    useEffect(() => {
        ConfigurandoSearchTags();
    }, [search, produtoOriginal]);


    return (
        <menu type="toolbar" className={styles.adm_menu_toolbar}>
            <div className={styles.search}>
                <div className={styles.search_input}>
                    <CampoTexto text={search} onChange={setSearch} placeholder="Pesquisar Produto" />
                    <IoSearch size={20} className={styles.search_icon + " " + (search.length > 20 ? styles.search_icon_desapper : "") } />
                </div>
                {tag.length >= 3 && 
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <p>Procurando por: </p> 
                        <SearchTag text={tag} onDelete={() => setTag("")} />
                    </div>}
            </div>
            <div className={styles.adm_menu_toolbar_adicionar}>
                <Button 
                    onClick={() => {}}
                    type="full"
                >
                    Adicionar Produto
                </Button>
            </div>
        </menu>
    )


    function ConfigurandoSearchTags() {

        if (tag == "Registro") {
            const filteredProdutos = produtoOriginal.find((produto) => {
                const alvo = produto.id;
                return alvo == search;
            });
            setProdutos(filteredProdutos ? [filteredProdutos] : []);
            setNenhumProduto(filteredProdutos ? false : true);
            if (search.length == 0) setProdutos(produtoOriginal);
    
        } else if (tag == "Preco") {
            const filteredProdutos = produtoOriginal.filter((produto) => {
                const alvo = trataSearch(produto.preco.toFixed(2).replace('.', ','));
                return alvo == search;
            });
            setProdutos(filteredProdutos);
            setNenhumProduto(filteredProdutos.length == 0);
            if (search.length == 0) setProdutos(produtoOriginal);
    
        } else if (tag == "Cores") {
            const filteredProdutos = produtoOriginal.filter((produto) => {
                const coresArray = produto.cores.split(',').map(corId => corId.trim());
                const nomesDasCores = coresArray.map(corId => {
                    const corEncontrada = cores.find(cor => cor.id == corId);
                    return corEncontrada ? trataSearch(corEncontrada.nome) : "";
                });
                const resultado = nomesDasCores.includes(search.toLowerCase());
                return resultado;
            });
            setProdutos(filteredProdutos);
            setNenhumProduto(filteredProdutos.length == 0);
            if (search.length == 0) setProdutos(produtoOriginal);

        } else if (search.length < 3) {
            setProdutos(produtoOriginal);
        } else {
            const filteredProdutos = produtoOriginal.filter((produto) => {
                let alvo = trataSearch(produto.nome);
                if (tag == "Tecido") alvo = trataSearch(produto.tecido);
                if (tag == "Descricao") alvo = trataSearch(produto.descricao);
    
                return alvo === search.toLocaleLowerCase();
            });
            setProdutos(filteredProdutos);
            setNenhumProduto(filteredProdutos.length == 0);
            if (search.length == 0) setProdutos(produtoOriginal);
        }

        if( search.length == 0) setNenhumProduto(false);

    
        function trataSearch(alvo: string) {
            return alvo.toLowerCase().slice(0, search.length)
        }
    }

}

function SearchTag(
    { 
        text, 
        onDelete 
    }: { 
        text: string, 
        onDelete: () => void 
    }) {
    return (
        <div onClick={() => onDelete()} className={styles.search_tag}>
            <span className={styles.search_tag_text} >{text}</span>
            <button className={styles.search_tag_button} onClick={() => onDelete()}><IoCloseOutline size={20} /></button>
        </div>
    )
}




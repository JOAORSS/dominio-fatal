"use client";

import CampoTexto from "@/components/campoTexto";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import ModalGeral from "@/components/ModalGeral";
import CampoSelect from "@/components/campoTexto/campoSelect";

export default function SearchTabela( 
    {
        estoqueOriginal, 
        setEstoque,
        search,
        setSearch,
        tag,
        setTag,
        setNenhumEstoque,
    } : 
    {
        estoqueOriginal: {
            produto: string, 
            produto_id: string,
            cor: string, 
            tamanho: string, 
            quantidade: number
        }[], 
        setEstoque: (arg: {
            produto: string,
            produto_id: string,
            cor: string, 
            tamanho: string, 
            quantidade: number
        }[]) => void,
        search: string,
        setSearch: (arg: string) => void,
        tag: string,
        setTag: (arg: string) => void,
        setNenhumEstoque: (arg: boolean) => void,
    }) {


 
    useEffect(() => {
        ConfigurandoSearchTags();
    }, [search, estoqueOriginal]);

    const [open, setOpen] = useState<boolean>(false)
    // const [loading, setLoading] = useState<boolean>(false)
    // const [warning, setWarning] = useState<string>("")

    return (
        <>
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
                    onClick={() => setOpen(!open)}
                    type="full"
                >
                    Adicionar Produto
                </Button>
            </div>
        </menu>
        <ModalGeral open={open} setOpen={setOpen}>
            <ModalAdicionarEstoque />
        </ModalGeral>
        </>

    )


    function ConfigurandoSearchTags() {

        if (tag == "Quantidade" || (tag == "Tamanho" && search.length < 3)) {
            const filteredEstoque = estoqueOriginal.filter((estoque) => {
                const alvo = tag == "Quantidade" ? estoque.quantidade.toString() : estoque.tamanho;
                return alvo.toLocaleLowerCase() == search.toLocaleLowerCase();
            });
            setEstoque(filteredEstoque);
            setNenhumEstoque(filteredEstoque.length == 0);

            if (search.length == 0) setEstoque(estoqueOriginal);

        } else if (tag == "Cor") {
            const filteredEstoque = estoqueOriginal.filter((estoque) => {
                const alvo = estoque.cor.toLowerCase();
                return alvo == search.toLowerCase();
            });
            setEstoque(filteredEstoque);
            setNenhumEstoque(filteredEstoque.length == 0);

            if (search.length == 0) setEstoque(estoqueOriginal);

        } else if (search.length < 3) {
            setEstoque(estoqueOriginal);
        } else {
            const filteredEstoque = estoqueOriginal.filter((estoque) => {
            let alvo = trataSearch(estoque.produto);
            if (tag == "Tamanho") alvo = trataSearch(estoque.tamanho);

            return alvo === search.toLocaleLowerCase();
            });
            setEstoque(filteredEstoque);
            setNenhumEstoque(filteredEstoque.length == 0);
            if (search.length == 0) setEstoque(estoqueOriginal);
        }

        if (search.length == 0) setNenhumEstoque(false);

        function trataSearch(alvo: string) {
            return alvo.toLowerCase().slice(0, search.length);
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



function ModalAdicionarEstoque() {

    const [produtoSelecionado, setPodutoSelecionado] = useState<string>("");
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("");
    const [corSelecionada, setCorSelecionado] = useState<string>("");

    return(
        <form>
            <CampoSelect 
                onChange={setPodutoSelecionado}
                selected={produtoSelecionado}
                required
                options={
                    [
                        {label: "Selecione um produto", value: "teste"}
                    ]
                }
            />
            <div>
                <CampoSelect
                    onChange={setTamanhoSelecionado}
                    selected={tamanhoSelecionado}
                    required
                    options={[{label: "Selecione tamanho", value: "teste"}]}
                />
                <CampoSelect 
                    onChange={setCorSelecionado}
                    selected={corSelecionada}
                    required
                    options={[{label: "Selecione uma cor", value: "teste"}]}
                />
            </div>
        </form>
        
    )
}
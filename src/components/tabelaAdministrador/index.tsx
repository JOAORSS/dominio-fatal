"use client";

import { useEffect, useState } from "react";
import styles from './tabela.module.css'
import Produto from "@/module/produto";
import SearchTabela from "./searchTabela";
import configuraScrollDasCedulas from "@/utils/configuraScrollCedulas";
import Link from "next/link";
import ContextMenuCell from "../contextMenu";
import { TbMenu, TbSortAscendingLetters, TbSortAscendingNumbers, TbSortDescendingLetters, TbSortDescendingNumbers } from "react-icons/tb";
import OptionButtonSort from "../contextMenu/optionButton";

export default function WarperTabelaAdministrador(
    {
        produtos, 
        cores
    }: { 
        produtos: Produto[], 
        cores: {id:string, nome:string, hex:string}[] 
    }) {

        const [produtosArray, setProdutosArray] = useState<Produto[] | []>(produtos);
        const [search, setSearch] = useState<string>("");
        const [tag, setTag] = useState<string>("");
        const [nenhumProduto, setNenhumProduto] = useState<boolean>(false);
        // const [ordemAscendente, setOrdemAscendente] = useState<boolean>(false);


        return(
            <>

                <MenuAdm />

                <SearchTabela 
                    search={search} 
                    setSearch={setSearch} 
                    produtoOriginal={produtos} 
                    cores={cores}
                    setTag={setTag}
                    tag={tag}
                    setNenhumProduto={setNenhumProduto}
                    setProdutos={setProdutosArray} />

                <TabelaAdministrador 
                    setTag={setTag}
                    produtos={produtosArray} 
                    cores={cores} />
            </>
            
        )

    function TabelaAdministrador(
        {
            produtos, 
            cores,
            setTag,
        }: { 
            produtos: Produto[], 
            cores: {id:string, nome:string, hex:string}[],
            setTag: (arg: string) => void,
        }) {

        useEffect(() => {
            configuraScrollDasCedulas();
        }, []);


        function handleClick(tag: string) {
            setTag(tag);
        }



        // function handleClickOrdem() {
        //         setOrdemAscendente(!ordemAscendente);
        //         const produtoOrdenado = [...produtosArray].sort((a, b) => {
        //             return ordemAscendente ? Number(b.id) - Number(a.id) : Number(a.id) - Number(b.id);
        //         });
        //         setProdutosArray(produtoOrdenado);
        // }

        const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
        const [menuVisible, setMenuVisible] = useState<string>("");

        function handleContextMenu(e: React.MouseEvent<HTMLTableCellElement>, tipo: string){
            e.preventDefault();
            setMenuPosition({x: e.clientX, y: e.clientY});
            setMenuVisible(tipo);
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && !e.target.closest(`.${styles.contextMenu}`)) {
                setMenuVisible("");
            }
        }

        useEffect(() => {
            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, []);


        return(
            <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onContextMenu={(e) => handleContextMenu(e, "number")} onClick={() => handleClick("Registro")} style={{width: "1%"}} className={styles.th}>#</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "text")} onClick={() => handleClick("Nome")} className={styles.th} style={{width: "10%"}} >Nome</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "number")} onClick={() => handleClick("Preco")} className={styles.th}>Preço</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "text")} onClick={() => handleClick("Tecido")} className={styles.th}>Tecido</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "text")} onClick={() => handleClick("Descricao")} className={styles.th}>Descrição</th>
                        <th onContextMenu={(e) => e.preventDefault()} className={styles.th} style={{width: "100px"}} >Imagem</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "text")} onClick={() => handleClick("Cores")} className={styles.th} style={{width: "10%"}}>Cores</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, index) => (
                        <tr key={index} className={styles.tr}>
                            <td className={styles.td}>{produto.id}</td>
                            <td className={styles.td}>{produto.nome}</td>
                            <td className={styles.td}>{produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                            <td className={styles.td}>{produto.tecido}</td>
                            <td className={styles.td}>{produto.descricao}</td>
                            <td className={styles.td}>
                                {produto.imagens.split(",").map((imagem, index) => (
                                    <a style={{marginRight: "10px"}} href={imagem} key={`image-${index}`}>Imagem {index}</a>
                                ))}
                            </td>
                            <td className={styles.td} >
                                {produto.cores.split(",").map((corId) => {
                                    const cor = cores.find(cor => cor.id == corId);

                                    if (!cor) {
                                        return null;
                                    }
                                    return (
                                        cor.nome == "default" ? "Cor unica" : cor.nome
                                    )
                                }).join(", ")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {nenhumProduto && 
                <div className={styles.semResultadosContainer}>
                    <h2 className={styles.semResultados}>Nenhum resultado</h2>
                </div>
            }
            {menuVisible.length > 0 &&
                <ContextMenuCell position={menuPosition}>
                    <span style={{padding: "10px 0px"}}>Ordenar por:</span>
                    {menuVisible === "text" && 
                    <>
                        <OptionButtonSort hint="Volta para a organização padrão"><TbMenu size={20} /></OptionButtonSort>
                        <OptionButtonSort hint="Organiza por ordem alfabética"><TbSortAscendingLetters size={20} /></OptionButtonSort>
                        <OptionButtonSort hint="Organiza por ordem alfabética invertida" ><TbSortDescendingLetters size={20} /></OptionButtonSort>
                    </>
                    }
                    {
                    menuVisible === "number" && 
                    <>
                        <OptionButtonSort hint="Volta para a organização padrão" ><TbMenu size={20} /></OptionButtonSort>
                        <OptionButtonSort hint="Organiza pela ordem crescente dos números" ><TbSortAscendingNumbers size={20} /></OptionButtonSort>
                        <OptionButtonSort hint="Organiza pela ordem decrescente dos números" ><TbSortDescendingNumbers size={20} /></OptionButtonSort>
                    </>
                    }
                </ContextMenuCell>
            }
        </>
        )
}

}

function MenuAdm() {

    return(
        <menu className={styles.adm_menu_principal}>
            <div>                        
                <h1 >Area de administração</h1>
                <h2 >Tabela de produtos</h2>
            </div>
            <div className={styles.adm_links} >
                <Link href={"/administracao/estoque"} > <button className={styles.adm_link_button}>Estoque</button></Link>
                <button className={styles.adm_link_button}>Usuarios</button>
                <button className={styles.adm_link_button}>Cores</button>
            </div>
        </menu>
    )
}


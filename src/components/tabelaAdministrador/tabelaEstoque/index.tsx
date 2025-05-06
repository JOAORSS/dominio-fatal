"use client";

import { useEffect, useState } from "react";
import styles from './tabela.module.css'
import SearchTabela from "./searchEstoque";
import configuraScrollDasCedulas from "@/utils/configuraScrollCedulas";
import Link from "next/link";
import ContextMenuCell from "@/components/contextMenu";
import { TbMenu, TbSortAscendingLetters, TbSortAscendingNumbers, TbSortDescendingLetters, TbSortDescendingNumbers } from "react-icons/tb";
import OptionButtonSort from "@/components/contextMenu/optionButton";

export default function TabelaAdministradorEstoque(
    {
        estoque, 
    }: { 
        estoque: {
            produto: string, 
            produto_id: string,
            cor: string, 
            tamanho: string, 
            quantidade: number
        }[], 
    }) {
        
        const [estoqueArray, setEstoqueArray] = useState<{
            produto: string, 
            produto_id: string,
            cor: string, 
            tamanho: string, 
            quantidade: number
        }[] | []>(estoque);
        
        const [search, setSearch] = useState<string>("");
        const [tag, setTag] = useState<string>("");
        const [nenhumEstoque, setNenhumEstoque] = useState<boolean>(false);

        return(
            <>

                <MenuAdm />

                <SearchTabela 
                    search={search} 
                    setSearch={setSearch} 
                    estoqueOriginal={estoque} 
                    setEstoque={setEstoqueArray} 
                    setTag={setTag}
                    tag={tag}
                    setNenhumEstoque={setNenhumEstoque} />

                <TabelaAdministrador 
                    setTag={setTag}
                    estoque={estoqueArray} />
            </>
            
        )

    function TabelaAdministrador(
        {
            estoque,
            setTag,
        }: { 
            estoque: {
                produto: string, 
                produto_id: string,
                cor: string, 
                tamanho: string, 
                quantidade: number
            }[], 
            setTag: (arg: string) => void,
        }) {

        useEffect(() => {
            configuraScrollDasCedulas();
        }, []);

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

        function handleClick(tag: string) {
            setTag(tag);
        }

        const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
        const [menuVisible, setMenuVisible] = useState<string>("");
    
        function handleContextMenu(e: React.MouseEvent<HTMLTableCellElement>, tipo: string){
            e.preventDefault();
            setMenuPosition({x: e.clientX, y: e.clientY});
            setMenuVisible(tipo);
        }

        return(
            <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onContextMenu={(e) => handleContextMenu(e, "number")} onClick={() => handleClick("Registro")}  className={styles.th} style={{width: "1%"}} >#</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "text")} onClick={() => handleClick("Nome")} className={styles.th} style={{width: "10%"}} >Nome</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "text")} onClick={() => handleClick("Cor")} style={{width: "10%"}} className={styles.th}>Cor</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "text")} onClick={() => handleClick("Tamanho")} className={styles.th}>Tamanho</th>
                        <th onContextMenu={(e) => handleContextMenu(e, "number")} onClick={() => handleClick("Quantidade")} className={styles.th}>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map((estoque, index) => (
                        <tr key={index} className={styles.tr}>
                            <td className={styles.td}>{estoque.produto_id}</td>
                            <td className={styles.td}>{estoque.produto}</td>
                            <td className={styles.td}>{estoque.cor}</td>
                            <td className={styles.td}>{estoque.tamanho}</td>
                            <td className={styles.td}>{estoque.quantidade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {nenhumEstoque && 
                <div className={styles.semResultadosContainer}>
                    <h2 className={styles.semResultados}>Nenhum resultado</h2>
                </div>}
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
                <h2 >Tabela de estoque</h2>
            </div>
            <div className={styles.adm_links} >
            <Link href={"/administracao/produtos"} ><button className={styles.adm_link_button}>Produto</button></Link>
            <button className={styles.adm_link_button}>Usuarios</button>
                <button className={styles.adm_link_button}>Cores</button>
            </div>
        </menu>
    )
}


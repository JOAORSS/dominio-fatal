"use client";

import { useEffect, useState } from "react";
import styles from './tabela.module.css'
import configuraScrollDasCedulas from "@/utils/configuraScrollCedulas";
import Link from "next/link";

export default function TabelaAdministradorUsuario(
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
        const [nenhumResultado, setNenhumResultado] = useState<boolean>(false);

        return(
            <>

                <MenuAdm />

                {/* <SearchTabela 
                    search={search} 
                    setSearch={setSearch} 
                    estoqueOriginal={estoque} 
                    setEstoque={setEstoqueArray} 
                    setTag={setTag}
                    tag={tag}
                    setNenhumResultado={setNenhumResultado} /> */}

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

        function handleClick(tag: string) {
            setTag(tag);
        }

        return(
            <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => handleClick("Registro")}  className={styles.th} style={{width: "1%"}} >#</th>
                        <th onClick={() => handleClick("Nome")} className={styles.th} style={{width: "10%"}} >Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map((estoque, index) => (
                        <tr key={index} className={styles.tr}>
                            <td className={styles.td}>{estoque.produto_id}</td>
                            <td className={styles.td}>{estoque.produto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {nenhumResultado && 
                <div className={styles.semResultadosContainer}>
                    <h2 className={styles.semResultados}>Nenhum resultado</h2>
                </div>
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
                <h2 >Tabela de Usuarios</h2>
            </div>
            <div className={styles.adm_links} >
            <Link href={"/administracao/produtos"} ><button className={styles.adm_link_button}>Produto</button></Link>
            <button className={styles.adm_link_button}>Estoque</button>
                <button className={styles.adm_link_button}>Cores</button>
            </div>
        </menu>
    )
}


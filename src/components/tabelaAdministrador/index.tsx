"use client";

import { useEffect, useState } from "react";
import styles from './tabela.module.css'
import Produto from "@/module/produto";
import SearchTabela from "./searchTabela";

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

        return(
            <>
                <menu className={styles.adm_menu_principal}>
                    <div>                        
                        <h1 >Area de administração</h1>
                        <h2 >Tabela de produtos</h2>
                    </div>
                    <div className={styles.adm_links} >
                        <button className={styles.adm_link_button}>Estoque</button>
                        <button className={styles.adm_link_button}>Usuarios</button>
                        <button className={styles.adm_link_button}>Cores</button>
                    </div>
                </menu>

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

        return(
            <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => handleClick("Registro")} style={{width: "1%"}} className={styles.th}>#</th>
                        <th onClick={() => handleClick("Nome")} className={styles.th} style={{width: "10%"}} >Nome</th>
                        <th onClick={() => handleClick("Preco")} className={styles.th}>Preço</th>
                        <th onClick={() => handleClick("Tecido")} className={styles.th}>Tecido</th>
                        <th onClick={() => handleClick("Descricao")} className={styles.th}>Descrição</th>
                        <th onClick={() => handleClick("Imagem")} className={styles.th} style={{width: "100px"}} >Imagem</th>
                        <th onClick={() => handleClick("Cores")} className={styles.th} style={{width: "10%"}}>Cores</th>
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
        </>
        )


        function configuraScrollDasCedulas() {
            const tds = document.querySelectorAll("td");
            const onWheelHandlers: { td: Element; handler: (e: WheelEvent) => void }[] = [];
    
            tds.forEach((td) => {
            if (td.scrollWidth > td.clientWidth) {
                const onWheel = (e: WheelEvent): void => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    td.scrollLeft += e.deltaY;
                }
                };
    
                td.addEventListener("wheel", onWheel, { passive: false });
                onWheelHandlers.push({ td, handler: onWheel });
            }
            });
    
            return () => {
            onWheelHandlers.forEach(({ td, handler }) => {
                td.removeEventListener("wheel", handler as EventListener);
            });
            };
        }

}
}



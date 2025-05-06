"use server"

import TabelaAdministradorEstoque from "@/components/tabelaAdministrador/tabelaEstoque";
import styles from "../adm.module.css";
import selectCores from "@/services/supabase/cores/selectCores";
import selectEstoque from "@/services/supabase/estoque/selectEstoque";
import selectProdutos from "@/services/supabase/produtos/selectProdutos";
import enumTamanhosNumeros, { enumTamanhoLetras } from "@/utils/enumTamanhos";
import estoqueMock from "@/mock/mockEstoque.json"

export default async function AdminisradorMenuProdutos() {

    // const produtos = await selectProdutos();
    // const cores = await selectCores();
    // const estoque = await selectEstoque();

    // const estoqueFiltrado 
    // : {
    //     produto_id: string,
    //     produto: string, 
    //     cor: string, 
    //     tamanho: string, 
    //     quantidade: number
    // }[] = estoque.map((item) => {
    //     return {
    //         produto_id: item.produto_id,
    //         produto: produtos.find((produto) => produto.id === item.produto_id)?.nome || "",
    //         cor: cores.find((cor) => cor.id === item.cor_id)?.nome || "",
    //         tamanho: enumTamanhosNumeros(Number(item.tamanho_id)),
    //         quantidade: item.quantidade,
    //     };
    // });

    const estoqueFiltrado 
    : {
        produto_id: string,
        produto: string, 
        cor: string, 
        tamanho: string, 
        quantidade: number
    }[] = estoqueMock;

    estoqueFiltrado.sort((a, b) => {
        if (a.produto === b.produto) {
            const tamanhoA = enumTamanhoLetras(a.tamanho);
            const tamanhoB = enumTamanhoLetras(b.tamanho);
            return tamanhoA - tamanhoB;
        }
        return a.produto.localeCompare(b.produto);
    });

    return (
        <section className={styles.adm_menu}>
            <TabelaAdministradorEstoque estoque={estoqueFiltrado} />
        </section>
    );
}
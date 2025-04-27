
import styles from "./adm.module.css";
// import Produto from "@/module/produto";
import WarperTabelaAdministrador from "@/components/tabelaAdministrador";
import selectCores from "@/services/supabase/cores/selectCores";
import selectProdutos from "@/services/supabase/produtos/selectProdutos";

export default async function AdminisradorMenu() {

    const produtos = await selectProdutos();
    const cores = await selectCores();
    
    // const cores: {id:string, nome:string, hex:string}[] = [{
    //     id: "2", nome: "default", hex: "#fffff"
    // }]

    // const produtos: Produto[] = [{
    //     id: "1",
    //     nome: "teste",
    //     preco: 54,
    //     tecido: "algodão",
    //     imagens: "http://placeholder.png,http://placeholder.png,http://placeholder.png",
    //     mais_cores: false,
    //     descricao: "tem uma descrição aqui, nem te preocupa",
    //     cores: "1",
    // },{
    //     id: "2",
    //     nome: "Henrique",
    //     preco: 52,
    //     tecido: "Poliester",
    //     imagens: "http://placeholder.png,http://placeholder.png,http://placeholder.png",
    //     mais_cores: false,
    //     descricao: "tem uma descrição aqui, nem te preocupa",
    //     cores: "1,2",
    // }]

    return (
        <section className={styles.adm_menu}>
            <WarperTabelaAdministrador produtos={produtos} cores={cores} />
        </section>
    );
}
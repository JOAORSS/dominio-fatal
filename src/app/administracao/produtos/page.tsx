
import styles from "../adm.module.css";
import WarperTabelaAdministrador from "@/components/tabelaAdministrador";
import selectCores from "@/services/supabase/cores/selectCores";
import selectProdutos from "@/services/supabase/produtos/selectProdutos";

export default async function AdminisradorMenuProdutos() {

    const produtos = await selectProdutos();
    const cores = await selectCores();

    return (
        <section className={styles.adm_menu}>
            <WarperTabelaAdministrador produtos={produtos} cores={cores} />
        </section>
    );
}
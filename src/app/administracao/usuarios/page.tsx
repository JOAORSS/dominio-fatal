"use server"

import styles from "../adm.module.css";
import TabelaAdministradorUsuario from "@/components/tabelaAdministrador/tabelaUsuario";


export default async function AdminisradorMenuProdutos() {


    return (
        <section className={styles.adm_menu}>
            <TabelaAdministradorUsuario estoque={estoqueFiltrado} />
        </section>
    );
}
import styles from "../perfil.module.css"
import Cartao from "./cartao"
import Endereco from "./endereco"
import Usuario from "./usuario"
// import ContaType from "@/module/conta"

export default function PerfilPerfil() {
    return(
        <section className={styles.info}>
                <Usuario />
                <Endereco />
                <div>
                    <h3 className={styles.infoBoxLabel}>Cartões</h3>
                    <Cartao />
                </div>
        </section>
    )
}
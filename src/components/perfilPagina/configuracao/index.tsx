import styles from "../perfil.module.css"
import ConfigBox, { Logout } from "./configBox"

export default function PerfilConfig() {
    return(
        <section className={styles.configuracoes}>
            <ConfigBox typePerfil="editar" />
            <ConfigBox typePerfil="seguranca" />
            <ConfigBox typePerfil="configuracoes" />
            <ConfigBox typePerfil="historico" />
            <ConfigBox typePerfil="FAC" />
            <ConfigBox typePerfil="legal" />
            <Logout typePerfil="sair" />
        </section>
    )
}
"use client"

import { useState } from "react"
import styles from "../perfil.module.css"
import ConfigBox, { Logout } from "./configBox"
import FormEditUser from "@/components/editPerfilForm"

export default function PerfilConfig() {

    const [toggle, setToggle] = useState<string | false>(false)

    return(
        <>
            <section className={styles.configuracoes}>
                {/* <ConfigBox typePerfil="editar" /> */}
                <button onClick={() => setToggle("teste")} >Editar PErfil</button>
                <ConfigBox typePerfil="seguranca" />
                <ConfigBox typePerfil="configuracoes" />
                <ConfigBox typePerfil="historico" />
                <ConfigBox typePerfil="FAC" />
                <ConfigBox typePerfil="legal" />
                <Logout typePerfil="sair" />
            </section>
            {toggle == "teste" && <FormEditUser setToggle={() => setToggle(false)} />}
        </>
    )
}
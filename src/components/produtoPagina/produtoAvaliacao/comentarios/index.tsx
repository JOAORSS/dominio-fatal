"use client"

import CampoTexto from "@/components/campoTexto"
import styles from "./comentarios.module.css"
import Button from "@/components/button"
import Comentario from "./comentario"
import { useState } from "react"

export default function Comentarios() {
    const [comentario, setComentario] = useState<string>("")

    return (
        <div className={styles.comentarios}>
            <h3 className={styles.escritaDestaque}>Comentários</h3>
            <div className={styles.comentar} >
                <CampoTexto text={comentario} onChange={setComentario} placeholder="Escreva um comentário..." />
                <Button type="outline" maxWidht="174px" >Comentar</Button>
            </div>
            <div className={styles.ultimosComentario}>
            <h3 className={styles.escritaDestaque}>Ultimos comentários</h3>
                <Comentario />
            </div>
        </div>
    )
}
"use client"

import CampoTexto from "@/components/campoTexto"
import styles from "./comentarios.module.css"
import Button from "@/components/button"
import Comentario from "./comentario"
import { useState } from "react"
import { useParams } from "next/navigation"
import postarComentario from "@/utils/comentar"
import Warning from "../../produtoOpcoes/warning"

export default function Comentarios({comentarios}:{ comentarios: {usuario: string, comentario:string}[]}) {
    const [comentario, setComentario] = useState<string>("")
    const [comentariosCli, setComentariosCli] = useState<{usuario: string, comentario:string}[]>(comentarios)
    const [warningComentario, setWarningComentario] = useState<boolean>(false);

    const { id } = useParams();
    const idUse = typeof id === 'string' ? parseInt(id) : id;

    return (
        <div className={styles.comentarios}>
            <h3 className={styles.escritaDestaque}>Comentários</h3>
            <div className={styles.comentar} >
                <CampoTexto text={comentario} onChange={setComentario} placeholder="Escreva um comentário..." />
                <Button 
                    onClick={async () => {
                        if (typeof idUse === 'number' && comentario.length > 4) {
                            const result = await postarComentario(idUse, "teste", comentario);
                            if (result) {
                                setComentariosCli(prevComentarios => [...prevComentarios, {usuario: "teste", comentario: comentario}]);
                            }
                        } else {
                            setWarningComentario(true);
                        }}}
                        type="outline" 
                        maxWidht="174px" >
                            Comentar
                    </Button>
            </div>
            {warningComentario && <Warning close={() => setWarningComentario(false)} text="Erro ao postar comentario: é preciso no mínimo 3 letras" />}
            <div className={styles.ultimosComentario}>
            <h3 className={styles.escritaDestaque}>Ultimos comentários</h3>
                {comentariosCli.length === 0 
                ? <p style={{alignSelf: "center"}}>Nenhum comentário ainda...</p>
                : comentariosCli.map((comentario, index) => (
                    <Comentario key={`comentario-${index}`} usuario={comentario.usuario} comentario={comentario.comentario} />
                ))}
            </div>
        </div>
    )
}
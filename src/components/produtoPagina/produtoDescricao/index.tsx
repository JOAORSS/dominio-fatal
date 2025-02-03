"use client"

import { useState } from "react";
import styles from "./descricao.module.css"

export default function ProdutoDescricao({ descricao } : { descricao?: string }) {

    const [lerMais, setLerMais] = useState(false);

    return (
        <div className={styles.descricao}>
            <h2>Descrição</h2>
            <p className={(lerMais ? "" : styles.descricao__text)}>{descricao}.</p>
            {!lerMais && <div className={styles.blockText} />}
            <button onClick={() => setLerMais(!lerMais)} className={styles.lerMais}>{lerMais ? "Ler menos" : "Ler mais"}</button>
        </div>
    )
}
"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from './descricao.module.css';

export default function ProdutoDescricao({ descricao } : { descricao: string }) {
    const [lerMais, setLerMais] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (textRef.current && textRef.current.clientHeight >= 60) {
            setShowButton(true);
        }
    }, [descricao]);

    return (
        <div className={styles.descricao}>
            <h2>Descrição</h2>
            <div className={styles.textBox}>
                <p 
                    style={{ textWrap: "wrap" }} 
                    className={(lerMais ? "" : styles.descricao__text)} 
                    ref={textRef}
                >
                    {descricao}
                </p>
                {showButton && !lerMais && <div className={styles.blockText} />}
            </div>
            {showButton && (
                <button onClick={() => setLerMais(!lerMais)} className={styles.lerMais}>
                    {lerMais ? "Ler menos" : "Ler mais"}
                </button>
            )}
        </div>
    )
}
"use client"

import { useState } from "react"
import styles from "./tamanho.module.css"

interface TamanhosProps { 
    tamanhos: { tamanho: string, quantidade: number }[];
    setTamanho: (tamanho: string) => void,
    empty?: boolean,
}


export default function Tamanhos({ tamanhos, setTamanho, empty = false } : TamanhosProps ) {
    const [checked, setChecked] = useState<string | undefined>()

    function handleChecked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const target = event.target as HTMLLabelElement;
        setChecked(target.id);
        setTamanho(target.id);
    }

    const checkedButton = {
        backgroundColor: "var(--cor-primaria)", 
        color: "#FFF",
        borderColor: "var(--cor-primaria)",
        textDecoration: "underline"
    }

    return(
        <>
    {!empty ?        
        <div className={styles.tamanhos}>
            {["PP", "P", "M", "G", "GG", "GX" ].map((tamanho, index) => (
                tamanhos.find(tam => tam.tamanho == tamanho)?.quantidade ?? 0 > 0
                ? <button 
                    key={index} 
                    className={styles.tamanho} 
                    style={checked == tamanho ? checkedButton : {} } 
                    onClick={(e) => handleChecked(e)}
                    id={tamanho}
                >
                    {tamanho}
                </button>
                : <button key={index} className={styles.tamanho + " " + styles.disabled} disabled>
                    {tamanho}
                </button>
        ))}
        </div>
    : <div className={styles.tamanhos}>
        {["PP", "P", "M", "G", "GG", "GX" ].map((tamanho, index) => (
        <button 
            key={index} 
            className={styles.tamanho} 
            style={checked == tamanho ? checkedButton : {} } 
            onClick={(e) => handleChecked(e)}
            id={tamanho}
        >
            {tamanho}
        </button>
        ))}
    </div>
    }
    </>

    )
}
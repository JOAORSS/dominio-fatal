"use client"

import { useEffect, useState } from "react"
import styles from "./cor.module.css"

interface CoresProps {
    cores: {cor: string, hex: string}[]
    setCor: (cor: string) => void
    setTamanho: (tamanho: string) => void
}

export default function Cores({ cores, setCor, setTamanho } : CoresProps) {
    const [checked, setChecked] = useState<string | undefined>()

    useEffect(() => {
        if (cores.length === 1) {
            setCor(cores[0].cor);
        }
    }, [cores, setCor]);



    const checkedStyle = {
        backgroundColor: "var(--cor-primaria)", 
        color: "#FFF",
        borderColor: "var(--cor-primaria)",
        textDecoration: "underline"
    }

    const unCheckedStyle = {
        opacity: "1",
    }
    
    return(
        <div className={styles.cores}>
            {cores.map(({cor, hex}, index) =>(
                <button
                    onClick={() => {setChecked(cor); setCor(cor); setTamanho("")}}
                    className={styles.colorButton} 
                    key={`color-${index}`} 
                    style={{transition: "80ms",
                        ...(checked !== cor && unCheckedStyle),
                        ...(checked == cor && checkedStyle),
                    }}
                >
                    <label className={styles.colorLabel} >{cor}</label>
                    <input 
                        name="cor" 
                        type="radio"
                        className={styles.cor} 
                        style={{backgroundColor: hex}}

                        value={cor} 
                    />
                </button>
            ))}
        </div>
    )
}
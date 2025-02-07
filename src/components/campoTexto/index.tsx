"use client"

import { IMaskInput } from "react-imask";
import styles from "./campoTexto.module.css"

interface inputTextProps { 
    placeholder?: string, 
    maxWidth?: string,
    maxHeigth?: string,
    masked?: boolean | string,
    text: string,
    onChange: (text:string) => void,
}

export default function CampoTexto({ placeholder, maxWidth, maxHeigth, text, onChange, masked = false }: inputTextProps) {

    const widthStyle = {maxWidth: maxWidth, maxHeight: maxHeigth};

    return (
            masked 
            ? <IMaskInput 
                className={styles.campoTexto} 
                style={{maxWidth: maxWidth, fontSize: "1rem", padding: "0", paddingRight: "12px", paddingLeft: "12px"}} 
                type="text" 
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                mask="00000-000"
                placeholder="00000-000"
                id="cep"
                name="cep" 
            /> 
            : <input 
                className={styles.campoTexto +" apper"} 
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
                style={widthStyle} 
                type="text" 
                placeholder={placeholder} 
            />
    )
}
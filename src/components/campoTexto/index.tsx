"use client"

import { IMaskInput } from "react-imask";
import styles from "./campoTexto.module.css"
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";

interface inputTextProps { 
    placeholder?: string, 
    maxWidth?: string,
    maxHeigth?: string,
    type?: "normal" | "password" | "masked",
    text: string,
    onChange: (text:string) => void,
}

export default function CampoTexto({ placeholder, maxWidth, maxHeigth, text, onChange, type = "normal" }: inputTextProps) {
    
    const [verSenha, setVerSenha] = useState<boolean>(false);
    const widthStyle = {maxWidth: maxWidth, maxHeight: maxHeigth};

    return (
        <>
            {type == "masked" && 
            <IMaskInput 
                className={styles.campoTexto} 
                style={{maxWidth: maxWidth, fontSize: "1rem", padding: "0", paddingRight: "12px", paddingLeft: "12px"}} 
                type="text" 
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                mask="00000-000"
                placeholder="00000-000"
                id="cep"
                name="cep" 
            /> }
            {type == "normal" && 
            <input 
                className={styles.campoTexto +" apper"} 
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
                style={widthStyle} 
                type="text"
                placeholder={placeholder} 
            />}
            {type == "password" &&
            <div className={styles.password}>
                <input 
                    className={styles.campoTexto +" apper"} 
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
                    style={widthStyle} 
                    type={verSenha ? "text" : "password"}
                    placeholder={placeholder}
                />
                <button 
                    className={styles.eyeButton} 
                    onClick={() => setVerSenha(!verSenha)}
                    type="button"
                >
                    {verSenha 
                    ? <LuEye 
                        style={{position: "absolute", right: "2px", left: "2px"}}
                        size={24} 
                        color="var(--cor-primaria)" 
                    /> 
                    : <LuEyeClosed 
                        style={{position: "absolute", right: "2px", left: "2px"}}
                        size={24} 
                        color="var(--cor-primaria)" 
                    />}
                </button>
            </div>
            }
        </>
    )
}
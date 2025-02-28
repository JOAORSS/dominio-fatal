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
    inputName?: string,
    type?: "normal" | "password" | "masked",
    text: string,
    validation?: () => boolean,
    onChange: (text:string) => void,
}

export default function CampoTexto(
    { 
        placeholder,
        inputName,
        maxWidth, 
        maxHeigth, 
        text, 
        validation, 
        onChange, 
        type = "normal" 
    }
        : inputTextProps) {
    
    const widthStyle = {maxWidth: maxWidth || "", maxHeight: maxHeigth || ""};
    const [erro, setErro] = useState<boolean>(false);


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
                className={styles.campoTexto +" apper " + (erro && styles.erro)} 
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
                style={widthStyle}
                name={inputName}
                type="text"
                placeholder={placeholder} 
                onBlur={() => {
                    if (validation && validation()) {
                        setErro(true);
                    } else {
                        setErro(false);
                    }
                }}
            />}
            {type == "password" && 
                <SenhaCampo 
                    text={text} 
                    onChange={onChange} 
                    erro={erro} 
                    setErro={setErro} 
                    placeholder={placeholder!}
                    validation={validation!}
                    inputName={inputName!} 
                    widthStyle={widthStyle} 
                />
            }
        </>
    )
}


function SenhaCampo(
    {
        text,
        inputName,
        placeholder,
        validation,
        onChange, 
        widthStyle,
        erro,
        setErro,
    } : 
    {
        text: string, 
        inputName: string,
        placeholder: string,
        validation: () => boolean,
        onChange: (text: string) => void, 
        widthStyle?: {maxWidth: string, maxHeight: string},
        erro: boolean,
        setErro: (erro: boolean) => void
    }
    ){
        const [verSenha, setVerSenha] = useState<boolean>(false);

        return(
            <div className={styles.password}>
            <input 
                className={styles.campoTexto +" apper " + (erro && styles.erro)} 
                value={text}
                name={inputName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                onBlur={() => {
                    if (validation && validation()) {
                        setErro(true);
                    } else {
                        setErro(false);
                    }
                }}
                style={widthStyle} 
                type={verSenha ? "text" : "password"}
                placeholder={placeholder}
            />
            <button 
                className={styles.eyeButton} 
                onClick={() => setVerSenha(!verSenha)}
                type="button"
                style={{position: 'absolute', right: "10px",top: "8px"}}
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
        )
    }
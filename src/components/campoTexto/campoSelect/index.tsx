"use client"

import styles from "../campoTexto.module.css"
import estados from "./estados.json"

interface inputTextProps { 
    required?: boolean,
    maxWidth?: string,
    maxHeigth?: string,
    widthContent?: string,
    inputName?: string,
    disabled?: boolean,
    selected: string,
    onChange: (text:string) => void,
    options?: {label: string, value: string}[]
}

export default function CampoSelect(
    { 
        inputName,
        maxWidth, 
        maxHeigth,
        widthContent,
        disabled = false,
        options = estados,
        selected = options[0].value, 
        onChange, 
        required = false,
    }
        : inputTextProps) {
    
    const widthStyle = {maxWidth: maxWidth || "", maxHeight: maxHeigth || "", width: widthContent || ""};

    return (
            <select 
                className={styles.campoSelect + " " + (disabled && styles.disabled) + " apper"  } 
                value={selected}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)} 
                style={{ ...widthStyle }}
                name={inputName}
                required={required}
                disabled={disabled}
            >
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>{option.label}</option>
                    )
                })}
            </select>
    )
}
"use client"

import styles from "../login.module.css"
import { useState } from "react";
import FormCadastro from "@/components/cadastro/formCadastro";
import CadastroOptions from "@/components/cadastro";

export default function Login() {
    const [toForm, setToForm] = useState<boolean>(false);
    const [cadastroToggle, setCadastroToggle] = useState<boolean>(false);

    return(
        <main className={styles.leyoutlogin}>
            {cadastroToggle && (
            <FormCadastro 
                setCadastroToggle={setCadastroToggle} 
            />
            )}
            {!cadastroToggle && (
            <CadastroOptions 
                styles={styles} 
                setCadastroToggle={setCadastroToggle} 
                toForm={toForm}
                setToForm={setToForm}
            />
            )}
        </main>
    )
}
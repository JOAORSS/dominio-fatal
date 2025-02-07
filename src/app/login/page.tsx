"use client"

import Button from "@/components/button";
import CampoTexto from "@/components/campoTexto";
import styles from "./login.module.css"
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return(
        <main className={styles.leyoutlogin}>
            <section className={styles.loginContainer}>
                <div className={styles.login +" apper"} style={{marginLeft: "40px"}}>
                    <h2 className={styles.texto}>Faça login com sua conta!</h2>
                    <CampoTexto text={email} onChange={setEmail} placeholder="ExemploDeConta@email.com" maxHeigth="40px" maxWidth="296px" />
                    <CampoTexto text={senha} onChange={setSenha} placeholder="***********" maxHeigth="40px" maxWidth="296px" />
                    <Button maxWidht="296px" type="outline">Entrar</Button>
                </div>
                <div className={styles.divisoria__container}>
                    <div className={styles.divisoria} />
                    <h2>Ou</h2>
                    <div className={styles.divisoria} />
                    <Link className={styles.link} href={"/login/cadastro"}>Não possue uma conta?<br/>Cadastre!</Link>
                </div>
                <div className={styles.login} style={{marginRight: "40px"}}>
                    <h2 className={styles.texto +" apper"}>Conecte com<br/>Google ou Facebook!</h2>
                    <button className={styles.icon +" apper"}>Entrar com google<FcGoogle size={34} /></button>
                    <button className={styles.icon +" apper"}>Entrar com Facebook<FaFacebook size={34} color="#1f7bf2" /></button>
                </div>
            
            </section>
        </main>
    )
}
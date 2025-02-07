"use client"

import styles from "../login.module.css"
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Button from "@/components/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
const [out, setOut] = useState(false);
const router = useRouter();

    return(
        <main className={styles.leyoutlogin}>
            <div className={styles.loginContainer}>
                <section className={styles.cadastro + " " +(out ? styles.cadastroOut : "")}>
                    {!out && <div className={styles.buttons_container +" apper"}>
                        <h2 className={styles.texto}>Cadastre sua conta!</h2>
                        <Button type="outline" >Cadastrar na domínio fatal</Button>
                        <button className={styles.icon +" apper"}>Cadastrar com google<FcGoogle size={34} /></button>
                        <button className={styles.icon +" apper"}>Cadastrar com Facebook<FaFacebook size={34} color="#1f7bf2" /></button>
                    </div>}
                    {out && <div className={styles.divisoria__container}>
                        <div className={styles.divisoria +" "+ styles.divisoria__in} />
                        <h2 className="apper">Ou</h2>
                        <div className={styles.divisoria +" "+ styles.divisoria__in} />
                        <Link className={styles.link +" apper"} href={"/login"}>Não possue uma conta?<br/>Cadastre!</Link>
                    </div>}
                    {!out 
                    && <Link 
                        className={styles.link +" apper"} 
                        onClick={(e) => {
                            e.preventDefault();
                            setOut(true); 
                            setTimeout(() => {router.push("/login")}, 650)}} 
                        href={"/login"}
                    >Já possue uma conta?
                    <br/>Faca Login!
                    </Link> }
                </section>
            </div>
        </main>
    )
}
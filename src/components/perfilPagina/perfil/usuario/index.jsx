"use client"

import Image from "next/image"
import styles from "../../perfil.module.css"
import { useEffect, useState } from "react";
import { auth } from "@/auth";

// colocar as infos do usuario corretamente (props)

export default async function Usuario() {

    const [session, setSession] = useState(null);

    useEffect(() => {
        auth().then(sessionData => {
            setSession(sessionData);
        });
    }, []);

    return(
        <div>
            <h3 className={styles.infoBoxLabel}>Usuario</h3>
            <div className={styles.infoBox}>
                <Image 
                    className={styles.imagemUsuario}
                    src={session?.user?.image}
                    alt="imagem do usuario"
                    width={100}
                    height={100}
                />
                <div className={styles.perfilInfo}>
                    <h3 className={styles.nome}>João Vitor Raneke dos Santos</h3>
                    <p className={styles.email}>joaors987654321@gmail.com</p>
                </div>
            </div>
        </div>
        
        )
}
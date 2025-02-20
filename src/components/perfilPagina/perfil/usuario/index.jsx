"use client"

import Image from "next/image"
import styles from "../../perfil.module.css"
import { useEffect, useState } from "react";
import { auth } from "@/auth";

// colocar as infos do usuario corretamente (props)

export default function Usuario() {

    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await auth();
            setSession(sessionData);
        };

        fetchSession();
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
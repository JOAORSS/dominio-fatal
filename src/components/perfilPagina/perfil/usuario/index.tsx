import Image from "next/image"
import styles from "../../perfil.module.css"
import { auth } from "@/auth";


export default async function Usuario() {

    const session = await auth();

    const image = session?.user?.image;
    const name = session?.user?.name;
    const email = session?.user?.email;

    return(
        <div>
            <h3 className={styles.infoBoxLabel}>Usuario</h3>
            <div className={styles.infoBox}>
                <Image 
                    className={styles.imagemUsuario}
                    src={image!}
                    alt="imagem do usuario"
                    width={200}
                    height={200}
                />
                <div className={styles.perfilInfo}>
                    <h3 className={styles.nome}>{name!}</h3>
                    <p className={styles.email}>{email!}</p>
                </div>
            </div>
        </div>
        
        )
}
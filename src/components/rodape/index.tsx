import Image from "next/image"
import styles from "./rodape.module.css"


export default function Rodape() {
    return(
        <footer className={styles.footer}>
            <Image 
                src="/images/logo-branco.svg" 
                alt="Logo"
                width={150} 
                height={70} 
            />
        </footer>
    )
}
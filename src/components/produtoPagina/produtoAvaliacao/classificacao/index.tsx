import Image from "next/image"
import styles from "./classificacao.module.css"

export default function Classificacao() {
    return (
        <div className={styles.classificacao}>
            <h3 className={styles.titulo}>Classificacao</h3>
            <div className={styles.classificacao__card}>
                <Image 
                    className={styles.imagem}
                    src="/images/positivo.png"
                    alt="avaliacao"
                    width={150}
                    height={150}
                />
                <h2 className={styles.destaque} >Muito positiva</h2>
                <p className={styles.aviso} >Muitos usuarios possuem este produto na lissta de interesse</p>
            </div>
        </div>
    )
}
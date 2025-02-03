import Image from "next/image";
import styles from "../../perfil.module.css";

export default function Cartao() {
    return (
            <div className={styles.infoBox}>
                <Image 
                    src="/images/cartao.png"
                    alt="imagem cartão"
                    width={60}
                    height={60}
                />
                <div className={styles.perfilInfo}>
                    <h3 className={styles.nome}>Número do Cartão</h3>
                    <p className={styles.email}>✱✱✱✱  ✱✱✱✱  ✱✱✱✱ 8026</p>
                </div>
            </div>
            )
}
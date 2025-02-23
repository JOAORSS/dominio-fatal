import Image from "next/image";
import styles from "../../perfil.module.css";
import { IoIosAddCircle } from "react-icons/io";

export default function Cartao({ adicionar }: { adicionar?: boolean }) {
    return (
        !adicionar 
            ? (
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
            : (
                <button 
                    className={styles.infoBox +" "+ styles.adicionar}
                    style={{marginLeft: "20px", marginTop: "10px"}}
                >
                    <IoIosAddCircle size={50} color="var(--detalhes)" />
                    <div className={styles.perfilInfo}>
                        <h3 
                            className={styles.nome} 
                            style={{color: "var(--detalhes)"}}
                        >Adicionar Cartão
                        </h3>
                    </div>
                </button>
            )
    )
}

// adidioncar on clik 
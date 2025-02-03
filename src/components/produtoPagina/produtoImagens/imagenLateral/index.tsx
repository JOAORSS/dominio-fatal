import Image from "next/image"
import styles from "./imagemLateral.module.css"

export default function ImagenLateral({ imagen, imagemSelecionada, onClick }: { imagen: string, imagemSelecionada: string ,onClick: (imagen: string) => void }) {
    return (
            <button 
                className={styles.imagemLateralContainer}
                style={imagen == imagemSelecionada ? {opacity: "1"} : {opacity: "0.3"}}
            >
                <Image
                    src={imagen}
                    alt="Imagem do produto"
                    width={100}
                    height={100}
                    onClick={() => onClick(imagen)}
                    className={styles.imagemLateral}
                />
            </button>
    )
}
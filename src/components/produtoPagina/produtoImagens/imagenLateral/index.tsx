import Image from "next/image"
import styles from "./imagemLateral.module.css"

export default function ImagenLateral({ imagen, onClick }: { imagen: string, onClick: (imagen: string) => void }) {
    return (
            <button className={styles.imagemLateralContainer}>
                <Image
                    src={imagen}
                    alt="Imagem do produto"
                    width={60}
                    height={100}
                    onClick={() => onClick(imagen)}
                    className={styles.imagemLateral}
                />
            </button>
    )
}
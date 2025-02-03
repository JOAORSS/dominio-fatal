import Image from "next/image";
import styles from "./comentario.module.css"

export default function Comentario() {
    return (
        <div className={styles.comentario}>
            <h4 className={styles.escritaDestaque}>Usuário</h4>
            <div className={styles.comentario__texto}>
                <Image
                    src="/images/comentarioLine.svg"
                    alt="comentario line"
                    width={15}
                    height={15}
                />
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit purus ac fringilla viverra. Fusce mi sem, ullamcorper placerat faucibus nec, malesuada nec tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi auctor volutpat risus, sagittis vehicula ipsum congue non.
                </p>
            </div>
        </div>
    )
}
import Image from "next/image";
import styles from "./comentario.module.css"

export default function Comentario({usuario, comentario} : {usuario:string ,comentario: string}) {
    return (
        <div className={styles.comentario}>
            <h4 className={styles.escritaDestaque}>{usuario}</h4>
            <div className={styles.comentario__texto}>
                <Image
                    src="/images/comentarioLine.svg"
                    alt="comentario line"
                    width={15}
                    height={15}
                />
                <p>{comentario}</p>
            </div>
        </div>
    )
}
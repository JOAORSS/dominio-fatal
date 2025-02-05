import styles from "./avaliacao.module.css"
import Classificacao from "./classificacao"
import Comentarios from "./comentarios"

export default function ProdutoAvaliacao({comentarios}:{ comentarios: {usuario: string, comentario:string}[]}) {
    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Avaliações</h2>
            <div className={styles.avaliacao}>
                <Comentarios comentarios={comentarios} />
                <Classificacao />
            </div>
        </div>

    )
}
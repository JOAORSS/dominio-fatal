import styles from "./produto.module.css"

export default function ProdutoLeyout({ children }: { children: React.ReactNode }) {
    return (
        <section className={styles.leyout}>
            {children}
        </section>
    )
}
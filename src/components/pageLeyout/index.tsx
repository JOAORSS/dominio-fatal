import styles from "./pagesLeyout.module.css"

export default function PageLeyout({ children}: { children: React.ReactNode }) {
    return (
        <main className={styles.pageLeyout}>
            {children}
        </main>
    )

}
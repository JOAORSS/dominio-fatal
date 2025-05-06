import styles from "../contextMenu.module.css"

export default function OptionButtonSort({children, hint}: {children: React.ReactNode, hint: string}) {
    return (
        <>
            <button title={hint} className={styles.contextMenuItem}>
                {children}
            </button>

        </>
    )
}
import styles from "./sectionLabel.module.css"

export default function SectionLabel({ title }: { title: string }) {
    return (
        <div className={styles.sectionLabel}>
            <h2 className={styles.label}>{title}</h2>
        </div>
    );
}

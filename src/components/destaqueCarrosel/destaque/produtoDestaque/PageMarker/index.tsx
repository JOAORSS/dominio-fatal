"use client"


import styles from "./pageMarker.module.css";

export default function PageMarker({ active = false, onClick }: { active?: boolean, onClick?: () => void }) {
    return(
        <> 
            <div
                onClick={onClick}
                className={styles.marker + " " + (active ? styles.marker__active : styles.hover)}
            />
        </>
    )
}
import { useEffect } from "react";
import styles from "./warning.module.css"
import { IoIosClose } from "react-icons/io";

export default function Warning({ text, close, good = false }: { text: string, close: () => void, good?: boolean }) {

    useEffect(() => {
        const timer = setTimeout(() => close(), 4995);
        return () => clearTimeout(timer);
    }, [close])
    return (
        <span className={styles.warning} style={{ borderColor: good ? "#00ff00" : "#721c24" }}>
            <IoIosClose onClick={() => close()} size={25} className={styles.close} />
            {text}
            <div className={styles.closeIn} />
        </span>
    )
}
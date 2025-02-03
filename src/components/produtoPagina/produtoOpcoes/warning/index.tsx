import { useEffect } from "react";
import styles from "./warning.module.css"
import { IoIosClose } from "react-icons/io";

export default function Warning({ text, close }: { text: string, close: () => void }) {

    useEffect(() => {
        const timer = setTimeout(() => close(), 4995);
        return () => clearTimeout(timer);
    }, [close])
    return (
        <span className={styles.warning}>
            <IoIosClose onClick={() => close()} size={25} className={styles.close} />
            {text}
            <div className={styles.closeIn} />
        </span>
    )
}
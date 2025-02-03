import { ReactNode } from "react";
import styles from "./container.module.css";

interface ContainerProps {
    children: ReactNode;
    center?: boolean;
}

export default function Container({ children, center = false }: ContainerProps) {
    return (
        <div className={styles.container + " " + (center && styles.centered) }>
            {children}
        </div>
    );
}
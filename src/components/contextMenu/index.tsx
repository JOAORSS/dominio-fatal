import styles from "./contextMenu.module.css";

export default function ContextMenuCell({
    children,
    position: {x,y}
}: {
    children: React.ReactNode,
    position: {x: number, y: number,}
}) {

    return(
        <div className={styles.contextMenu} style={{top: y, left: x}}>
            {children}
        </div>
    )
}
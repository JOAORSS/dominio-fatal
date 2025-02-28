import styles from "./loading.module.css"

export default function LoadingPage(){
    return(
        <>
            <div className={"blackout"} />
            <div className={styles.loading + " loading"} />
        </>

    )
}
import styles from "./loading.module.css"

export default function LoadingPage(){
    return(
        <>
            <div className={"blackout"} style={{zIndex: "1200"}} />
            <div className={styles.loading + " loading"} />
        </>

    )
}
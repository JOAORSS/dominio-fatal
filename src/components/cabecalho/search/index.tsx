import { TbSearch } from "react-icons/tb";
import styles from "./search.module.css";


export default function Search() {
    return(
        <form className={styles.search} action="/search" method="get">
            <button className={styles.search__icon} type="submit"><TbSearch size={30} color="var(--cor-primaria)" /></button>
            <input className={styles.search__bar} type="text" placeholder="Pesquisar..." />
        </form>
    )
}
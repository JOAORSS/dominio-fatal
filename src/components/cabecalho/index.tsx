import Image from "next/image"
import styles from "./cabecalho.module.css"
import { RiUserLine } from "react-icons/ri"
import { BsFillHandbagFill } from "react-icons/bs"
import Search from "./search"
import Container from "../container"
import Link from "next/link"

export default function Cabecalho() {
    return(
        <header className={styles.cabecalho}>
            <Container>
                <Link href={"/"}>
                <Image 
                    src="/images/logo-branco.svg" 
                    alt="Logo" 
                    width={195} 
                    height={60}
                    />
                </Link>
                <Search />
                <nav className={styles.nav}>
                    <Link href={"/perfil"}><RiUserLine size={50} color="#FFFF" /></Link>
                    <Link href={"/sacola"}><BsFillHandbagFill size={50} color="#FFF" /></Link>
                </nav>
            </Container>
        </header>
    )
}
import Image from "next/image"
import styles from "./cabecalho.module.css"
import { RiUserLine } from "react-icons/ri"
import { BsFillHandbagFill } from "react-icons/bs"
import Search from "./search"
import Container from "../container"
import Link from "next/link"
import { auth } from "@/auth"

export default async function Cabecalho() {

    const session = await auth();
        

    return(
            <header className={styles.cabecalho__container}>
                <section className={styles.cabecalho}>
                    <Container>
                        <Link href={"/"}>
                        <Image 
                            src="/images/logo-branco.svg" 
                            alt="Logo" 
                            width={195} 
                            height={60}
                            priority
                        />
                        </Link>
                        <Search />
                        <nav className={styles.nav}>
                            <Link href={session?.user ? "/perfil" : "/login"}>
                                <RiUserLine size={50} color="#FFFF" />
                            </Link>
                            <Link href={session?.user ? "/sacola" : "/login"}>
                                <BsFillHandbagFill size={50} color="#FFF" />
                            </Link>
                        </nav>
                    </Container>
                </section>
            </header>
    )
}
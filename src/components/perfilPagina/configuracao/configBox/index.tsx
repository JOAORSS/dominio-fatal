"use client"

import Link from "next/link";
import styles from "../../perfil.module.css";
import { TbUserEdit, TbMessageUser } from "react-icons/tb";
import { GoLaw } from "react-icons/go";
import { CgLock } from "react-icons/cg";
import { IoMdPaper } from "react-icons/io";
import { FaGears } from "react-icons/fa6";
import { useRouter } from 'next/navigation'
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { doLogout } from "@/services/auth/actions";


interface ConfigBoxProps {
    typePerfil: 
    "editar" 
    | "seguranca" 
    | "configuracoes" 
    | "historico" 
    | "FAC"
    | "legal"
    | "sair";
}

const reacIconsProps = {
    size: 40,
    color: "var(--cor-primaria)"
}

const perfilDictionary = {
    "editar": {image: <TbUserEdit {...reacIconsProps} />, link: "/perfil/editar", titulo: "Atualizar dados da conta", descricao: "Atualizar dados relativos a conta, nome, telefone, endereco..."},
    "seguranca": {image: <CgLock {...reacIconsProps} />, link: "/perfil/seguranca", titulo: "Segurança", descricao: "Configurações de segurança da sua conta."},
    "configuracoes": {image: <FaGears {...reacIconsProps} />, link: "/perfil/configuracoes", titulo: "Configurações", descricao: "Configurações gerais do site."},
    "historico": {image: <IoMdPaper {...reacIconsProps} />, link: "/perfil/historico", titulo: "Histórico de compras", descricao: "Veja o registro de todas as compras que sua conta já efetuou."},
    "FAC": {image: <TbMessageUser {...reacIconsProps} />, link: "/perfil/FAC", titulo: "Fale conosco", descricao: "Canal para entrar em contato com nossos representantes."},
    "legal": {image: <GoLaw {...reacIconsProps} />, link: "/perfil/legal", titulo: "Informações legais", descricao: "Informações legais da empresa."},
    "sair": {image: <IoMdExit {...reacIconsProps} />, link: "/perfil/sair", titulo: "Sair", descricao: "Sair da conta."}
};


export default function ConfigBox({ typePerfil } : ConfigBoxProps) {

    const router = useRouter();

    return (
        <button 
            onClick={() => router.push(perfilDictionary[typePerfil].link)} 
            className={styles.configBox}
        >
            <div className={styles.configBoxContent}>
                {perfilDictionary[typePerfil].image}
                <div className={styles.textoBox}>
                    <h3 className={styles.titulo}>{perfilDictionary[typePerfil].titulo}</h3>
                    <p className={styles.descricao}>{perfilDictionary[typePerfil].descricao}</p>
                </div>
            </div>
            <Link 
                className={styles.configSeta} 
                href={perfilDictionary[typePerfil].link}
            >
                <IoArrowForwardCircleOutline {...reacIconsProps} />
            </Link>
        </button>
    )
}


export function Logout({ typePerfil } : ConfigBoxProps) {
    return (
        <form action={doLogout}>
            <button
                className={styles.configBox}
                type="submit"
            >
                <div className={styles.configBoxContent}>
                    {perfilDictionary[typePerfil].image}
                    <div className={styles.textoBox}>
                        <h3 className={styles.titulo}>{perfilDictionary[typePerfil].titulo}</h3>
                        <p className={styles.descricao}>{perfilDictionary[typePerfil].descricao}</p>
                    </div>
                </div>
                <Link 
                    className={styles.configSeta} 
                    href={perfilDictionary[typePerfil].link}
                >
                    <IoArrowForwardCircleOutline {...reacIconsProps} />
                </Link>
            </button>
        </form>
    )
}
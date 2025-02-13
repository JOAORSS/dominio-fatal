import { FcGoogle } from "react-icons/fc";
import Button from "../button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./cadastro.module.css";
import { SiInstagram } from "react-icons/si";

interface CadastroPageProps {
    toForm: boolean;
    setToForm: (value: boolean) => void;
    styles: { [key: string]: string };
    setCadastroToggle: (value: boolean) => void;
}

export default function CadastroOptions({ toForm, setToForm, setCadastroToggle }: CadastroPageProps) {

    const [toLogin, setToLogin] = useState<boolean>(false);
    const [out, setOut] = useState<boolean>(false);
    const router = useRouter();

    return(
        <section className={styles.container +" "+ (toLogin && styles.toLogin) +" "+ (toForm && styles.toForm)}>
            {!toLogin 
            ? <>
                <h2 className={
                        styles.texto +" "+
                        (out && "desapper")
                    }
                >Cadastre sua conta!</h2>                    
                <div className={
                        styles.opcoes 
                        +" apper "+ 
                        (out && "desapper")
                    }
                >
                    <Button 
                        onClick={() => {
                            setOut(true)
                            setToForm(true);
                            setTimeout(() => {
                                setOut(false);
                                setCadastroToggle(true);
                                setToForm(false);
                        }, 800)}} 
                        type="outline" 
                    >
                        Cadastrar na domínio fatal
                    </Button>
                    <button className={
                            styles.buttons 
                            +" apper "+ 
                            (out && "desapper")
                        }
                    >
                        Cadastrar com google<FcGoogle size={34} />
                    </button>
                    <button className={
                            styles.buttons 
                            +" apper "+ 
                            (out && "desapper")
                        }
                    >
                        Cadastrar com Instagram<div className={styles.instagram}> <SiInstagram size={24} color="#fff" /> </div>
                    </button>
                </div>             
                <Link 
                    className={
                        styles.link 
                        +" apper "+ 
                        (out && "desapper")
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        setOut(true);
                        setTimeout(() => {setToLogin(true)}, 300)
                        setTimeout(() => {router.push("/login")}, 900)
                        }} 
                    href={"/login"}
                >Já possue uma conta?<br/>Faca Login!
                </Link>
            </>
            : <div className={styles.divisoria__container}>
                <div className={styles.divisoria__in} />
                    <h2 className="apper">Ou</h2>
                <div className={styles.divisoria__in} />
                    <Link 
                        className={
                            styles.link +" apper "} 
                        href={"/login"}
                    >Não possue uma conta?<br/>Cadastre!
                    </Link>
                </div>}
            </section>
    )
}
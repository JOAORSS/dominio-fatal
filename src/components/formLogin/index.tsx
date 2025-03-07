"use client"

import styles from "./formLogin.module.css"
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { doCredentialLogin, doSocialLogin } from "@/services/auth/actions";
import Button from "@/components/button";
import CampoTexto from "@/components/campoTexto";
import Warning from "../produtoPagina/produtoOpcoes/warning";
import LoadingPage from "../loading";

export default function FormLogin(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [toCadastro, setToCadastro] = useState(false);
    const [out, setOut] = useState(false);
    const [warningCredentials, setWarningCredentials] = useState<string | boolean>(false);
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try{
            const formData = {
                email: email,
                senha: senha
            };

            const response = await doCredentialLogin(formData);

            if (!!response.error) {
                setWarningCredentials(response.error.message);
            } else {
                router.refresh();
                router.push("/");
            }
            setLoading(false);

        } catch(error){
            if (error) setWarningCredentials("Considere checar se o email ou senha estão incorretos")
            setLoading(false);
        }
    }

    return(
        <section 
            className={
                styles.loginContainer +" "+ 
                (toCadastro 
                && styles.toCadastro)
                }
            >
            <form
                onSubmit={handleFormSubmit}
                style={{marginLeft: "40px"}}
                className={
                    styles.login 
                    +" apper "+ 
                    (out && "desapper")
                } 
            >
                <h2 className={styles.texto}>Faça login com sua conta!</h2>
                <CampoTexto 
                    text={email} 
                    onChange={setEmail} 
                    validation={() => (email.length < 3 || !email.includes("@") || !email.includes("."))}
                    placeholder="ExemploDeConta@email.com" 
                    inputName="email"
                    maxHeigth="40px" 
                    maxWidth="296px"
                />
                <CampoTexto 
                    type="password" 
                    text={senha}
                    onChange={setSenha}
                    validation={() => senha.length < 3}
                    inputName="senha"
                    placeholder="***********" 
                    maxHeigth="40px" 
                    maxWidth="296px" 
                />
                <Button 
                    maxWidht="296px"
                    type="outline"
                    onClick={() => setLoading(true)}
                >Entrar
                </Button>
            </form>
            <div className={styles.divisoria__container +" "+ (out && "desapper") }>
                <div className={styles.divisoria} />
                <h2>Ou</h2>
                <div className={styles.divisoria} />
                <Link 
                    className={styles.link} 
                    href={"/login/cadastro"}
                    onClick={(e) => {
                        e.preventDefault();
                        setOut(true);
                        setTimeout(() => setToCadastro(true), 300);
                        setTimeout(() => {redirect("/login/cadastro")}, 900);
                        }
                    }
                >
                    Não possue uma conta?<br/>Cadastre!
                </Link>
            </div>
            <form 
                action={doSocialLogin}
                className={styles.login} 
                style={{marginRight: "40px"}}
            >
                <h2 
                    className={
                        styles.texto 
                        +" apper "+ 
                        (out && "desapper")
                    }
                >Conecte com<br/>Google ou Facebook!
                </h2>
                <button 
                    type="submit"
                    name="action"
                    value="google"
                    className={
                        styles.icon 
                        +" apper "+ 
                        (out && "desapper")
                    }
                >Entrar com google<FcGoogle size={34} />
                </button>
                <button 
                    type="submit"
                    name="action"
                    value="facebook"
                    className={
                        styles.icon 
                        +" apper "+ 
                        (out && "desapper")
                        }
                >Entrar com facebook<FaFacebook size={34} color="#1877f2" />
                </button>
            </form>
            {loading && <LoadingPage />}
            {warningCredentials && <Warning close={() => setWarningCredentials(false)} text={String(warningCredentials)} />}
        </section>
    )
}
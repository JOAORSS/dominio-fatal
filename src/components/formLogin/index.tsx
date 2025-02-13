"use client"
import styles from "./formLogin.module.css"
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SiInstagram } from "react-icons/si";
import { redirect } from "next/navigation";
import { useState } from "react";
import { doSocialLogin } from "@/services/auth/actions";
import Button from "@/components/button";
import CampoTexto from "@/components/campoTexto";

export default function FormLogin(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [toCadastro, setToCadastro] = useState(false);
    const [out, setOut] = useState(false);

    return(
        <section 
                    className={
                        styles.loginContainer +" "+ 
                        (toCadastro 
                        && styles.toCadastro)
                        }
                    >
                    <form 
                        className={
                            styles.login 
                            +" apper "+ 
                            (out && "desapper")
                        } 
                        style={{marginLeft: "40px"}}>
                        <h2 className={styles.texto}>Faça login com sua conta!</h2>
                        <CampoTexto 
                            text={email} 
                            onChange={setEmail} 
                            placeholder="ExemploDeConta@email.com" 
                            maxHeigth="40px" 
                            maxWidth="296px"
                        />
                        <CampoTexto 
                            type="password" 
                            text={senha} 
                            onChange={setSenha} 
                            placeholder="***********" 
                            maxHeigth="40px" 
                            maxWidth="296px" 
                        />
                        <Button 
                            maxWidht="296px" 
                            type="outline"
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
                        >Conecte com<br/>Google ou Instagram!
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
                            value="instagram"
                            className={
                                styles.icon 
                                +" apper "+ 
                                (out && "desapper")
                                }
                        >Entrar com Instagram <div className={styles.instagram}> <SiInstagram size={24} color="#fff" /> </div>
                        </button>
                    </form>
                </section>
    )
}
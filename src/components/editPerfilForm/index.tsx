"use client"

import { useState } from "react";
import CampoTexto from "../campoTexto";
import Button from "../button";
import LoadingPage from "../loading";
import Warning from "../produtoPagina/produtoOpcoes/warning";
import { FaArrowLeft } from "react-icons/fa6";
import styles from "./edit.module.css";

interface FormEditProps {
    setToggle: (option: string | false) => (void)
}

export default function FormEditUser({ setToggle } : FormEditProps) {
    const [nome, setNome] = useState<string>("");
    const [sobrenome, setSobrenome] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [notify, setNotify] = useState<string | false>("");
    const [loading, setLoading] = useState<boolean>(false);
    
    const [out, setOut] = useState<boolean>(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (1 == 1) {
            // const formData = new FormData(e.currentTarget);
            // const created = await updateUser(formData);
    
            // if (created.operation == true) { 
            //     setNotify(created.hint);
            // }
    
            // if (!created.operation) setNotify(created.hint);
    
        } else {
            setNotify("Confirme as informacoes dos campos");
        }
    };

    return(
        <form 
            className={styles.container +" "+ (out && "desapper")}
            style={
                {
                    height: "fit-content",
                    padding: "50px 20px",
                    position: "absolute", 
                    zIndex: "1400",
                    top: "20vh",
                    right: "35vw",
                }
            }
            onSubmit={handleSubmit}
            id="formCadastro"
        >
            <div className={"blackout"} style={{zIndex: "1200"}} />
            <button 
                className={styles.backArrow +" apper "+ (out && "desapper")} 
                style={{
                    position: "absolute",
                    top: "24",
                    left: "20",
                    zIndex: 2
                }}
                onClick={async () => {
                    setOut(true);
                    setTimeout(() => {
                        setToggle(false);
                        setOut(false);
                    }, 400)
                }} 
                type="button"
            >
                <FaArrowLeft 
                    size={30} 
                    color="var(--cor-primaria)" 
                />
            </button>
            <h2 
                style={{marginTop: "0px"}} 
                className={styles.texto +"apper "+ (out && "desapper")}
            >Edite sua conta!
            </h2>
            <section className={styles.form__container +" apper "+ (out && "desapper")}>
                <div className={styles.container__lateral}>
                    <div className={styles.cadastro__container}>
                        <label>Nome</label>
                        <CampoTexto 
                            text={nome} 
                            inputName="nome"
                            onChange={setNome}
                            validation={() => nome.length < 3}
                            placeholder="João Vitor" 
                        />
                    </div>
                    <div className={styles.cadastro__container}>
                        <label>Sobrenome</label>
                        <CampoTexto 
                            text={sobrenome} 
                            inputName="sobrenome"
                            onChange={setSobrenome}
                            validation={() => sobrenome.length < 3}
                            placeholder="Pereira de Palma" 
                        />
                    </div>
                </div>
                <div style={{marginBottom: "16px"}} className={styles.cadastro__container}>
                    <label>Email</label>
                    <CampoTexto 
                        text={email} 
                        inputName="email"
                        onChange={setEmail}
                        validation={() => (email.length < 3 || !email.includes("@") || !email.includes("."))}
                        placeholder="exemeploDeEmail@email.com" 
                    />
                </div>
            </section>
            <div 
                className={out ? "desapper" : ""}
                style={{
                    alignSelf: "center", 
                    width: "436px"}
                    } >
                <Button 
                    onClick={() => {(document.getElementById('formCadastro') as HTMLFormElement)?.requestSubmit(); setLoading(true)}}
                    maxWidht="438px"
                    type="full"
                >Cadastrar
                </Button>
            </div>
            {loading && <LoadingPage />}            
            {!!notify && <Warning close={() => setNotify(false)} text={notify} />}
        </form>
    )
}
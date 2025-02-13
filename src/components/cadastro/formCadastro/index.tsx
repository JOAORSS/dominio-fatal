"use client"

import styles from "./form.module.css"
import CampoTexto from "@/components/campoTexto";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../button";
import { useEffect, useState } from "react";
import zxcvbn from 'zxcvbn';

interface FormCadastroProps { 
    setCadastroToggle: (value: boolean) => void 
}

export default function FormCadastro({ setCadastroToggle } : FormCadastroProps) {
    const [nome, setNome] = useState<string>("");
    const [sobrenome, setSobrenome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [scoreSenha, setScoreSenha] = useState<number>(0);
    const [scoreText, setScoreText] = useState<string>("");
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    const [toCadastroOptions, setToCadastroOptions] = useState<boolean>(false);
    const [out, setOut] = useState<boolean>(false);

    const scoreTable = [
        {hex: "#CF0E0E", text:"Muito fraca"}, 
        {hex: "#CF0E0E", text:"Fraca"}, 
        {hex: "#EEAD2D", text:"Razoável",},
        {hex: "#008A41", text:"Forte",},
        {hex: "#008A41", text:"Muito forte"}]

    useEffect(() => {
        const result = zxcvbn(senha);
        setScoreSenha(result.score);
        setScoreText(scoreTable[result.score].text);
    }, [senha, setSenha]);

    return(
        <form className={styles.container +" "+ (toCadastroOptions && styles.toCadastroOptions)}>
            <button 
                className={styles.backArrow +" apper "+ (out && "desapper")} 
                onClick={async () => {
                    setOut(true);
                    setTimeout(() => setToCadastroOptions(true), 200);
                    setTimeout(() => {
                        setCadastroToggle(false);
                        setOut(false);
                    }, 850)
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
            >Crie seu conta!
            </h2>
            <section className={styles.form__container +" apper "+ (out && "desapper")}>
                <div className={styles.container__lateral}>
                    <div className={styles.cadastro__container}>
                        <label>Nome</label>
                        <CampoTexto 
                            text={nome} 
                            onChange={setNome} 
                            placeholder="João Vitor" 
                        />
                    </div>
                    <div className={styles.cadastro__container}>
                        <label>Sobrenome</label>
                        <CampoTexto 
                            text={sobrenome} 
                            onChange={setSobrenome} 
                            placeholder="Pereira de Palma" 
                        />
                    </div>
                </div>
                <div style={{marginBottom: "16px"}} className={styles.cadastro__container}>
                    <label>Email</label>
                    <CampoTexto 
                        text={email} 
                        onChange={setEmail} 
                        placeholder="exemeploDeEmail@email.com" 
                    />
                </div>
                <div className={styles.cadastro__container}>
                    <label>Senha</label>
                    <CampoTexto 
                        type="password" 
                        text={senha} 
                        onChange={setSenha} 
                        placeholder="Sua senha aqui" 
                    />
                    {scoreSenha 
                        ? <div className={styles.passwordForceContainer}>
                            <div className={styles.passwordForce}>
                                {scoreTable.map((score, index) => (
                                    scoreSenha >= index 
                                    ? <span 
                                        key={`score-${index}`} 
                                        className={styles.passwordForce__line} 
                                        style={{backgroundColor: scoreTable[scoreSenha].hex}} 
                                    />
                                    :<span 
                                        key={`score-${index}`} 
                                        className={styles.passwordForce__line} 
                                        style={{backgroundColor: "var(--detalhes)"}} 
                                    />
                                ))
                            }
                        </div>
                        <p className={styles.passwordForce__notify}>{scoreText}</p>
                          </div>
                        : <div />}
                </div>
                <div className={styles.cadastro__container}>
                    <label>Confirme sua senha</label>
                    <CampoTexto 
                        type="password" 
                        text={confirmarSenha} 
                        onChange={setConfirmarSenha} 
                        placeholder="Confirme sua senha" 
                    />
                </div>
            </section>    
            <div 
                style={{
                    alignSelf: "center", 
                    width: "436px"}
                    } 
                className={(out ? "desapper" : "")}
            >
                <Button maxWidht="438px" type="full">Cadastrar</Button>
            </div>
        </form>
    )
}

// precisa ser maoir q 1 o score
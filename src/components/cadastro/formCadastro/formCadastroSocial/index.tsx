"use client"

import styles from "../form.module.css"
import CampoTexto from "@/components/campoTexto";
import Button from "../../../button";
import { useEffect, useMemo, useState } from "react";
import zxcvbn from 'zxcvbn';
import createUser from "@/services/supabase/createUser";
import Warning from "@/components/produtoPagina/produtoOpcoes/warning";
import LoadingPage from "@/components/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FormCadastroSocial() {

    const { data: session } = useSession();

    const router = useRouter();

    const email = session?.user?.email;
    const sessionNome = session?.user?.name;

    const [nome, setNome] = useState<string>(sessionNome!);
    const [senha, setSenha] = useState<string>("");
    const [scoreSenha, setScoreSenha] = useState<number>(0);
    const [scoreText, setScoreText] = useState<string>("");
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    
    const [notify, setNotify] = useState<string | false>("");
    const [loading, setLoading] = useState<boolean>(false);
    
    const scoreTable = useMemo(() => [
        {hex: "#CF0E0E", text:"Muito fraca"}, 
        {hex: "#CF0E0E", text:"Fraca"}, 
        {hex: "#EEAD2D", text:"Razoável",},
        {hex: "#008A41", text:"Forte",},
        {hex: "#008A41", text:"Muito forte"}
    ], []);

    useEffect(() => {
        const result = zxcvbn(senha);
        setScoreSenha(result.score);
        setScoreText(scoreTable[result.score].text);
    }, [senha, setSenha, scoreTable]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (nome.length > 3 && (senha.length > 3 || scoreSenha > 1) && (confirmarSenha === senha)) {

            const formData = new FormData();
            formData.append("nome", nome!);
            formData.append("adicionar", "true");
            formData.append("email", email!);
            formData.append("senha", senha!);
            const created = await createUser(formData);
    
            if (created.operation == true) { 
                setNotify(created.hint);
                router.push("/");
            }
    
            if (!created.operation) {setNotify(created.hint); setLoading(false)};
    
        } else {
            setNotify("Confirme as informacoes dos campos");
        }
    };

    return(
        <main className={styles.container__adicionar}>
            <form 
                className={styles.container +" apper"} 
                onSubmit={handleSubmit}
                id="formCadastro"
            >
            <h2 
                style={{marginTop: "0px"}} 
            className={styles.texto +"apper"}
            >Adicione informações a conta!
            </h2>
                <section className={styles.form__container +" apper"}>
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
                        <label>Senha</label>
                        <CampoTexto 
                            type="password"
                            inputName="senha" 
                            text={senha} 
                            onChange={setSenha} 
                            validation={() => senha.length <= 8  || scoreSenha < 2}
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
                            inputName="confirmarSenha"
                            onChange={setConfirmarSenha} 
                            validation={() => confirmarSenha !== senha}
                            placeholder="Confirme sua senha" 
                        />
                        </div>
                </section>
                <div 
                    style={{
                        alignSelf: "center", 
                        width: "436px"}
                        } >
                    <Button 
                        onClick={() => {(document.getElementById('formCadastro') as HTMLFormElement)?.requestSubmit(); setLoading(true)}}
                        maxWidht="438px"
                        type="full"
                    >Adicionar
                    </Button>
                </div>
            </form>
            {loading && <LoadingPage />}            
            {!!notify && <Warning close={() => setNotify(false)} text={notify} key={notify} />}
        </main>    
    )
}

import { fetchDataEndereco } from "@/services/supabase";
import styles from "../../perfil.module.css"
// import { auth } from "@/auth";

function EnderecoCampo({label, valor} : {label: string, valor: string}) {
    return(
        <div className={styles.enderecoCampo}>
            <h4 className={styles.enderecoLabel}>{label}</h4>
            <p className={styles.enderecoValor} >{valor}</p>
        </div>
    )
}


export default async function Endereco() {

    // const session = await auth();
    // const email = session?.user?.email
    const endereco = await fetchDataEndereco();

    return(
        endereco.length > 0 ?(
        <div>
            <h3 className={styles.infoBoxLabel}>Endereco</h3>
            <div className={styles.infoBox +" "+ styles.infoBoxEndereco}>
                    <EnderecoCampo label="Estado" valor={endereco[0].estado ? endereco[0].estado : "-"}/>
                    <EnderecoCampo label="Cidade" valor={endereco[0].cidade ? endereco[0].cidade : "-"}/>
                    <EnderecoCampo label="Bairro" valor={endereco[0].bairro ? endereco[0].bairro : "-"}/>
                    <EnderecoCampo label="Rua" valor={endereco[0].rua ? endereco[0].rua : "-"}/>                    
                    <EnderecoCampo label="CEP" valor={endereco[0].CEP ? String(endereco[0].CEP) : "-"}/>
                    <EnderecoCampo label="Local" valor={endereco[0].local ? endereco[0].local : "-"}/>
                    <EnderecoCampo label="Número" valor={endereco[0].numero ? String(endereco[0].numero) : "-"}/>
            </div>
        </div>)
        : <></>
    )
}
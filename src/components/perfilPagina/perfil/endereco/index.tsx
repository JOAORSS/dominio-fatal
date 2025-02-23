import fetchDataEndereco from "@/services/supabase/selectEnderecos";
import styles from "../../perfil.module.css"
import { auth } from "@/auth";
import { IoIosAddCircle } from "react-icons/io";

function EnderecoCampo({label, valor} : {label: string, valor: string}) {
    return(
        <div className={styles.enderecoCampo}>
            <h4 className={styles.enderecoLabel}>{label}</h4>
            <p className={styles.enderecoValor} >{valor}</p>
        </div>
    )
}

export default async function Endereco() {

    const session = await auth();
    const email = session?.user?.email
    const enderecoArray = await fetchDataEndereco(email!);
    const endereco = enderecoArray[0];

    return(
        <div>
            <h3 className={styles.infoBoxLabel}>Endereco</h3>
            {enderecoArray.length > 0 
            ?(
                <div className={styles.infoBox +" "+ styles.infoBoxEndereco}>
                    <EnderecoCampo label="Estado" valor={endereco.estado ? endereco.estado : "-"}/>
                    <EnderecoCampo label="Cidade" valor={endereco.cidade ? endereco.cidade : "-"}/>
                    <EnderecoCampo label="Bairro" valor={endereco.bairro ? endereco.bairro : "-"}/>
                    <EnderecoCampo label="Rua" valor={endereco.rua ? endereco.rua : "-"}/>                    
                    <EnderecoCampo label="CEP" valor={endereco.cep ? String(endereco.cep) : "-"}/>
                    <EnderecoCampo label="Local" valor={endereco.local ? endereco.local : "-"}/>
                    <EnderecoCampo label="Número" valor={endereco.numero ? String(endereco.numero) : "-"}/>
                </div>
            ): 
            <button 
                className={styles.infoBox +" "+ styles.adicionar}
                style={{marginLeft: "20px", marginTop: "10px"}}
            >
                <IoIosAddCircle size={50} color="var(--detalhes)" />
                <div className={styles.perfilInfo}>
                    <h3 className={styles.nome} style={{color: "var(--detalhes)"}}>Adicionar endereço</h3>
                </div>
            </button>}
        </div>
    )
}
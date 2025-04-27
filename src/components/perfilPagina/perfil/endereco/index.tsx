import fetchDataEndereco from "@/services/supabase/address/selectAddress";
import styles from "../../perfil.module.css"
import { auth } from "@/auth";
import WarperModalButton from "@/components/modalFormEndereco";

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
            <h3 className={styles.infoBoxLabel}>Endereço</h3>
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
                <WarperModalButton email={email!} /> 
            }
        </div>
    )
}
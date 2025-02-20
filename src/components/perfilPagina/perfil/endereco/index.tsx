import styles from "../../perfil.module.css"
import EnderecoType from "@/module/usuario/endereco"

function EnderecoCampo({label, valor} : {label: string, valor: string}) {
    return(
        <div className={styles.enderecoCampo}>
            <h4 className={styles.enderecoLabel}>{label}</h4>
            <p className={styles.enderecoValor} >{valor}</p>
        </div>
    )
}


export default function Endereco() {

    const endereco: EnderecoType | null = {
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        CEP: 0,
        local: "apartamento",
        numero: 0
    };

    return(
        <div>
            <h3 className={styles.infoBoxLabel}>Endereco</h3>
            <div className={styles.infoBox +" "+ styles.infoBoxEndereco}>
                    <EnderecoCampo label="Estado" valor={endereco.estado ? endereco.estado : "-"}/>
                    <EnderecoCampo label="Cidade" valor={endereco.cidade ? endereco.cidade : "-"}/>
                    <EnderecoCampo label="Bairro" valor={endereco.bairro ? endereco.bairro : "-"}/>
                    <EnderecoCampo label="Rua" valor={endereco.rua ? endereco.rua : "-"}/>                    
                    <EnderecoCampo label="CEP" valor={endereco.CEP ? String(endereco.CEP) : "-"}/>
                    <EnderecoCampo label="Local" valor={endereco.local ? endereco.local : "-"}/>
                    <EnderecoCampo label="Número" valor={endereco.numero ? String(endereco.numero) : "-"}/>
            </div>
        </div>
    )
}
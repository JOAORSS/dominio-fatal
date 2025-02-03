import styles from "../../perfil.module.css"

function EnderecoCampo({label, valor} : {label: string, valor: string}) {
    return(
        <div className={styles.enderecoCampo}>
            <h4 className={styles.enderecoLabel}>{label}</h4>
            <p className={styles.enderecoValor} >{valor}</p>
        </div>
    )
}

export default function Endereco() {
    return(
        <div>
            <h3 className={styles.infoBoxLabel}>Endereco</h3>
            <div className={styles.infoBox +" "+ styles.infoBoxEndereco}>
                    <EnderecoCampo label="Estado" valor="Rio Grande do sul"/>
                    <EnderecoCampo label="Cidade" valor="Santa Cruz do Sul"/>
                    <EnderecoCampo label="Bairro" valor="Linha Santa Cruz"/>
                    <EnderecoCampo label="Rua" valor="Professor Afonso Rabuske"/>                    
                    <EnderecoCampo label="CEP" valor="968222-250"/>
                    <EnderecoCampo label="Local" valor="Residência"/>
                    <EnderecoCampo label="Número" valor="374"/>
                    <EnderecoCampo label="Telefone" valor="51 99838-4327"/>
            </div>
        </div>
    )
}
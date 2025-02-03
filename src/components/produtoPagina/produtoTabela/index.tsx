import styles from './tabela.module.css';
import mockTabela from "@/mock/mockTabela.json"


export default function ProdutoTabela() {
    return (
        <div className={styles.tabela}>
            <h2 className={styles.tabela__titulo} >Tabela de tamanhos</h2>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th} colSpan={2}>Tamanho</th>
                        <th className={styles.th} >Busto</th>
                        <th className={styles.th} >Cintura</th>
                    </tr>
                </thead>
                <tbody>
                    { mockTabela.map(({tamanhos, busto, cintura}, index) => (
                    <tr key={index} className={styles.tr}>
                        <td className={styles.tdCurta} >{tamanhos.letra}</td>
                        <td className={styles.tdCurta} >{tamanhos.numerico}</td>
                        <td className={styles.td} >{busto}cm</td>
                        <td className={styles.td} >{cintura}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}
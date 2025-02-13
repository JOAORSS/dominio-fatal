import styles from './tabela.module.css';

const tabela = [   
    {
        "tamanhos": {
            "letra": "PP",
            "numerico": "43/36"
        },
        "busto": 85,
        "cintura": "54 - 68 cm"
    },
    {
        "tamanhos": {
            "letra": "P",
            "numerico": "44/38"
        },
        "busto": 90,
        "cintura": "68 - 72 cm"
    },
    {
        "tamanhos": {
            "letra": "M",
            "numerico": "46/40"
        },
        "busto": 95,
        "cintura": "72 - 76 cm"
    },
    {
        "tamanhos": {
            "letra": "G",
            "numerico": "48/42"
        },
        "busto": 100,
        "cintura": "76 - 80 cm"
    },
    {
        "tamanhos": {
            "letra": "GG",
            "numerico": "50/44"
        },
        "busto": 105,
        "cintura": "80 - 84 cm"
    },
    {
        "tamanhos": {
            "letra": "GX",
            "numerico": "52/46"
        },
        "busto": 110,
        "cintura": "84 - 88 cm"
    }
]


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
                    { tabela.map(({tamanhos, busto, cintura}, index) => (
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
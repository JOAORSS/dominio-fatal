import Produto from "@/module/produto";
import Container from "../container"
import CardProduto from "./cardProduto"
import styles from "./gradeProduto.module.css"
import SectionLabel from "../sectionLabel";
import { FaFilter } from "react-icons/fa6";

export default function GradeProduto({ produtos, filter = true }: { produtos: Produto[], filter?: boolean }) {
    return(
        <Container center>
            <section className={styles.produtos}>
                <div className={styles.label}>
                    <SectionLabel title="Mais peças" />
                    {filter && 
                        <button className={styles.filter}>
                            <FaFilter color="#000" /> Filtros
                        </button>}
                </div>
                <div className={styles.gradeProdutos}>
                    {produtos.map((produto, index) => (
                      index < 8 && <CardProduto key={index} produto={produto} />
                    ))}
                </div>
            </section>
        </Container>
    )
}
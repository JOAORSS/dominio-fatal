import Container from "../container"
import CardProduto from "./cardProduto"
import styles from "./gradeProduto.module.css"
import SectionLabel from "../sectionLabel";
import { FaFilter } from "react-icons/fa6";
import selectProdutos from "@/services/supabase/produtos/selectProdutos";

export default async function GradeProduto({ filter = true }: { filter?: boolean }) {

    const produtos = await selectProdutos();

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
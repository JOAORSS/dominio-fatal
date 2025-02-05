import Frete from "@/module/frete";
import FreteBox from "../produtoOpcoes/frete";
import styles from "./produtoFrete.module.css";

export default function ProdutoFrete({ fretes } : { fretes:Frete[] }) {
    return (
        <section className={styles.produtoFrete}>
            {fretes.map((frete, index) => (
                <FreteBox 
                    key={index} 
                    name={frete.name} 
                    price={frete.price} 
                    delivery_range={frete.delivery_range} 
                    status={frete.status} />
            ))}
            <FreteBox name="NVV" price={16.60} delivery_range={{ min: 1, max: 3 }} status={400} />
        </section>
    )
}
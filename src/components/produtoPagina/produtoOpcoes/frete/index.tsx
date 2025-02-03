import Image from "next/image"
import styles from "../produtoOpcoes.module.css"
import Frete from "@/module/frete"


export default function FreteBox({ name, price, delivery_range, status }: Frete) {
    return(
        <div data-status={status} className={styles.frete__resultado}>
            <Image
                className={styles.resultado__img}
                src={"/images/correios.png"}
                alt="Correios"
                width={273}
                height={58}
            />
            <div className={styles.frete__infos}>
                <div className={styles.nomePreco}>
                    <div className={styles.resultado__info}>
                        <h3 className={styles.info__text}>Tipo: </h3>
                        <span>{name}</span>
                    </div>
                    <div className={styles.resultado__info}>
                        <h3 className={styles.info__text}>Valor: </h3>
                        <span>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                </div>
                <div className={styles.resultado__info}>
                    <h3 className={styles.info__text} >Prazo: </h3>
                    <span> {delivery_range.min} a {delivery_range.max} dias úteis</span>
                </div>
            </div>
        </div>
    )
}
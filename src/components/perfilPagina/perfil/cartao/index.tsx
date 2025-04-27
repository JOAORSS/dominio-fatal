import Image from "next/image";
import styles from "../../perfil.module.css";
import WarperModalButton from "./warperCartaoButton";
import { auth } from "@/auth";
import fetchDataCartao from "@/services/supabase/card/selectCard";

export default async function Cartao() {

        const session = await auth();
        const email = session?.user?.email
        const cartaoArray = await fetchDataCartao(email!);

    return (
        <>
        {cartaoArray.length > 0 && (
                cartaoArray.map((cartao) => (
                    <div key={cartao.ultimos_digitos} className={styles.infoBox}>
                        <Image 
                            src={resolveCardImage(cartao.bandeira)}
                            alt={cartao.bandeira}
                            width={60}
                            height={60}
                        />
                        <div className={styles.perfilInfo}>
                            <h3 className={styles.nome}>{cartao.nome_cartao}</h3>
                            <p className={styles.email}>✱✱✱✱ ✱✱✱✱ ✱✱✱✱ {cartao.ultimos_digitos}</p>
                        </div>
                    </div>
                ))
            )}
            <WarperModalButton email={email!} />
        </>
    )
}


export function resolveCardImage(cardType: string): string {
    const cartao: { [key: string]: string } = {
        "Visa": "/images/cartoes/visa.png",
        "Mastercard": "/images/cartoes/mastercard.png",
        "Elo": "/images/cartoes/elo.png",
        "Hipercard": "/images/cartoes/hipercard.png",
    };

    return cartao[cardType];
}

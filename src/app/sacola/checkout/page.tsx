"use server"

import { auth } from "@/auth";
import CheckoutPage from "@/components/checkoutPage";
import PageLeyout from "@/components/pageLeyout";
import fetchDataCartao, { CartaoType } from "@/services/supabase/selectCard";
import Authorization from "@/utils/userValidation";

export default async function Checkout() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMINIO}/api/getCheckoutToken`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });

    const data = await response.json();
    const session = await auth();

    let cartoes: CartaoType[] = [];
    if (session) {
        cartoes = await fetchDataCartao(session.user.email);
        cartoes = cartoes.map(cartao => ({
            numero_cartao: cartao.numero_cartao,
            nome_cartao: cartao.nome_cartao,
            cvv: "",
            ano_vencimento: "",
            mes_vencimento: "",
            tipo: cartao.tipo,
            bandeira: cartao.bandeira
        }));
    }
    
    return(
        <Authorization>
            <PageLeyout>
                <CheckoutPage cartoesData={cartoes} jwt={data} /> 
            </PageLeyout>
        </Authorization>
    )
}




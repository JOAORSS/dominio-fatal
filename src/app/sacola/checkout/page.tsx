"use server"

import { auth } from "@/auth";
import CheckoutPage from "@/components/checkoutPage";
import PageLeyout from "@/components/pageLeyout";
import fetchDataCartao, { CartaoType } from "@/services/supabase/card/selectCard";
import Authorization from "@/utils/userValidation";
import { redirect } from "next/navigation";

export default async function Checkout() {

    const session = await auth();
    if (!session) {
        return redirect("/login");
    }
    const cartoes:CartaoType[] = await fetchDataCartao(session!.user.email);
    
    return(
        <Authorization>
            <PageLeyout>
                <CheckoutPage cartoesData={cartoes} /> 
            </PageLeyout>
        </Authorization>
    )
}




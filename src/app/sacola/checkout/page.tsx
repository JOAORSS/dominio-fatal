import CheckoutPage from "@/components/checkoutPage";
import PageLeyout from "@/components/pageLeyout";
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

    return(
        <Authorization>
            <PageLeyout>
                <CheckoutPage jwt={data} /> 
            </PageLeyout>
        </Authorization>
    )
}




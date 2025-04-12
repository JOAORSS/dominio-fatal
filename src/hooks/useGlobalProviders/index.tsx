import { CarrinhoProvider } from "@/context/carrinhoContext";
import { CheckoutProvider } from "@/context/checkoutContext";

export default function UseGlobalProviders({ children }: { children: React.ReactNode }) {

    return(
        <CarrinhoProvider>
            <CheckoutProvider>
                {children}
            </CheckoutProvider>
        </CarrinhoProvider>
    )
    
}
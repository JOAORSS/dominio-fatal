import { CarrinhoProvider } from "@/context/carrinhoContext";

export default function UseGlobalProviders({ children }: { children: React.ReactNode }) {

    return(
        <CarrinhoProvider>
            {children}
        </CarrinhoProvider>
    )
    
}
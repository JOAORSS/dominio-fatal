import { CarrinhoProvider } from "@/context/carrinhoContext";
import { UserProvider } from "@/context/userContext";

export default function UseGlobalProviders({ children }: { children: React.ReactNode }) {

    return(
        <UserProvider>
            <CarrinhoProvider>
                {children}
            </CarrinhoProvider>
        </UserProvider>
    )
    
}
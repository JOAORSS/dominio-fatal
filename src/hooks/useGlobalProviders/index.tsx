import { CarrinhoProvider } from "@/context/carrinhoContext";
import { UserSessionProvider } from "@/context/testProvider";

export default function UseGlobalProviders({ children }: { children: React.ReactNode }) {

    return(
        <UserSessionProvider>
            <CarrinhoProvider>
                {children}
            </CarrinhoProvider>
        </UserSessionProvider>
    )
    
}
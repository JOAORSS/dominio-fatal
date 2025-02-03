import { createContext } from "react";
import Produto from "@/module/produto";

interface ProdutoProviderProps {
    children: React.ReactNode;
    produtos: Produto[];
}

type ProdutosContextType = {
    produtos: Produto[];
  };

const initialState: ProdutosContextType = {
    produtos: []
};

const ProdutoContext = createContext<ProdutosContextType>(initialState);
ProdutoContext.displayName = "Produtos";

export const ProdutoProvider: React.FC<ProdutoProviderProps> = ({ children, produtos }) => {

    return (
        <ProdutoContext.Provider value={{produtos}} >
            {children}
        </ProdutoContext.Provider>
    );
};

export default ProdutoContext;
"use client";

import ProdutoCarrinho from "@/module/produto/produtoCarrinho";
import React, { createContext, ReactNode } from "react";
import useLocalStorageState from "use-local-storage-state";

type CarrinhoContextType = {
    carrinho: ProdutoCarrinho[];
    setCarrinho: React.Dispatch<React.SetStateAction<ProdutoCarrinho[]>>;
}

const CarrinhoContext = createContext<CarrinhoContextType>({
    carrinho: [],
    setCarrinho: () => {}
});
CarrinhoContext.displayName = "Carrinho";


function CarrinhoProvider({ children }: { children: ReactNode }) {
    const [carrinho, setCarrinho] = useLocalStorageState<ProdutoCarrinho[]>('carrinho', {
        defaultValue: [],
      });

    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    );
};

export { CarrinhoContext, CarrinhoProvider };
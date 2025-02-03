"use client";

import ProdutoCarrinho from "@/module/produto/produtoCarrinho";
import React, { createContext, useState, ReactNode } from "react";

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
    const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    );
};

export { CarrinhoContext, CarrinhoProvider };
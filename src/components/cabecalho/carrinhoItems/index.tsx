"use client"

import useCarrinhoContext from "@/hooks/useCarrinhoContext";

export default function CarrinhoItems(){

    const { carrinho } = useCarrinhoContext();
    const total = carrinho.reduce((acc, item) => { return acc + item.quantidade;}, 0);

    return(
        <b style={{
            color: "var(--cor-primaria)",
            position: "absolute",
            transform: "translateY(5px)",
            fontWeight: "900",
            fontSize: "1.2rem",
        }}
        >{total > 0 ? total : "" }</b>
    )
}
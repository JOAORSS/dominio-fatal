'use client'

import { CheckoutContext } from "@/context/checkoutContext";
import Checkout from "@/module/checkout";
import { useContext } from "react";


export default function useCheckoutContext() {
    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error("useCheckoutContext must be used within a CheckoutContext");
    }

    const { checkout, setCheckout } = context;
    function addProduto (
        produto_id: number, 
        objeto_pagamento: { nome: string; preco: number; quantidade: number }, 
        objeto_adm: { cor_id: number; tamanho_id: number; quantidade: number }
    ) {
        setCheckout((prevCheckout: Checkout) => ({
            ...prevCheckout,
            objeto_pagamento: [...prevCheckout.objeto_pagamento, { produto_id, ...objeto_pagamento }],
            objeto_adm: [...prevCheckout.objeto_adm, { produto_id, ...objeto_adm }]
        }));
    };

    function removeProduto (produto_id: number) {
        setCheckout((prevCheckout: Checkout) => ({
            ...prevCheckout,
            objeto_pagamento: prevCheckout.objeto_pagamento.filter((item) => item.produto_id !== produto_id),
            objeto_adm: prevCheckout.objeto_adm.filter((item) => item.produto_id !== produto_id)
        }));
    };

    return { 
        checkout, 
        setCheckout, 
        addProduto, 
        removeProduto 
    };

}
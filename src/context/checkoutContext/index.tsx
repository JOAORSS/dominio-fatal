"use client";

import Checkout from "@/module/checkout";
import React, { createContext, useState, ReactNode } from "react";

type CheckoutContextType = {
    checkout: Checkout;
    setCheckout: React.Dispatch<React.SetStateAction<Checkout>>;
}

const CheckoutContext = createContext<CheckoutContextType>({
    checkout: {
        objeto_pagamento: [],
        objeto_adm: []
    },
    setCheckout: () => {}
});
CheckoutContext.displayName = "Checkout";


function CheckoutProvider({ children }: { children: ReactNode }) {
    const [checkout, setCheckout] = useState<Checkout>({
        objeto_pagamento: [],
        objeto_adm: []
    });

    return (
        <CheckoutContext.Provider value={{checkout, setCheckout}}>
            {children}
        </CheckoutContext.Provider>
    );
};

export { CheckoutContext, CheckoutProvider };
"use client";

import Checkout from "@/module/checkout";
import React, { createContext, ReactNode } from "react";
import useLocalStorageState from "use-local-storage-state";

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
    const [checkout, setCheckout] = useLocalStorageState<Checkout>("checkout", {
        defaultValue: {
            objeto_pagamento: [],
            objeto_adm: []
        },
    });

    return (
        <CheckoutContext.Provider value={{checkout, setCheckout}}>
            {children}
        </CheckoutContext.Provider>
    );
};

export { CheckoutContext, CheckoutProvider };
"use client";

import React, { createContext, useState, ReactNode } from "react";

type DestaqueContextType = {
    indexDestaque: number;
    setIndexDestaque: React.Dispatch<React.SetStateAction<number>>;
}

const DestaqueContext = createContext<DestaqueContextType>({
    indexDestaque: 0,
    setIndexDestaque: () => {}
});
DestaqueContext.displayName = "Destaque";


function DestaqueProvider({ children }: { children: ReactNode }) {
    const [indexDestaque, setIndexDestaque] = useState<number>(0);

    return (
        <DestaqueContext.Provider value={{indexDestaque, setIndexDestaque}}>
            {children}
        </DestaqueContext.Provider>
    );
};

export { DestaqueContext, DestaqueProvider };
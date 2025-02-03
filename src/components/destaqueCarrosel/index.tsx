"use client";

import Produto from "@/module/produto";
import Destaque from "./destaque";

import { DestaqueProvider } from "@/context/destaqueContext";
import useDestaqueContext from "@/hooks/useDestaqueContext";

export default function DestaqueCarroselWrapper({ produtos }: { produtos: Produto[] }) {
    return (
        <DestaqueProvider>
            <DestaqueCarrosel produtos={produtos} />
        </DestaqueProvider>
    );
}

function DestaqueCarrosel({ produtos }: { produtos: Produto[] }) {
    const { indexDestaque } = useDestaqueContext();

    return (
        <>
            {produtos.map((produto, index) => {
                return (
                    indexDestaque === index && (
                        <Destaque key={index} produto={produto} />
                    )
                );
            })}
        </>
    );
}

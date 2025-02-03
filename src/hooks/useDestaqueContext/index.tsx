"use client"

import { DestaqueContext } from "@/context/destaqueContext";
import { useContext } from "react";

export default function useDestaqueContext() {
    const context = useContext(DestaqueContext);

    if (!context) {
        throw new Error("useDestaqueContext must be used within a DestaqueProvider");
    }

    const { indexDestaque, setIndexDestaque } = context;

    function avancaDestaque() {
        setIndexDestaque((indexDestaque + 1) % 4);
    }

    function voltaDestaque(){
        setIndexDestaque((indexDestaque + 3) % 4);
    }
    
    return {
        indexDestaque,
        setIndexDestaque,
        avancaDestaque,
        voltaDestaque
    }
}
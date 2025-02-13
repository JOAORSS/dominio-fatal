"use client"

import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used within a DestaqueProvider");
    }

    const { usuario, setUsuario, endereco, setEndereco, setCartoes, cartoes } = context;


    return {
        usuario,
        setUsuario,
        endereco,
        setEndereco,
        setCartoes,
        cartoes
    }
}
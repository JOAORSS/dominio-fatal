"use client";

import UsuarioType from "@/module/usuario";
import CartaoType from "@/module/usuario/cartao";
import EnderecoType from "@/module/usuario/endereco";
import React, { createContext, useState, ReactNode } from "react";

type UserContextType = {
    usuario?: UsuarioType;
    endereco?: EnderecoType[];
    cartoes?: CartaoType[];
    setUsuario: React.Dispatch<React.SetStateAction<UsuarioType | undefined>>;
    setEndereco: React.Dispatch<React.SetStateAction<EnderecoType[] | undefined>>;
    setCartoes: React.Dispatch<React.SetStateAction<CartaoType[] | undefined>>;
}

const UserContext = createContext<UserContextType>({
    usuario: undefined,
    endereco: undefined,
    cartoes: [],
    setUsuario: () => {},
    setEndereco: () => {},
    setCartoes: () => {},
});

UserContext.displayName = "usuario";

function UserProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<UsuarioType | undefined>();
    const [endereco, setEndereco] = useState<EnderecoType[] | undefined>();
    const [cartoes, setCartoes] = useState<CartaoType[] | undefined>();

    return (
        <UserContext.Provider value={{usuario, setUsuario, endereco, setEndereco, setCartoes, cartoes}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
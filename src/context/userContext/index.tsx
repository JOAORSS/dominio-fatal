"use client";

import React, { createContext, useState, ReactNode } from "react";

interface ContaType {
    id: number, name: string, email: string
}

type UserContextType = {
    User: ContaType;
    setUser: React.Dispatch<React.SetStateAction<ContaType>>;
}

const UserContext = createContext<UserContextType>({
    User: { id: 0, name: "", email: "" },
    setUser: () => {}
});
UserContext.displayName = "user";


function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ContaType>({ id: 0, name: "", email: "" });

    return (
        <UserContext.Provider value={{User: user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
"use client"

import { createContext, useContext,  } from 'react';

const SessionContext = createContext();
import { auth } from "@/auth";

export const UserSessionProvider = async ({ children }) => {

    const session = await auth();

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    return useContext(SessionContext);
};
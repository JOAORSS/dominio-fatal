"use client"

import { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();
import { auth } from "@/auth";

export const UserSessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await auth();
            setSession(sessionData);
        };

        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    return useContext(SessionContext);
};
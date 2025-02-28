"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Authorization({ children }: { children: React.ReactNode }) {

    const { data: session } = useSession();

    if (!session) redirect("/login"); 

    return (
        <>
            {children}
        </>
    )
}
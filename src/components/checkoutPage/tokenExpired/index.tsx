"use client"

import Button from "@/components/button";
import { useRouter } from "next/router";

export default function TokenExpired() {

    const router = useRouter();

    return (
        <div style={{
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '80vh',
            gap: '20px'
            }}>
            <h1>Sessão expirada</h1>
            <Button link="/sacola" onClick={(e) => {e!.preventDefault(); router.push("/sacola")}} type="outline" >Voltar à sacola</Button>
        </div>
    )
}
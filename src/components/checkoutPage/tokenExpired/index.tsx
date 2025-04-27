"use client"

import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function TokenExpired({message}:{message: string}) {

    const router = useRouter();

    return (
        <div style={{
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '80vh',
            gap: '20px',
            width: '20%',
            }}>
            <h1  >{message}</h1>
            <Button link="/sacola" onClick={(e) => {e!.preventDefault(); router.push("/sacola")}} type="outline" >Voltar à sacola</Button>
        </div>
    )
}
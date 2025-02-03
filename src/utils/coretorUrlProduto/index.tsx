"use client";

import { useEffect } from "react";

export function corrigeUrlProduto(nome: string) {
    return nome.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

export default function CoretorUrlProduto({ nome, id, nomeCorreto }: { nomeCorreto: string, nome: string, id: string }) {
    useEffect(() => {
        if (typeof window !== "undefined" && nome !== nomeCorreto) {
            const nomeUrl = nomeCorreto.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
            const newUrl = `/produtos/${id}/${nomeUrl}`;
            window.history.replaceState(null, '', newUrl);
        }
    }, [nome, nomeCorreto, id]);

    return null;
}
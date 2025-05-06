"use server";

import createClientServer from "@/lib/supabase/server";

export default async function selectEstoque(): Promise<{id: string, produto_id: string, cor_id: string, tamanho_id: string, quantidade: number}[] | []> {

    const supabase = await createClientServer();

    try{
        const { data: estoque } = await supabase
            .from('estoque_produtos')
            .select('*');
            
        return estoque || [];

    } catch (error) {
        console.error(error)
    }

    return [];
}
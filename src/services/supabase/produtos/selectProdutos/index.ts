"use server";

import createClientServer from "@/lib/supabase/server";
import Produto from "@/module/produto";

export default async function selectProdutos(): Promise<Produto[] | []> {

    const supabase = await createClientServer();

    try{
        const { data: produtos } = await supabase
            .from('produtos')
            .select('*');
            
        return produtos || [];

    } catch (error) {
        console.error(error)
    }

    return [];
}
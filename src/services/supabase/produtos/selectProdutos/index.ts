"use server";

import createClientServer from "@/lib/supabase/server";

export default async function selectProdutos() {

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
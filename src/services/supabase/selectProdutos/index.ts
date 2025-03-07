"use server";

import createClientServer from "@/lib/supabase/server";

export default async function selectProdutosHome() {

    const supabase = await createClientServer();

    try{
        const { data: produtos } = await supabase
            .from('produtos')
            .select('*')
            .limit(8);

        return produtos || [];

    } catch (error) {
        console.error(error)
    }

    return [];
}
"use server";

import createClientServer from "@/lib/supabase/server";

export default async function selectCores() {

        const supabase = await createClientServer();
    
        try{
            const { data: cores } = await supabase
                .from('cores')
                .select('*');
                
            return cores || [];
    
        } catch (error) {
            console.error(error)
        }
    
        return [];
}
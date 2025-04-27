"use server"

import createClientServer from "@/lib/supabase/server";

export default async function getUserByEmail(email:string): Promise<{id: string, nome: string, email: string, foto: string}[] | [] | null> {

     const supabase = await createClientServer();


      try {
        const { data: usuario, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', email)
        
        if (error) throw error;
        if (!usuario || usuario.length === 0) return null;
    
        return usuario[0];
      } catch (error) {
        console.error(`Erro: ${email}`, error);
        return [];
      }

}
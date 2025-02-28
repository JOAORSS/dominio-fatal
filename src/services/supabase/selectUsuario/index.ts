"use server"

import createClientServer from "@/lib/supabase/server";

export default async function getUserByEmail(email:string){

     const supabase = await createClientServer();
    
      try {
        const { data: usuario, error: usuarioError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', email)

        if (usuarioError) throw usuarioError;
        if (!usuario || usuario.length === 0) return null;
    
        return usuario;
      } catch (error) {
        console.error('Erro:', error);
        return [];
      }

}
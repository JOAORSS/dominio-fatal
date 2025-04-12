"use server"

import createClientServer from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { reference_id, status } = body;
    
        if (!reference_id || !status) {
          return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
        }
    
        const updateResponse = await atualizarStatusPedido(reference_id, status);
        if (!updateResponse) return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });

        return NextResponse.json({ message: "Notificação processada com sucesso" }, { status: 200 });

    } catch (error) {
        console.error("Erro ao processar notificação:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
      }

}



async function atualizarStatusPedido( reference_id: string, status:string ): Promise<boolean> {

       const supabase = await createClientServer();

       try{
            const { error: erro } = await supabase
            .from('pedidos')
            .update({ status: status })
            .eq('id_compra', reference_id);

            if (erro) throw erro;
            
            return true;

       } catch (error) {
            console.error('Erro ao atualizar status do pedido:', error);
            return false;
       }
        

}
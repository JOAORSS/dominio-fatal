"use server";

import createClientServer from '@/lib/supabase/server';

export interface CartaoType {
  user_id: string,
  nome_cartao: string,
  ultimos_digitos: string,
  encrypted: string,
  tipo: "CREDIT_CARD" | "DEBIT_CARD",
  bandeira: string,
}

export default async function fetchDataCartao(email: string): Promise<CartaoType[] | []> {
  const supabase = await createClientServer();

  try {
    const { data: usuario, error: usuarioError } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single();

    if (usuarioError) throw new Error(usuarioError.message);

    if (!usuario) {
      return [];
    }

    const userId = usuario.id;

    const { data: cartoes, error: cartoesError } = await supabase
      .from('cartoes')
      .select("*")
      .eq('user_id', userId);

    if (cartoesError) throw cartoesError;

    return cartoes;
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
      return [];
  }

}

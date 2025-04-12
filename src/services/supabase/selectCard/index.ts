"use server";

import createClientServer from '@/lib/supabase/server';

interface CartaoType {
    numero_cartao: string,
    nome_cartao: string,
    cvv: string,
    ano_vencimento: string,
    mes_vencimento: string,
    tipo: string,
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

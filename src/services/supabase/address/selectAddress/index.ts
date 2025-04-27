"use server";

import createClientServer from '@/lib/supabase/server';

interface EnderecoType {
  estado: string; 
  cidade: string;
  bairro: string;
  logradouro?: string;
  rua: string;
  cep: number;
  local: 'residencia' | 'apartamento' | 'trabalho' | 'correios';
  numero: number;
}

export default async function fetchDataEndereco(email: string): Promise<EnderecoType[] | []> {
  const supabase = await createClientServer();

  try {
    const { data: usuario, error: usuarioError } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email);

    if (usuarioError) throw usuarioError;
    if (!usuario || usuario.length === 0) {
      return [];
    }

    const userId = usuario[0].id;

    const { data: enderecos, error: enderecosError } = await supabase
      .from('enderecos')
      .select("*")
      .eq('user_id', userId);

    if (enderecosError) throw enderecosError;

    return enderecos;
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return [];
  }
}

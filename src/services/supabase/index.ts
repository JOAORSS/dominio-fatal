"use server";

import createClientServer from '@/lib/supabase/server';
import EnderecoType from '@/module/usuario/endereco';

export async function fetchDataEndereco(): Promise<EnderecoType[] | []> {
  const supabase = await createClientServer();

  try {
    // console.log('Buscando usuário com email:', email);

    // const { data: usuario, error: usuarioError } = await supabase
    //   .from('usuarios')
    //   .select('id')
    //   .eq('email', email)
    //   .single();

    // if (usuarioError) throw usuarioError;
    // if (!usuario) throw new Error('Usuário não encontrado');

    // console.log('Usuário encontrado:', usuario);

    // const userId = usuario.id;

    // console.log('Buscando endereços para o user_id:', userId);

    const { data: enderecos, error: enderecosError } = await supabase
      .from('enderecos')
      .select('*')
      .eq('id', 1);

    if (enderecosError) throw enderecosError;

    console.log('Endereços encontrados:', enderecos);

    return enderecos;
  } catch (error) {
    console.error('Erro ao buscar endereços:', JSON.stringify(error, null, 2));
    return [];
  }
}
"use server"

import createClientServer from "@/lib/supabase/server";

interface formDataProps {
    email: string,
    estado: string,
    cidade: string,
    cep: string,
    bairro: string,
    rua: string,
    local: string,
    numero: string,
    complemento: string
}

export default async function insertAddress(formData: formDataProps): Promise<{ operation: boolean, hint: string, status: number }> {
    const estado = formData.estado;
    const cidade = formData.cidade;
    const cep = formData.cep;
    const bairro = formData.bairro;
    const rua = formData.rua;
    const local = formData.local;
    const numero = formData.numero;
    const complemento = formData.complemento;

    if ( 
        cep.length < 1 || 
        numero.length < 1 || 
        bairro.length < 1 || 
        cidade.length < 1 || 
        estado.length < 1 || 
        rua.length < 1 || 
        local.length < 1) {
        return { operation: false, hint: 'Preencha todos os campos', status: 400 };
    }

    const supabase = await createClientServer();

    const email = formData.email;
    if (!email) {
        return { operation: false, hint: 'Email é obrigatório', status: 400 };
    }

    const { data: usuario, error: usuarioError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .single();

    if (usuarioError || !usuario) {
        return { operation: false, hint: 'Usuário não encontrado', status: 404 };
    }

    const usuario_id = usuario.id;

    try {
        const { data: endereco, error: enderecoError } = await supabase
            .from('enderecos')
            .select('id')
            .eq('user_id', usuario_id)
            .eq('estado', estado)
            .eq('cidade', cidade)
            .eq('cep', cep)
            .eq('bairro', bairro)
            .eq('rua', rua)
            .eq('local', local)
            .eq('numero', numero)
            .eq('complemento', complemento);

        if(enderecoError) return { operation: false, hint: 'Endereço já cadastrado', status: 409 };

        if (endereco.length === 0) {

            const { error } = await supabase
                .from('enderecos')
                .insert([
                    { 
                        estado: estado,
                        cidade: cidade,
                        cep: cep.replace("-", ""),
                        bairro: bairro,
                        rua: rua,
                        local: local,
                        numero: numero,
                        complemento: complemento,
                        user_id: usuario_id
                    }
                ]);

            if (error) throw error;

            return { operation: true, hint: 'Endereço cadastrado com sucesso', status: 201 };
        }
    } catch (error) {
        console.error('Erro ao buscar ou inserir endereço:', error);
        return { operation: false, hint: 'Erro ao buscar ou inserir endereço', status: 500 };
    }

    return { operation: false, hint: 'Operação não concluída', status: 500 };
}
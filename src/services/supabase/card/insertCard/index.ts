"use server"

import createClientServer from "@/lib/supabase/server";

interface formDataProps {
    nome: string,
    numero: string,
    bandeira: string,
    tipo: string,
    encrypted: string,
    email: string,
}

export default async function insertCartao(formData: formDataProps): 
    Promise<{ 
        operation: boolean, 
        hint: string, 
        status: number 
    }> {

    const nome = formData.nome;
    const ultimosDigitos = formData.numero.replace(/\D/g, '');
    const bandeira = formData.bandeira;
    const encrypted = formData.encrypted;
    const tipo = formData.tipo;
    const email = formData.email;

    if ( 
        nome.length < 1 || 
        encrypted.length < 1 || 
        ultimosDigitos.length < 1 || 
        bandeira.length < 1 || 
        tipo.length < 1 || 
        email.length < 1) {
        return { operation: false, hint: 'Preencha todos os campos', status: 400 };
    }

    const supabase = await createClientServer();

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
        const { data: cartoes } = await supabase
            .from('cartoes')
            .select('id')
            .eq('user_id', usuario_id)
            .eq("ultimos_digitos", ultimosDigitos)
            .single();

            if (cartoes) return { operation: false, hint: 'Cartão já cadastrado', status: 409 };

            const { error } = await supabase
                .from('cartoes')
                .insert([
                    {   
                        "user_id": usuario_id,
                        "nome_cartao": nome,
                        "ultimos_digitos": ultimosDigitos,
                        "encrypted": encrypted,
                        "tipo": tipo,
                        "bandeira": bandeira,
                    }
                ]);

            if (error) throw error;

            return { operation: true, hint: 'Cartão cadastrado com sucesso', status: 201 };
        
    } catch (error) {
        console.error('Erro ao buscar ou inserir endereço:', error);
        return { operation: false, hint: 'Erro ao buscar ou inserir Cartão', status: 500 };
    }
}
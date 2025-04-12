"use server"

import createClientServer from "@/lib/supabase/server";

interface formDataProps {
    nome: string,
    cvv: string,
    numero: string,
    mesVencimento: string,
    anoVencimento: string,
    bandeira: string,
    tipo: string,
    email: string,
}

export default async function insertCartao(formData: formDataProps): 
    Promise<{ 
        operation: boolean, 
        hint: string, 
        status: number 
    }> {

    const nome = formData.nome;
    const cvv = formData.cvv;
    const numeroCartao = formData.numero;
    const ano = formData.anoVencimento;
    const mes = formData.mesVencimento;
    const bandeira = formData.bandeira;
    const tipo = formData.tipo;
    const email = formData.email;

    if ( 
        nome.length < 1 || 
        cvv.length < 1 || 
        numeroCartao.length < 1 || 
        ano.length < 1 || 
        mes.length < 1 || 
        bandeira.length < 1 || 
        tipo.length < 1 || 
        email.length < 1) {
        return { operation: false, hint: 'Preencha todos os campos', status: 400 };
    }

    const numero = numeroCartao.replace(/\D/g, '');

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
            .eq("numero_cartao", numero)
            .single();

            if (cartoes) return { operation: false, hint: 'Cartão já cadastrado', status: 409 };

            const { error } = await supabase
                .from('cartoes')
                .insert([
                    {   
                        "user_id": usuario_id,
                        "nome_cartao": nome,
                        "numero_cartao": numero,
                        "cvv": cvv,
                        "mes_vencimento": mes,
                        "ano_vencimento": ano,
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
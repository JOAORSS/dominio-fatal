"use server"

import createClientServer from "@/lib/supabase/server";

export default async function createUser(formData) {
    

    const nome = formData.get("nome");
    const sobrenome = formData.get("sobrenome");
    const email = formData.get("email");
    const senha = formData.get("senha");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function capitalizeFullName(fullName) {
        return fullName.split(' ').map(capitalizeFirstLetter).join(' ');
    }

    const nomeCompleto = capitalizeFullName(`${nome} ${sobrenome}`);

    if (!nome || !sobrenome || !email || !senha) {
        throw new Error('Todos os campos são obrigatórios');
    }

    const supabase = await createClientServer();

    try {
        const { data: usuario, error: usuarioError } = await supabase
            .from('usuarios')
            .select('id')
            .eq('email', email);

        if (usuarioError) {
            throw usuarioError;
        }

        if (usuario.length === 0) {
            const { data, error } = await supabase
                .from('usuarios')
                .insert([
                    { nome: nomeCompleto, email: email, senha: senha }
                ]);

            if (error) {
                throw error;
            }

            return data;
        } else {
            console.log('Usuário já existe');
            return { error: 'Usuário já existe', status: 409 };
        }
    } catch (error) {
        console.error('Erro ao buscar ou inserir usuário:', error);
        return [];
    }
}

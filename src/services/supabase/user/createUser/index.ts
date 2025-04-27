"use server"

import createClientServer from "@/lib/supabase/server";
import { hashPassword } from "@/utils/passwordHash"

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function capitalizeFullName(fullName: string) {
    return fullName.split(' ').map(capitalizeFirstLetter).join(' ');
}

/**
 * @async
 * @param {FormData} formData
 * @returns {{ operation: boolean, hint: string, status: number }}
 */

export default async function createUser(formData: FormData): Promise<{ operation: boolean, hint: string, status: number }> {
    
    const nome = formData.get("nome");
    let sobrenome = formData.get("sobrenome");
    const adicionar = formData.get("adicionar");
    const email = formData.get("email");
    const senha = formData.get("senha");

    if (adicionar === "true") sobrenome = "" 

    if (adicionar != "true"){
        if (!nome || !sobrenome || !email || !senha) {
            return { operation: false, hint: 'Preencha todos os campos', status: 400 };
    }} else {
        if (!nome || !email || !senha) {
            return { operation: false, hint: 'Preencha todos os campos', status: 400 };
        }
    }

    const nomeCompleto = capitalizeFullName(`${nome} ${sobrenome}`);

    const supabase = await createClientServer();

    try {
        const { data: usuario, error: usuarioError } = await supabase
            .from('usuarios')
            .select('id')
            .eq('email', email);

        if(usuarioError) return { operation: false, hint: 'Usuário já cadastrado', status: 409 };

        if (usuario.length === 0) {

            const hash = await hashPassword(String(senha));

            const { error } = await supabase
                .from('usuarios')
                .insert([
                    { nome: nomeCompleto, email: email, senha: hash }
                ]);

            if (error) throw error;

        }
    } catch (error) {
        console.error('Erro ao buscar ou inserir usuário:', error);
        return { operation: false, hint: 'Erro ao buscar ou inserir usuário', status: 500 };
    }
    return { operation: true, hint: 'Usuário cadastrado com sucesso', status: 201 };
}

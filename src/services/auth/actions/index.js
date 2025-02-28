"use server"

import { signIn, signOut } from '@/auth';
import createUser from '@/services/supabase/createUser';
import { randomBytes } from 'crypto';

export async function doSocialLogin(formData) {
    const action = formData.get('action');

    await signIn (action, {redirectTo: '/'});
}

export async function doLogout() {
    await signOut({redirectTo: '/'});
}

export async function doCredentialLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            senha: formData.get("senha"),
            redirect: false,
        })

        return response
        
    } catch (error) {
        throw new Error(error)
    }
}


export async function doSocialRegister(formData) {

    try{
        const action = formData.get('action');

        const user = await signIn(action, {redirect: false});

        const newFormData = new FormData();
        newFormData.append("nome", user.nome);
        newFormData.append("sobrenome", "");
        newFormData.append("email", user.email);
        newFormData.append("senha", randomBytes(16).toString('hex'));

        const created = await createUser(newFormData);

        if (created.operation == true) await signIn("credentials", {
            email: user.email,
            senha: newFormData.get("senha"),
            redirectTo: '/',
        });

        if (created.operation == false) await signOut({redirectTo: '/'});
    
    } catch (error) {
        throw new Error(error)
    }
}
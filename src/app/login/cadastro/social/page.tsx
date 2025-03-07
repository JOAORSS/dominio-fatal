"use server";

import { auth } from "@/auth";
import FormCadastroSocial from "@/components/cadastro/formCadastro/formCadastroSocial";
import createClientServer from "@/lib/supabase/server";
import { redirect } from 'next/navigation';

async function verifyEmailExistence(): Promise<boolean> {
  const session = await auth();
  const supabase = await createClientServer();

  if (!session?.user?.email) return false;

  const { data: usuario } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', session.user.email)
    .single();

  if (!usuario || usuario.length === 0) return false;

  if (usuario.foto === null || session.user.image) {
    await supabase
      .from('usuarios')
      .update({ foto: session.user.image })
      .eq('email', session.user.email);
  }

  return true;
}

export default async function SocialSignUp() {
  const emailExists = await verifyEmailExistence();

  if (emailExists) {
    redirect('/');
  }

  return (
    <FormCadastroSocial />
  );
}
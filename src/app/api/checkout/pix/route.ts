"use server"

import { isTokenExpired } from "@/components/checkoutPage";
import createClientServer from "@/lib/supabase/server";
import items from "@/module/checkout/items";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const {
      expiresAt,
      email,
      items,
      amount,
      cpf,
  }: {
      expiresAt: number,
      email: string,
      items: items,
      amount: number,
      cpf: string,
    } = await req.json();

  try{

    if (isTokenExpired(expiresAt)) return NextResponse.json({ menssage: "Erro: token expirado"}, { status: 500 });

    const supabase = await createClientServer();

    const { data: usuario, error: supabaseError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();

    if (supabaseError) throw new Error(supabaseError.message);

    const { data: shipping, error: supabaseErrorEndereco } = await supabase
      .from('enderecos')
      .select('*')
      .eq('user_id', usuario.id)
      .single();

    if (supabaseErrorEndereco) throw new Error(supabaseErrorEndereco.message);


    function getFormattedExpirationDate(): string {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 30);

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-03:00`;
    }

    const uuid = crypto.randomUUID();

    const { data } = await axios.post('https://sandbox.api.pagseguro.com/orders', 
      {
        reference_id: uuid,
        customer: {
          name: usuario.nome,
          email: email,
          tax_id: cpf,
        },
        items: items,
        qr_codes: [
          {
            amount: {
              value: amount,
            },
            expiration_date: getFormattedExpirationDate()
          }
        ],
        shipping: {
          address: {
            street: shipping.rua,
            number: shipping.numero,
            complement: shipping.local,
            locality: shipping.bairro,
            city: shipping.cidade,
            region_code: shipping.estado,
            country: "BRA",
            postal_code: shipping.cep.replace("-", "")
          }
        },
        notification_urls: [
          `https://dominio-fatal.vercel.app/notificacoes`
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.PAGBANK_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }

}

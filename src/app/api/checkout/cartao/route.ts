"use server"

import createClientServer from "@/lib/supabase/server";
import items from "@/module/checkout/items";
import axios from "axios";
import jwt from 'jsonwebtoken';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const {
      token,
      email,
      items,
      cpf,
      amount,
      numeroCartao,
  }: {
      token: string,
      email: string,
      items: items,
      amount: number,
      cpf: string,
      numeroCartao: string
    } = await req.json();

  try{
    function isTokenExpired(token: string) {
      try {
          const decoded = jwt.decode(token);
          if (decoded && 
              (decoded as jwt.JwtPayload).exp! < Date.now() / 1000) {
              return true;
          }
          return false;
      } catch (e) {
          console.error(e);
          return true;
      }
  }

    if (isTokenExpired(token)) return NextResponse.json({ menssage: "Erro: token expirado"}, { status: 500 });

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

    const { data: cartao } = await supabase
      .from("cartao")
      .select("*")
      .eq("user_id", usuario.id)
      .eq("numero_cartao", numeroCartao)
      .single();


    const uuid = crypto.randomUUID();

    const { data } = await axios.post(
      'https://sandbox.api.pagseguro.com/orders',
      {
        reference_id: uuid,
        customer: {
          name: usuario.nome,
          email: `${email}abc`, // teste
          tax_id: cpf,
        },
        items: items,
        shipping: {
          address: {
            street: shipping.rua,
            number: shipping.numero,
            complement: shipping.local,
            locality: shipping.bairro,
            city: shipping.cidade,
            region_code: shipping.estado,
            country: "BRA",
            postal_code: shipping.cep.replace("-", ""),
          },
        },
        notification_urls: [
          `https://dominio-fatal.vercel.app/notificacoes`,
        ],
        charges: [
          {
            reference_id: uuid,
            description: "Compras na loja Dominio Fatal",
            amount: {
              value: amount,
              currency: "BRL",
            },
            payment_method: {
              type: cartao.tipo,
              installments: 1,
              capture: true, // questoes a ver
              soft_descriptor: "Loja do meu teste",
              card: {
                number: cartao.numero,
                exp_month: cartao.mes_vencimento,
                exp_year: cartao.ano_vencimento,
                security_code: cartao.cvv,
                holder: {
                  name: cartao.nome,
                  tax_id: cpf,
                },
              },
            },
            sub_merchant: {
              reference_id: "12345-67891-01112",
              name: "Domínio Fatal",
              tax_id: "03351825005", // cpf da empresa
              mcc: "155",
              address: { // endereco da empresa
                country: "BRA",
                region_code: "RS",
                city: "Guapore",
                postal_code: "96822250",
                street: "Avenida Brigadeiro Faria Lima",
                number: "1384",
                locality: "Pinheiros",
                complement: "Apto 16",
              },
            },
            phones: [
              {
                country: "55",
                area: "54",
                number: "984388564",
                type: "MOBILE",
              },
            ],
            notification_urls: [
              `${process.env.NEXT_PUBLIC_DOMINIO}/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/`,
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }

}

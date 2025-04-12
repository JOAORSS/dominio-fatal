"use server"

import { NextResponse } from "next/server";

export async function POST() {
    try {

        const options = {
            method: 'POST',
            headers: {
              accept: '*/*',
              Authorization: process.env.PAGBANK_TOKEN,
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "reference_id": "ex-00001",
                "customer": {
                  "name": "Jose da Silva",
                  "email": "email@test.com",
                  "tax_id": "12345678909",
                  "phones": [
                    {
                      "country": "55",
                      "area": "11",
                      "number": "999999999",
                      "type": "MOBILE"
                    }
                  ]
                },
                "items": [
                  {
                    "reference_id": "referencia do item",
                    "name": "nome do item",
                    "quantity": 1,
                    "unit_amount": 500
                  }
                ],
                "shipping": {
                  "address": {
                    "street": "Avenida Brigadeiro Faria Lima",
                    "number": "1384",
                    "complement": "apto 12",
                    "locality": "Pinheiros",
                    "city": "São Paulo",
                    "region_code": "SP",
                    "country": "BRA",
                    "postal_code": "01452002"
                  }
                },
                "notification_urls": [
                  "https://meusite.com/notificacoes"
                ],
                "charges": [
                  {
                    "reference_id": "MY-ID-123",
                    "description": "Motivo de pagamento",
                    "amount": {
                      "value": 1000,
                      "currency": "BRL"
                    },
                    "payment_method": {
                      "type": "CREDIT_CARD",
                      "installments": 1,
                      "capture": true,
                      "soft_descriptor": "Loja do meu teste",
                      "card": {
                        "number": "4111111111111111",
                        "exp_month": "03",
                        "exp_year": "2026",
                        "security_code": "123",
                        "holder": {
                          "name": "Jose da Silva",
                          "tax_id": "65544332211"
                        }
                      }
                    },
                    "notification_urls": [
                      "https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/"
                    ]
                  }
                ]
              })
          }
          
        const response = await fetch('https://sandbox.api.pagseguro.com/orders', options)

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });

        } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
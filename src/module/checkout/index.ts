export default interface Checkout {
    objeto_pagamento:
        {
            produto_id: number, 
            nome: string, 
            preco: number, 
            quantidade: number
        }[],
    objeto_adm: 
        {
            produto_id: number, 
            cor_id: number, 
            tamanho_id: number, 
            quantidade: number
        }[]
}
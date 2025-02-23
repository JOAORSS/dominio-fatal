interface EnderecoType {
    estado: string;
    cidade: string;
    bairro: string;
    logradouro?: string;
    rua: string;
    cep: number;
    local: 'residencia' | 'apartamento' | 'trabalho' | 'correios';
    numero: number;
}

export default EnderecoType;
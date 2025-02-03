export interface Produto {
    id: number;
    nome: string;
    preco: string;
    tecido: string;
    imagens: string;
    maisCores: number;
    descricao: string;
    cores: Cor[];
  }

export interface Cor {
    cor_id: number;
    cor: string;
    hex: string;
    tamanhos: {
        tamanho: number;
        quantidade: number;
    }[];
}


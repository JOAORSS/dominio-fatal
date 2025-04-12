export interface Produto {
    id: number;
    nome: string;
    preco: number;
    tecido: string;
    imagens: string;
    mais_cores: boolean;
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
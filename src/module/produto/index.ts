export type cor = {
    cor: string,
    hex: string
}

interface Produto {
    id: string,
    nome: string,
    preco: number,
    destaque: boolean,
    maisCores: boolean,
    cores: cor[],
    tamanhos: string[],
    imagens: string[]
}


export default Produto;
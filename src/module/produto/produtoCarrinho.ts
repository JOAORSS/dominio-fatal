import { Produto } from "../produtoApi";

interface ProdutoCarrinhoType extends Produto {
    quantidade: number;
    cor: string;
    tamanho: string;
    objeto_de_venda: {produto_id: number, cor_id: number, tamanho_id: number, quantidade: number};
}
export default ProdutoCarrinhoType;
import Produto from ".";

interface ProdutoCarrinhoType extends Produto {
    quantidade: number;
    cor: string;
    tamanho: string;
}
export default ProdutoCarrinhoType;
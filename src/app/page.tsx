import BannerEstacao from "@/components/bannerEstacao";
import Produto from "@/module/produto";
import MockProdutos from "@/mock/mockProdutos.json";
import Categorias from "@/components/categorias";
import GradeProduto from "@/components/gradeProdutos";
import DestaqueCarroselWrapper from "@/components/destaqueCarrosel";
import PageLeyout from "@/components/pageLeyout";

const produtos:Produto[] = MockProdutos;

export default function Home() {
  return (
  <PageLeyout>
      <BannerEstacao
        texto="Nova coleção de inverno já Disponivel!"
        imagem="/images/imageEstacao.jpeg"
      />
    <DestaqueCarroselWrapper produtos={produtos} />
    <Categorias />
    <GradeProduto produtos={produtos} />
  </PageLeyout>
  );
}
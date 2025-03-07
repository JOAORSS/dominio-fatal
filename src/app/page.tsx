import BannerEstacao from "@/components/bannerEstacao";
// import Categorias from "@/components/categorias";
import GradeProduto from "@/components/gradeProdutos";
// import DestaqueCarroselWrapper from "@/components/destaqueCarrosel";
import PageLeyout from "@/components/pageLeyout";

export default function Home() {
  return (
  <PageLeyout>
      <BannerEstacao
        texto="Nova coleção de inverno já Disponivel!"
        imagem="/images/imageEstacao.jpeg"
      />
    {/* <DestaqueCarroselWrapper produtos={produtos} /> */}
    {/* <Categorias /> */}
    <GradeProduto />
  </PageLeyout>
  );
}
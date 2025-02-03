import { Cor } from "@/module/produtoApi";
import enumTamanhos from "../enumTamanhos";

type Resultado = {
    cor: string;
    tamanhos: { tamanho: string; quantidade: number }[];
}[];

export default function consolidarTamanho(cores: Cor[]): Resultado {
    return cores.map(cor => ({
        cor: cor.cor,
        tamanhos: cor.tamanhos.map(tamanho => ({
            tamanho: enumTamanhos(tamanho.tamanho),
            quantidade: tamanho.quantidade,
        })),
    }));
}
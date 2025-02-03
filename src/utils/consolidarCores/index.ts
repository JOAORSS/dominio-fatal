import { Cor } from "@/module/produtoApi";
import { cor } from "@/module/produto";

export function consolidarCores(cores: Cor[]): cor[] {
    return cores.map(cor => ({
        cor: cor.cor,
        hex: cor.hex
    }));
}
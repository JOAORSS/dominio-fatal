import { Cor } from "@/module/produtoApi";

export function consolidarCores(cores: Cor[]): {cor: string, hex: string}[] {
    return cores.map(cor => ({
        cor: cor.cor,
        hex: cor.hex
    }));
}
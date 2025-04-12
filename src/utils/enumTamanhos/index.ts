export default function enumTamanhosNumeros(tamanho: number): string {
    const tamanhos: { [key: number]: string } = {
        1: 'PP',
        2: 'P',
        3: 'M',
        4: 'G',
        5: 'GG',
        6: 'XG'
    };

    return tamanhos[tamanho] || '';
}

export function enumTamanhoLetras(letra: string): number {
    const tamanhos: { [key: string]: number } = {
        'PP': 1,
        'P': 2,
        'M': 3,
        'G': 4,
        'GG': 5,
        'XG': 6
    };

    return tamanhos[letra] || 0;
}

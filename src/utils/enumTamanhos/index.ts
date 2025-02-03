export default function enumTamanhos(tamanho: number): string {
    const tamanhos: { [key: number]: string } = {
        1: 'PP',
        2: 'P',
        3: 'M',
        4: 'G',
        5: 'GG',
        6: 'GX'
    };

    return tamanhos[tamanho] || '';
}

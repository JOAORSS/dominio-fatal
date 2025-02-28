
export default async function buscaMunicipio(UF: string): Promise<{label: string, value: string}[]> {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`);
        const data = await response.json();
        return data.map((municipio: {nome: string}) => {
            return {label: municipio.nome, value: municipio.nome};
        });
    } catch (error) {
        console.error('Error fetching municipalities:', error);
        return [];
    }
}
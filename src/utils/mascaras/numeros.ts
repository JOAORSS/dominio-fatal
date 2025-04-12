

export default function mascaraNumeroCartao(texto: string, setTexto: (texto:string) => void) {

    const tamanho = texto.length;

    if (tamanho == 20) {
        setTexto(texto.slice(0, 19));
    }

    if (tamanho == 5 || tamanho == 10 || tamanho == 15) {
        formatarTextoNaPosicao(texto, tamanho, setTexto);
    }

    function formatarTextoNaPosicao(texto: string, posicao: number, setTexto: (texto: string) => void) {
        if (texto.charAt(posicao - 1) != "-") {
            const formatedText = texto.slice(0, posicao - 1)
                .concat("-")
                .concat(texto.charAt(posicao - 1));
            setTexto(formatedText);
        }
    }
}

export function mascaraNumeroPaste(setString: (newString:string) => void ,pasteString: string):string {

    const formatedText = pasteString.split("");

    if (formatedText.length >= 5) {
        formatedText.splice(4, 0, "-");

        if (formatedText.length > 9)  {
            formatedText.splice(9, 0, "-");

            if (formatedText.length >= 15) {
                formatedText.splice(14, 0, "-");
            }
        }
    }

    setString(formatedText.join(""));
    return formatedText.join("");

}
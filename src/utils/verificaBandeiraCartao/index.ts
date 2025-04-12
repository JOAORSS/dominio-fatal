export default function verificaBandeiraCartao(numbers: string): string {

    const numbersInteger = Number(numbers);
    const firstTwo = Number(numbers.slice(0,2));

    if (Number(numbers.charAt(0)) == 4) return "Visa";
    if (firstTwo >= 51 || firstTwo <= 55) return "Mastercard"
    if (numbersInteger >= 2221 || numbersInteger <= 2720) return "Mastercard"
    if (numbersInteger == 4011 || numbersInteger == 4312 || numbersInteger == 4389) return "Elo"
    if (numbersInteger == 6062) return "Hipercard"

    return "";

}

verificaBandeiraCartao("5544738052878136")
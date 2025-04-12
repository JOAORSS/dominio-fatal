export default function validarCartao(cardNumber: string): boolean {
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    const numbers = cleanedCardNumber.split('').map(Number);
    const cardLength = cleanedCardNumber.length;

    let numbersImpar = [];
    let numbersPar = [];    

    for (let i = cardLength - 2; i >= 0; i -= 2) {
        numbers[i] = 
            (numbers[i] * 2) > 9 
                ? somaMaiorQueNove(numbers[i] * 2) 
                : numbers[i] * 2;
    }

    for (let i = cardLength - 1; i >= 0; i -= 2) {
        numbersImpar[i] = numbers[i];
    }

    for (let i = cardLength - 0; i >= 0; i -= 2) {
        numbersPar[i] = numbers[i];
    }   
    
    numbersImpar = numbersImpar.flat();
    numbersPar = numbersPar.flat();
    numbersPar.pop();

    const sumNumbersImpar = numbersImpar.reduce((acc, num) => acc + num, 0)
    const sumNumbersPar = numbersPar.reduce((acc, num) => acc + num, 0);
    const total = sumNumbersImpar + sumNumbersPar;
    const validation = total.toString().charAt(1)

    if(Number(validation) === 0) return true

    return false
}


function somaMaiorQueNove(number: number): number {

    const numberOne = Number(number.toString().charAt(0));
    const numberTwo = Number(number.toString().charAt(1))
    return numberOne + numberTwo;

}
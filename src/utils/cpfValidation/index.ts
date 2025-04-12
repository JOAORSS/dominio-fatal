export default function cpfValidation(cpfString: string): boolean {

    cpfString = cpfString.replace(/\D/g, "");
    if (cpfString.length !== 11) return false;

    const cpfArray = cpfString.split('');

    if (!findFirstNUmber(cpfArray)) return false
    if (!findSecondNunber(cpfArray)) return false

    return true;

}

function findFirstNUmber(cpfArray:string[]): boolean {

      const multipliersJ = [10, 9, 8, 7, 6, 5, 4, 3, 2];

          const sum = cpfArray
            .slice(0, 9)
            .reduce((acc, digit, index) => acc + Number(digit) * multipliersJ[index],0);
          const remainder = sum % 11;
          const digit = remainder < 2 ? 0 : 11 - remainder;
      
          if (Number(cpfArray[9]) !== digit) return false;
      
    return true
}

function findSecondNunber(cpfArray:string[]): boolean {

    const multipliersK = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

      const sumSecondDigit = cpfArray
      .slice(0, 10)
      .reduce((acc, digit, index) => acc + Number(digit) * multipliersK[index],0);
      const remainderSecondDigit = sumSecondDigit % 11;
      const secondDigit = remainderSecondDigit < 2 ? 0 : 11 - remainderSecondDigit;

      if (Number(cpfArray[10]) !== secondDigit) return false;

      return true

}

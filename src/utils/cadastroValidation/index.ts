

interface CadastroValidationProps {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    scoreSenha: number;
    confirmarSenha: string;
}
export default function cadastroValidation({
    nome,
    sobrenome,
    email,
    senha,
    scoreSenha,
    confirmarSenha
}: CadastroValidationProps) {
    if(nome.length > 3) {
        if(sobrenome.length > 3) {
            if(email.length > 3 || email.includes("@") || email.includes(".")) {
                if(senha.length > 3 || scoreSenha > 1) {
                    if(confirmarSenha === senha) {
                        return true;
                    }
                }
            }
        }
    }
}
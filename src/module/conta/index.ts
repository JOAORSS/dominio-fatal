import CartaoType from "./cartao";
import EnderecoType from "./endereco";
import PerfilType from "./perfil";

interface ContaType extends EnderecoType, PerfilType, CartaoType {
    id: number;
}

export default ContaType;
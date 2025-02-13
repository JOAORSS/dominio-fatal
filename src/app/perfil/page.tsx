import Container from "@/components/container";
import styles from "./perfil.module.css"
import PerfilConfig from "@/components/perfilPagina/configuracao";
import PerfilPerfil from "@/components/perfilPagina/perfil";
import Authorization from "@/utils/userValidation";

export default function Perfil(){
    
    return (
        <Authorization>
            <div className={styles.perfil}>
            <Container>
                <div className={styles.perfilContainer}>
                    <PerfilPerfil />
                    <PerfilConfig />
                </div>
            </Container>
        </div>
        </Authorization>
    );
}
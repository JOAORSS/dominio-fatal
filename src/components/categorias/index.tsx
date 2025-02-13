import Container from '../container';
import CategoriaCard from './categoriaCard';
import styles from './categorias.module.css';
import Categoria from '@/module/categoria';
import SectionLabel from '../sectionLabel';

const categoria : Categoria = {
    "id": 1,
    "nome": "Fitness",
    "imagem": "/images/mockimages/categoriamock.jpg"
};

export default function Categorias() {
    return (
        <section className={styles.categorias}>
            <SectionLabel title="Categorias" />
                <Container center>
                    {/* aqui vai sers um map */}
                    <ul className={styles.categorias__lista}>
                        <CategoriaCard categoria={categoria} />
                        <div className={styles.divisoria} />
                        <CategoriaCard categoria={categoria} />
                        <div className={styles.divisoria} />
                        <CategoriaCard categoria={categoria} />
                        <div className={styles.divisoria} />
                        <CategoriaCard categoria={categoria} />
                        <div className={styles.divisoria} />
                        <CategoriaCard categoria={categoria} />
                    </ul>
                </Container>
        </section>

    );
}
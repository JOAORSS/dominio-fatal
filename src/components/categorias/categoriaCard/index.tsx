import Image from 'next/image';
import styles from './categoriaCard.module.css';
import Categoria from '@/module/categoria';


export default function CategoriaCard({ categoria } : { categoria: Categoria }) {
    return (
        <li className={styles.categoriaCard}>
                <Image 
                    className={styles.imagem}
                    src={categoria.imagem}
                    alt={categoria.nome}
                    width={307}
                    height={307}
                />
                <h2 className={styles.nome}>{categoria.nome}</h2>
        </li>
    );
}
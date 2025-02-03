import styles from './banner.module.css';
import Button from '../button';

interface BannerProps {
    texto: string;
    imagem: string;
}

export default function BannerEstacao({texto, imagem}: BannerProps) {
    return (
        <section className={styles.bannerEstacao}>
                <div className={styles.content}>
                    <h1 className={styles.content__titulo}>{texto}</h1>
                    <Button maxWidht="220px" destaque type="full">Confira!</Button>
                </div>
            <div className={styles.containerTrapasezio}>
                <div style={{backgroundImage: `url(${imagem})`}} className={styles.trapezio} />
            </div>
        </section>
    )
}
"use client"

import Image from "next/image"
import styles from "./produtoImagens.module.css"
import ImagenLateral from "./imagenLateral"
import { useState } from "react"
import ModalImagens from "./modalImagens"

export default function ProdutoImagens({ imagens }: { imagens: string[] }) {
    const [imagemSelecionada, setImagemSelecionada] = useState(imagens[0])
    const [modalAberto, setModalAberto] = useState(false);

    function handleImagenClick(imagen: string) {
        setImagemSelecionada(imagen)
    }

    return (
        <>
        <ModalImagens imagemSelecionada={imagemSelecionada} aberto={modalAberto} setModal={setModalAberto} imagens={imagens} />
        <div className={styles.produtoImagensContainer}>
            <div className={styles.containerLateral}>
            {imagens.map((imagen, index) => (
                <ImagenLateral key={index} imagemSelecionada={imagemSelecionada} imagen={imagen} onClick={handleImagenClick} />
            ))}
            </div>
            <Image 
            onClick={() => {
                setModalAberto(true);
                window.scrollTo({
                top: 100,
                behavior: 'smooth'
                });
            }}
            src={imagemSelecionada}
            alt="Imagem do produto"
            width={400}
            height={510}
            priority
            className={styles.produtoImagen}
            />
        </div>
        </>
    )
}
"use client"

import Image from "next/image"
import styles from "./produtoImagens.module.css"
import ImagenLateral from "./imagenLateral"
import { useState } from "react"

export default function ProdutoImagens({ imagens }: { imagens: string[] }) {
    const [imagemSelecionada, setImagemSelecionada] = useState(imagens[0])

    function handleImagenClick(imagen: string) {
        setImagemSelecionada(imagen)
    }

    return (
        <div className={styles.produtoImagensContainer}>
            <div className={styles.containerLateral}>
                {imagens.map((imagen, index) => (
                    <ImagenLateral key={index} imagemSelecionada={imagemSelecionada} imagen={imagen} onClick={handleImagenClick} />
                ))}
            </div>
            <Image 
                src={imagemSelecionada}
                alt="Imagem do produto"
                width={400}
                height={510}
                priority
                className={styles.produtoImagen}
            />
        </div>

    )
}
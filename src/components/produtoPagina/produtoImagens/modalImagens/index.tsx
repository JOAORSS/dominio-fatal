"use client"

import Image from "next/image";
import styles from "./modalImagens.module.css"
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function ModalImagens(
    {
        imagemSelecionada,
        imagens,
        aberto, 
        setModal, 
    }
    :{ 
        imagemSelecionada: string,
        imagens: string[],
        aberto: boolean,
        setModal: (condicao: boolean) => void,
    }) {

    useEffect(() => {
        setImagemModal(imagemSelecionada);
        if (aberto) {
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }
    }, [aberto, imagemSelecionada]);

    const [imagemModal, setImagemModal] = useState(imagemSelecionada);

    const voltaDestaque = () => {
        const indiceAtual = imagens.indexOf(imagemModal);
        const novoIndice = (indiceAtual - 1 + imagens.length) % imagens.length;
        setImagemModal(imagens[novoIndice]);
    };

    const avancaDestaque = () => {
        const indiceAtual = imagens.indexOf(imagemModal);
        const novoIndice = (indiceAtual + 1) % imagens.length;
        setImagemModal(imagens[novoIndice]);
    };

    return (
        <>
            {aberto && <div className={styles.overlay} />}
            <dialog className={styles.modal} open={aberto}>
                <button className={styles.arrow__button}>
                <IoIosArrowBack
                    onClick={() => voltaDestaque()}
                    className={styles.arrow + " " + styles.arrow__left}
                    size={100}
                    color="#FFF" 
                />
                </button>
                <Image 
                    src={imagemModal}
                    alt="Imagem do produto"
                    height={1500}
                    width={1500}
                    priority
                    className={styles.imagemModal}
                />
                <button className={styles.arrow__button}>
                <IoIosArrowForward
                    onClick={() => avancaDestaque()}
                    className={styles.arrow +" "+ styles.arrow__right}
                    size={100}
                    color="#FFF"
                />
                </button>            
                <form className={styles.close} method="dialog">
                <button 
                    className={styles.close__button} onClick={() => setModal(false)}
                    type="button"
                    aria-label="Fechar modal"
                    title="Fechar modal"
                >
                    <IoCloseOutline size={60} color="#FFF" />
                </button>
            </form>
            </dialog>
        </>
    )
}
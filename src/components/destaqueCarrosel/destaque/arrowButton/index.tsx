"use client"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "../destaque.module.css";
import useDestaqueContext from "@/hooks/useDestaqueContext";

interface ArrowButtonProps {
    left?: boolean;
    right?: boolean;
}

export default function ArrowButton({ left, right }: ArrowButtonProps) {
        const { voltaDestaque, avancaDestaque } = useDestaqueContext();
    
    return(
        <button style={{cursor: 'pointer', background: "transparent", border: "none"}}>
            { left &&
                <IoIosArrowBack
                    onClick={() => voltaDestaque()}
                    className={styles.arrow + " " + styles.arrow__left}
                    size={100}
                    color="var(--cor-primaria)" 
                />
            }
            { right &&
                <IoIosArrowForward
                    onClick={() => avancaDestaque()}
                    className={styles.arrow +" "+ styles.arrow__right}
                    size={100}
                    color="var(--cor-primaria)"
                />
            }
        </button>
    )
}
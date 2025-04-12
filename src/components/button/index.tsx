import Link from "next/link";
import styles from "./button.module.css"

interface ButtonProps {
    children: React.ReactNode;
    type: "full" | "outline" | "filled";
    onClick?: (event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
    maxWidht?: string;
    destaque?: boolean;
    link?: string;
    disabled?: boolean;
}

export default function Button({children, type, onClick, maxWidht, link, destaque = false, disabled = false}: ButtonProps) {

    const maxWidhtStyle = {maxWidth: maxWidht}

    return (
        <>
            {!link ? 
                <button
                    onClick={onClick}
                    className={
                        styles.button +" "+ 
                        styles[type] + " " + 
                        (destaque && styles.destaque) +" "+
                        (disabled && styles.disabled) 
                    }
                    style={maxWidhtStyle}
                >
                    {children}
                </button>
            : <Link
                href={link}
                onClick={onClick}
                className={
                    styles.button +" "+ styles[type] + " " + (destaque && styles.destaque) 
                }
                style={maxWidhtStyle}
            >
                {children}
            </Link>    
        }
        </>

    )
}
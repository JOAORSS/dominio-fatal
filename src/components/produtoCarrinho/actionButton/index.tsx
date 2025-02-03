import { FaMinus, FaPlus } from "react-icons/fa6";

interface actionButtonProps {
    action: () => void;
    minus?: boolean;
    plus?: boolean;
}

const style = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer"
};

export default function ActionButton({ action, minus, plus }: actionButtonProps) {
    return(
        <button 
            style={style} 
            onClick={action} 
            onMouseDown={(e) => {
            const child = e.currentTarget.children[0] as HTMLElement;
            if (child) child.style.color = "rgba(94, 22, 108, 0.54)";
            }} 
            onMouseUp={(e) => {
            const child = e.currentTarget.children[0] as HTMLElement;
            if (child) child.style.color = "var(--cor-primaria)";
            }}
        >
            {minus && 
            <FaMinus 
            size={20} 
            color="var(--cor-primaria)" 
            />}
            {plus && 
            <FaPlus 
            size={20} 
            color="var(--cor-primaria)" 
            />}
        </button>
    )
}
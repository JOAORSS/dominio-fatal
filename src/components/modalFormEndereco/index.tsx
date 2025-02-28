"use client"

import { useState } from "react";
import CampoTexto from "../campoTexto";
import styles from "./modal.module.css"
import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import Button from "../button";


export default function WarperModalButton() {

    const [open, setOpen] = useState<boolean>(false);

    return(
        <>
            <button 
                className={styles.infoBox +" "+ styles.adicionar}
                style={{marginLeft: "20px", marginTop: "10px"}}
                onClick={() => setOpen(true)}
            >
                <IoIosAddCircle size={50} color="var(--detalhes)" />
                <div className={styles.perfilInfo}>
                    <h3 className={styles.nome} style={{color: "var(--detalhes)"}}>Adicionar endereço</h3>
                </div>
            </button>
            {open && <ModalFormEndereco open={open} setOpen={setOpen} />}
            {open && <div className="blackout" />}
        </>
    )
}


function ModalFormEndereco({open = true, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) {

    const [estado, setEstado] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [numero, setNumero] = useState<string>("");

    return(
        <dialog className={styles.modalForm} open={!!open}>
            <form 
                method="post" 
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    setOpen(false);
                }}
            >
                <h2>Adicionar Endereço</h2>
                <CampoTexto placeholder="Estado" validation={() => estado.length > 3} text={estado} onChange={setEstado} />
                <CampoTexto placeholder="Cidade" validation={() => estado.length > 3} text={cidade} onChange={setCidade} />
                <CampoTexto placeholder="Bairro" validation={() => estado.length > 3} text={bairro} onChange={setBairro} />
                <CampoTexto placeholder="Rua" validation={() => estado.length > 3} text={rua} onChange={setRua} />
                <CampoTexto placeholder="CEP" validation={() => estado.length == 8} text={cep} onChange={setCep} />
                <CampoTexto placeholder="Local" validation={() => estado.length > 3} text={local} onChange={setLocal} />
                <CampoTexto placeholder="Número"validation={() => estado.length > 3} text={numero} onChange={setNumero} />
                <Button type="full" >Adicionar</Button>
            </form>
            <form method="dialog" onSubmit={() => setOpen(false)}>
                <button className={styles.close} onClick={() => setOpen(false)} type="submit"><IoIosClose color="var(--cor-primaria)" size={50} /></button>
            </form>
        </dialog>
    )
}


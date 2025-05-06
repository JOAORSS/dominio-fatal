"use client"

import { IoIosClose } from "react-icons/io";
import styles from "./modal.module.css";
import React from "react";
import Blackout from "../blackout";

export default function ModalGeral(
    {
        setOpen,
        top,
        open,
        children
    }: 
    {
        setOpen: (arg: boolean) => void,
        top?: string,
        children: React.ReactNode,
        open: boolean
    }) {


    return(
        <>
            {open &&
            <>
            <dialog 
                style={{top: top ? top : "35%"}}
                className={styles.modalForm} 
                open={!open}>

                {children}

                <form method="dialog" onSubmit={() => setOpen(false)}>
                    <button className={styles.close} type="submit">
                        <IoIosClose color="var(--cor-primaria)" size={50} />
                    </button>
                </form>
            </dialog>
            <Blackout />
            </>
            }
        </>
        
    )
}
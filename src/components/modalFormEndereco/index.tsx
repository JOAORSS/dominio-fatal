"use client"

import { useEffect, useState } from "react";
import CampoTexto from "../campoTexto";
import styles from "./modal.module.css"
import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import Button from "../button";
import CampoSelect from "../campoTexto/campoSelect";
import buscaMunicipio from "@/services/enderecos/municipios";
import insertAddress from "@/services/supabase/address/insertAddress";
import Warning from "../produtoPagina/produtoOpcoes/warning";
import { useRouter } from "next/navigation";
import LoadingPage from "../loading";

export default function WarperModalButton({email} : {email: string}) {

    const [open, setOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

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
            {open && <ModalFormEndereco email={email} setLoading={setLoading} setWarning={setWarning} open={open} setOpen={setOpen} />}
            {open && <div className="blackout" />}
            {warning.length > 0 && <Warning text={warning} close={() => setWarning("")} key={warning} />}
            {loading && <LoadingPage />}
        </>
    )
}


export function ModalFormEndereco(
    {
        open = true, 
        setOpen, 
        setWarning,
        setLoading,
        email,
    } : 
    {
        open: boolean, 
        setOpen: (open: boolean) => void, 
        setWarning: (warning: string) => void,
        setLoading: (loading: boolean) => void,
        email: string
    }) 
    {

    const router = useRouter();

    const [estado, setEstado] = useState<string>("");
    const [onEstadoChange, setOnEstadoChange] = useState<{label: string, value: string}[]>([]);
    const [cidade, setCidade] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [numero, setNumero] = useState<string>("");


    async function handleSubmit() {

        const formData = {
            estado,
            cidade,
            cep,
            bairro,
            rua,
            local,
            numero,
            email,
            complemento: complemento.length == 0 ? "" : complemento
        };
        
        const response = await insertAddress(formData);

        setWarning(response.hint);

        if (response.operation == true) {
            router.push("/perfil");
            router.refresh();
            setWarning(response.hint);
        }
        setLoading(false);
    } 

    useEffect(() => {
        const fetchMunicipios = async () => {
            if (estado === "") {
                setOnEstadoChange([{ label: "Selecione um estado", value: "" }]);
                return;
            }

            const municipios = await buscaMunicipio(estado);
            setOnEstadoChange(municipios);
        };
        fetchMunicipios();
    }, [estado]);

    useEffect(() => {
        const fetchCepData = async () => {
            if (cep.length === 9) {

                const cepNumbers = cep.replace("-", "");

                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`);
                    const data = await response.json();
                    if (data) {
                        setEstado(data.uf || "");
                        setCidade(data.localidade || "");
                        setBairro(data.bairro || "");
                        setRua(data.logradouro || "");
                        setComplemento(data.complemento || "");
                    }
                } catch (error) {
                    console.error("Erro ao buscar CEP:", error);
                }
            }
        };
        fetchCepData();
    }, [cep, estado, cidade]);

    return(
        <dialog className={styles.modalForm} open={!!open}>
            <h2>Adicionar Endereço</h2>
            <form 
                method="get" 
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true)
                    handleSubmit();
                }}
            >
                <div>
                    <label>Estado</label>
                    <CampoSelect 
                        required 
                        selected={estado} 
                        maxWidth="224px"
                        onChange={setEstado} 
                    />
                </div>
                <div>
                    <label>Cidade</label>
                    <CampoSelect 
                        required
                        selected={cidade} 
                        onChange={setCidade}
                        maxWidth="224px"
                        widthContent="224px"
                        options={onEstadoChange}
                        disabled={estado === ""}
                    />
                </div>
                <div>
                    <label>CEP</label>           
                    <CampoTexto 
                        type="masked"
                        onChange={setCep}
                        text={cep}
                        maxWidth="224px"
                        required
                    />     
                </div>
                <div>
                    <label>Bairro</label>
                    <CampoTexto 
                        required
                        placeholder="Bairro"
                        validation={() => bairro.length < 3} 
                        text={bairro} 
                        onChange={setBairro} 
                    />
                </div>
                <div>
                    <label>Rua</label>
                    <CampoTexto 
                        required
                        placeholder="Rua"
                        validation={() => rua.length < 3} 
                        text={rua} 
                        onChange={setRua} 
                    />
                </div>
                <div>
                    <label>Número</label>
                    <CampoTexto 
                        number
                        required
                        placeholder="Número"
                        validation={() => numero.length > 4} 
                        text={numero} 
                        onChange={setNumero} 
                    />
                </div>
                <div>
                    <label>Local</label>
                    <CampoSelect
                        required
                        widthContent="224px"
                        options={[
                            {label: "Selecione um local", value: ""},
                            {label: "Casa", value: "Casa"},
                            {label: "Apartamento", value: "Apartamento"},
                            {label: "Trabalho", value: "Trabalho"},
                        ]}
                        selected={local} 
                        onChange={setLocal} 
                    />
                </div>
                <div>
                    <label>Complemento</label>
                    <CampoTexto 
                        placeholder="Complemento"
                        text={complemento} 
                        onChange={setComplemento} />
                </div>
                <Button maxWidht="300px" type="full" >Adicionar</Button>
            </form>
            <form method="dialog" onSubmit={() => setOpen(false)}>
                <button 
                    className={styles.close}
                    onClick={() => setOpen(false)} 
                    type="submit">
                        <IoIosClose color="var(--cor-primaria)" size={50} />
                </button>
            </form>
        </dialog>
    )
}




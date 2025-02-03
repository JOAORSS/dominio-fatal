import Frete from "@/module/frete";
import axios from "axios";

export default function callFreteApi(frete:string, setFrete: (frete: Frete[]) => void) {
    const freteApi = `http://localhost:3000/api/calcularFrete?cepDestino=${frete}`;
    axios.post(freteApi, {
        peso: "1", 
        comprimento: "20", 
        altura: "10", 
        largura: "15"
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }).then((res) => {
        setFrete(res.data);
    }).catch((err) => {
        setFrete(err)
    });
}
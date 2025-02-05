import axios from "axios";

export default async function postarComentario(produto: number, usuario: string, comentario: string) {
    return axios.post(process.env.NEXT_PUBLIC_API_COMENTARIOS!, {
        "produto": produto,
        "usuario": usuario,
        "comentario": comentario
    }).then((data) => (data.status === 201 ? true : false));
}
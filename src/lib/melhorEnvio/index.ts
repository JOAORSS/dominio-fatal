// lib/melhorEnvio.js
import axios from 'axios';

const apiMENV = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MELHOR_ENVIO_API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'joaors987654321@gmail.com',
  },
});

export default apiMENV;
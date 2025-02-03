import type { Metadata } from "next";
import { Raleway, Julius_Sans_One } from "next/font/google";
import "./globals.css";
import { CarrinhoProvider } from "@/context/carrinhoContext";
import Rodape from "@/components/rodape";
import Cabecalho from "@/components/cabecalho";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-principal",
});

const juliusSansOne = Julius_Sans_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-destaques",
});

export const metadata: Metadata = {
  title: "Dominio fatal",
  description: "loja de lingeries e roupas intimas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`global ${raleway.variable} ${juliusSansOne.variable}`}>
      <body>
        <CarrinhoProvider>
          <Cabecalho />
          {children}
          <Rodape />
        </CarrinhoProvider>
      </body>
    </html>
  );
}

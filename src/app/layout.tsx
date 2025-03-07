import type { Metadata } from "next";
import { Raleway, Julius_Sans_One } from "next/font/google";
import "./globals.css";
import "@/animations/animations.css";
import Rodape from "@/components/rodape";
import Cabecalho from "@/components/cabecalho";
import UseGlobalProviders from "@/hooks/useGlobalProviders";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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
  icons: [{ href: "/icon.svg", rel: "icon", url: "/icon.svg" }],
  openGraph: {
    title: "Dominio fatal",
    description: "loja de lingeries e roupas intimas",
    url: "https://dominiofatal.com",
    phoneNumbers: "+55 54 98438-8564",
    type: "website",
    countryName: "Brasil",
    siteName: "Dominio fatal",
    locale: "pt_BR",
    images: [{ url: "/icon.svg", alt: "logo" }],
  },  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="pt-BR" className={`global ${raleway.variable} ${juliusSansOne.variable}`}>
      <body>
        <SessionProvider session={session}>
          <UseGlobalProviders>
            <Cabecalho />
            {children}
            <Rodape />
          </UseGlobalProviders>
        </SessionProvider>
      </body>
    </html>
  );
}

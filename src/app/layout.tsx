import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Kalion Tecnologia | Soluções em TI, Web e Segurança",
  description:
    "Site institucional premium da Kalion Tecnologia com serviços de desenvolvimento web, segurança eletrônica, redes, automação e suporte técnico.",
  keywords: [
    "kalion tecnologia",
    "desenvolvimento web",
    "segurança eletrônica",
    "redes e infraestrutura",
    "suporte técnico",
    "automação",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${orbitron.variable} ${rajdhani.variable}`}>{children}</body>
    </html>
  );
}

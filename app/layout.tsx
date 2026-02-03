import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "AM Seguridad | Soluciones de seguridad física y electrónica 24/7",
  description:
    "Seguridad electrónica, monitoreo 24/7, CCTV y control de accesos para empresas e industrias en Argentina.",
  keywords: [
    "seguridad electrónica",
    "monitoreo 24/7",
    "CCTV",
    "control de accesos",
    "seguridad para empresas",
    "seguridad industrial",
    "seguridad en Buenos Aires",
    "seguridad en Santa Fe"
  ],
  metadataBase: new URL("https://amseguridad.com.ar"),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}

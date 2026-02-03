import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "AM Seguridad | Solidez, tecnología y confianza",
  description:
    "Soluciones integrales de seguridad física y electrónica con monitoreo 24/7, respuesta coordinada y foco operativo.",
  metadataBase: new URL("https://amseguridad.com.ar"),
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

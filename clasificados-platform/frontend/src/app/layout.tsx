import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { BuscadorHeader } from "@/features/publicaciones/components/BuscadorHeader";

import "./globals.css";
import styles from "./layout.module.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Posteate",
  description: "Información y publicaciones locales de Melipilla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={styles.body}>
        <Providers>
          <header className={styles.header}>
            <div className={styles.headerInner}>
              <Link href="/" className={styles.logo}>
                <span className={styles.logoMark}>P</span>
                <span className={styles.logoText}>Posteate</span>
              </Link>

              <BuscadorHeader />

              <nav className={styles.nav}>
                <Link href="/" className={styles.navLinkActive}>
                  Feed
                </Link>
                <span className={styles.navLinkDisabled} title="Próxima iteración">
                  Publicar
                </span>
                <Link href="/login" className={styles.navLink}>
                  Ingresar
                </Link>
              </nav>
            </div>
          </header>
          <main className={styles.main}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

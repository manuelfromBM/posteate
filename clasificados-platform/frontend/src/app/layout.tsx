import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

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
                Posteate
              </Link>
              <div className={styles.headerRight}>
                <span className={styles.ubicacion}>📍 Melipilla, Chile</span>
                <Link href="/login" className={styles.login}>
                  Ingresar
                </Link>
              </div>
            </div>
          </header>
          <main className={styles.main}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

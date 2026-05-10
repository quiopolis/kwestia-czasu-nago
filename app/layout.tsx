import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kwestia Czasu / N A G O — restauracja Białystok",
  description:
    "Restauracja w Białymstoku z kuchnią podlaską, słowiańską i polską w nowoczesnym wydaniu. Śniadania, brunch, lunch, kolacje, wino i słoiki z NAGO.",
  keywords: [
    "Kwestia Czasu",
    "NAGO",
    "restauracja Białystok",
    "brunch Białystok",
    "kuchnia podlaska",
    "kuchnia polska Białystok",
    "śniadania Białystok",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full bg-[var(--cream)] text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}

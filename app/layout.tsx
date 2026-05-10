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

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kwestia Czasu / N A G O",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wesoła 17/U1",
    postalCode: "15-306",
    addressLocality: "Białystok",
    addressCountry: "PL",
  },
  telephone: "+48 600 575 050",
  email: "neobistrokwestiaczasu@gmail.com",
  servesCuisine: [
    "kuchnia polska",
    "kuchnia podlaska",
    "kuchnia słowiańska",
    "brunch",
  ],
  priceRange: "umiarkowane ceny",
  openingHours: [
    "Mo closed",
    "Tu 08:00-15:00",
    "We 08:00-15:00",
    "Th 08:00-15:00",
    "Fr 08:00-22:00",
    "Sa 09:00-23:00",
    "Su 09:00-20:00",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

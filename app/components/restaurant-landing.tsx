"use client";
/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  ChefHat,
  Clock3,
  Coffee,
  Camera,
  ExternalLink,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Sparkles,
  Star,
  UtensilsCrossed,
  Users,
  Wine,
  X,
} from "lucide-react";
import Link from "next/link";
import { ComponentType, FormEvent, useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

type InfoCard = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

type OccasionCard = {
  title: string;
  icon: ComponentType<{ className?: string }>;
};

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  heightClass: string;
};

type MenuItem = {
  name: string;
  price: string;
  description?: string;
  weight?: string;
  tags?: string[];
};

type MenuGroup = {
  title: string;
  description?: string;
  items: MenuItem[];
};

type MenuCategory = {
  id: string;
  label: string;
  note?: string;
  groups: MenuGroup[];
};

type MenuPhoto = {
  src: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "#about", label: "O nas" },
  { href: "#menu", label: "Menu" },
  { href: "#interior", label: "Wnętrze" },
  { href: "#reels", label: "Rolki" },
  { href: "#reviews", label: "Opinie" },
  { href: "#contact", label: "Kontakt" },
];

const highlightCards: InfoCard[] = [
  {
    title: "Podlaskie i słowiańskie smaki",
    description: "Smaki regionu interpretowane nowocześnie i z wyczuciem.",
    icon: ChefHat,
  },
  {
    title: "Sezonowe składniki",
    description: "Karta budowana wokół produktów dostępnych tu i teraz.",
    icon: Leaf,
  },
  {
    title: "Śniadania, brunch i lunche",
    description: "Spokojny rytm dnia od porannej kawy po lunchowe propozycje.",
    icon: Coffee,
  },
  {
    title: "Wino i kameralne kolacje",
    description: "Wieczory z dobrą selekcją win i atmosferą celebracji chwili.",
    icon: Wine,
  },
  {
    title: "Słoiki z NAGO i na wynos",
    description: "Dopieszczone dania, które możesz zabrać do domu.",
    icon: Package,
  },
];

const offerCards: InfoCard[] = [
  {
    title: "Śniadania i brunch",
    description:
      "Ciekawe, niestandardowe menu śniadaniowo-brunchowe, chałka, racuchy, sezonowe dodatki i spokojny start dnia.",
    icon: Coffee,
  },
  {
    title: "Lunch",
    description:
      "Zmieniające się menu lunchowe, produkty sezonowe i kuchnia, która nie jest przypadkowa.",
    icon: CalendarDays,
  },
  {
    title: "Kolacje",
    description:
      "Kameralny klimat, dobre wino, eleganckie podanie i dania z charakterem.",
    icon: Wine,
  },
  {
    title: "Kuchnia podlaska i słowiańska",
    description:
      "Smaki regionu pokazane szerzej niż klasyczne skojarzenia z babką czy kiszką ziemniaczaną.",
    icon: UtensilsCrossed,
  },
  {
    title: "Słoiki z NAGO",
    description:
      "Ragu, bigos i gotowe dania przygotowane z taką samą uwagą jak w restauracji.",
    icon: Package,
  },
  {
    title: "Wydarzenia i przyjęcia",
    description:
      "Miejsce dobre na rodzinne spotkania, kameralne przyjęcia i spokojne wieczory.",
    icon: Sparkles,
  },
];

const occasionCards: OccasionCard[] = [
  {
    title: "Śniadanie i brunch",
    icon: Coffee,
  },
  {
    title: "Lunch w tygodniu",
    icon: CalendarDays,
  },
  {
    title: "Romantyczna kolacja",
    icon: Wine,
  },
  {
    title: "Rodzinne spotkanie",
    icon: Users,
  },
  {
    title: "Słoiki i jedzenie na wynos",
    icon: Package,
  },
  {
    title: "Kameralne przyjęcia",
    icon: Sparkles,
  },
];

const menuCategories: MenuCategory[] = [
  {
    id: "breakfast-brunch",
    label: "Śniadanie + brunch",
    note: "Wtorek–piątek: 8:00–15:00 • Sobota–niedziela: 9:00–13:00",
    groups: [
      {
        title: "Jajka w roli głównej",
        items: [
          {
            name: "Szakszuka z ogrodu",
            price: "33,-",
            description:
              "Podawana na żeliwnej patelni, 2 jajka z płynnym żółtkiem, pasta z pieczonych pomidorów i papryki, świeże zioła i kwiaty, nasze pieczywo.",
            weight: "400g",
          },
          {
            name: "Jajecznica z rydzami",
            price: "35,-",
            description:
              "2 jajka, rydze, crème fraîche, sezonowa sałatka z winegretem, nasze pieczywo z masłem.",
            weight: "350g",
          },
          {
            name: "Jajecznica babci Ani Lipińskiej",
            price: "29,-",
            description:
              "3 jajka, skwarki z dojrzewającej słoniny złotnickiej, crème fraîche, zioła, nasze pieczywo z masłem.",
            weight: "350g",
          },
        ],
      },
      {
        title: "Kanapki / podpłomyki",
        items: [
          {
            name: "Szarpana wieprzowina",
            price: "36,-",
            description:
              "Podpłomyk à la pita, szarpana wieprzowina, jajko sadzone, chipsy z boczku, pasta z bakłażana, aioli z czosnkiem niedźwiedzim.",
            weight: "350g",
          },
          {
            name: "Boczniak",
            price: "34,-",
            description:
              "Podpłomyk à la pita, szarpany boczniak, jajko sadzone, chipsy z pietruszki, pasta z bakłażana, aioli z czosnkiem niedźwiedzim.",
            weight: "350g",
          },
          {
            name: "Jajko na podpłomyku",
            price: "13,-",
            description:
              "Podpłomykowa bułeczka z serem Bursztyn, jajkiem i szpinakiem, prosto z pieca, na mały głód albo dodatek.",
            weight: "150g",
          },
        ],
      },
      {
        title: "Chałki",
        items: [
          {
            name: "Chałka z kaszanką",
            price: "30,-",
            description:
              "Grzanka z maślanej chałki, pieczona kaszanka z jabłkiem, jajko sadzone, sos musztardowy.",
            weight: "350g",
          },
          {
            name: "Chałka ze szparagami",
            price: "36,-",
            description:
              "Grzanka z maślanej chałki, szparagi, jajko w koszulce, sałaty, ser Bursztyn, aioli z czosnku niedźwiedziego.",
            weight: "350g",
          },
          {
            name: "Chałka z łososiem",
            price: "45,-",
            description:
              "Grzanka z maślanej chałki, łosoś, jajko w koszulce, sałaty, ser Bursztyn, aioli z czosnku niedźwiedziego.",
            weight: "350g",
          },
        ],
      },
      {
        title: "Misz masz",
        items: [
          {
            name: "Bulion mocy",
            price: "19,-",
            description:
              "Klarowny bulion na kaczce lub warzywny, z jajkiem, warzywami, ziołami i omletem jajecznym.",
            weight: "250g",
          },
          {
            name: "Bon żur",
            price: "30,-",
            description: "Na żytnim zakwasie, z jajkiem i naszą białą kiełbasą.",
            weight: "280g",
          },
          {
            name: "Białe kiełbaski",
            price: "35,-",
            description: "Jajko sadzone, warzywa, nasza musztarda, pieczywo.",
            weight: "350g",
          },
          {
            name: "3 x pasta",
            price: "35,-",
            description:
              "3 rodzaje past wegetariańskich lub wegańskich, sezonowe warzywa, nasze pieczywo.",
            weight: "350g",
          },
        ],
      },
      {
        title: "Sałaty",
        items: [
          {
            name: "Sałata z kozim serem lub soczewicą",
            price: "44,-",
            description:
              "Sałaty, miętowy winegret, pieczony burak, gruszka, podpłomyk.",
            weight: "300g",
          },
          {
            name: "Sałata z łososiem",
            price: "54,-",
            description:
              "Sałaty, pomidorki koktajlowe, ser Bursztyn, sos cezar, podpłomyk.",
            weight: "350g",
          },
        ],
      },
      {
        title: "Na słodko",
        items: [
          {
            name: "Racuchy",
            price: "25,-",
            description:
              "Drożdżowe placki z pieczonymi owocami, crème fraîche, miodem z Pasieki z Supraśla.",
            weight: "250g",
          },
          {
            name: "Leniwe",
            price: "28,-",
            description: "Z twarogiem lokalnym, w sosie lawendowym.",
            weight: "300g",
          },
        ],
      },
    ],
  },
  {
    id: "main-dishes",
    label: "Dania główne",
    groups: [
      {
        title: "Dania główne",
        items: [
          {
            name: "Szczupak w pierogach",
            price: "55,-",
            description:
              "Sos szampański na bulionie ze szczupaka, młode warzywa, ziemniaczana piana, oliwa ziołowa.",
            weight: "300g",
          },
          {
            name: "Jesiotr Antonius",
            price: "89,-",
            description:
              "Młode ziemniaki z masłem tymiankowym, sos szczawiowy, sos beurre blanc, kawior Antonius Siberian 4*.",
            weight: "350g",
          },
          {
            name: "Smardze na kluskach śląskich",
            price: "49,-",
            description:
              "Grzybowe velouté, czarna soczewica, chipsy z pietruszki, młode warzywa.",
            tags: ["wegańskie", "bez laktozy", "bez glutenu"],
            weight: "390g",
          },
          {
            name: "Sałaty z soczewicą lub kozim serem",
            price: "44,-",
            description:
              "Sałaty, miętowy winegret, pieczony młody burak, gruszka, podpłomyk, soczewica lub kozi ser pleśniowy.",
            tags: ["wegańskie lub wegetariańskie", "bez laktozy"],
            weight: "250g / 280g",
          },
          {
            name: "Burger z sarny",
            price: "59,-",
            description:
              "Wypiekana na miejscu maślana bułka, majonez naszego wyrobu z czosnkiem niedźwiedzim, sałaty, konfitura z czerwonej cebuli, ziemniak „z ogniska”.",
            weight: "450g",
          },
          {
            name: "Pierś kaczki",
            price: "75,-",
            description:
              "Wysmażona na różowo, purée ziemniaczane z pastą truflową, pieczony burak, sos chicken-glace.",
            weight: "350g",
          },
          {
            name: "Comber z sarny",
            price: "89,-",
            description:
              "3 kotleciki z kostką, pietruszkowe purée, grillowany boczniak, sos demi-glace, ziołowa oliwa.",
            weight: "350g",
          },
        ],
      },
    ],
  },
  {
    id: "soups-and-starters",
    label: "Zupy i przystawki",
    groups: [
      {
        title: "Zupy",
        items: [
          {
            name: "Żur",
            price: "35,-",
            description:
              "Na mięsnym wywarze, z naszą białą kiełbasą, tłokanicą i pianą z boczku.",
            weight: "300g",
          },
          {
            name: "Podczos",
            price: "29,-",
            description:
              "Słowiańska zupa wczesnej wiosny, z pieczonymi młodymi warzywami, ziemniakiem z ogniska, oliwą koperkową i ziołami.",
            tags: ["wegańska", "bez laktozy", "bez glutenu"],
            weight: "250g",
          },
        ],
      },
      {
        title: "Przystawki",
        items: [
          {
            name: "Polskie „ostrygi”",
            price: "44,-",
            description:
              "Tołpyga gravlax, kawior Antonius, crème fraîche, żel z zakwasu buraczanego, oliwa koperkowa.",
            tags: ["bez glutenu"],
            weight: "2 szt. / 100g",
          },
          {
            name: "Tatar z jelenia",
            price: "55,-",
            description:
              "Grubo siekana ligawa jelenia, gorczyca, majonez z czosnkiem niedźwiedzim, marynaty, zioła, pieczywo własnego wypieku.",
            weight: "150g",
          },
          {
            name: "Szparagi",
            price: "39,-",
            description:
              "Z jajkiem przepiórczym, młodym ziemniakiem, majonezem z czosnkiem niedźwiedzim i nowalijkami.",
            weight: "180g",
          },
        ],
      },
      {
        title: "Dodatki",
        items: [
          {
            name: "Frytki + nasz majonez / ser Bursztyn",
            price: "12,-",
            weight: "150g",
          },
          {
            name: "Ziemniak z ogniska",
            price: "15,-",
            weight: "3 szt. / 120g",
          },
          {
            name: "Nasze pieczywo + masło — chleb i/lub podpłomyki",
            price: "15,-",
            weight: "120g",
          },
          {
            name: "Sałata z miętowym winegretem",
            price: "14,-",
            weight: "80g",
          },
          {
            name: "Szparagi z palonym masłem",
            price: "19,-",
            weight: "4 szt. / 70g",
          },
        ],
      },
    ],
  },
  {
    id: "flatbreads",
    label: "Podpłomyki",
    note: "Nasze podpłomyki wypiekamy na żytnim zakwasie, w szamotowym piecu, w temperaturze 350 stopni. Są idealne do podziału.",
    groups: [
      {
        title: "Podpłomyki z pieca",
        items: [
          {
            name: "Podpłomyk „Kaczka w buraczkach”",
            price: "44,-",
            description:
              "Szarpana kaczka, burak, sos pomidorowy, jabłko, wędzona gołda, majeranek.",
            weight: "350g",
          },
          {
            name: "Podpłomyk „Wiejski”",
            price: "44,-",
            description:
              "Tłokanica, boczek, cebula, biała kiełbasa własnego wyrobu, chrzan, śmietana.",
            weight: "350g",
          },
          {
            name: "Podpłomyk „Szparagi i jajko”",
            price: "49,-",
            description: "Szparagi, szpinak, jajko z płynnym żółtkiem.",
            tags: ["wegetariański"],
            weight: "320g",
          },
          {
            name: "Podpłomyk „Truflowy boczniak”",
            price: "42,-",
            description: "Boczniak, ziemniak, oliwa truflowa, śmietana, bursztyn.",
            tags: ["wegetariański"],
            weight: "320g",
          },
          {
            name: "Podpłomyk „Sarnina i chili”",
            price: "45,-",
            description: "Sarnina, kapary, cebula, wędzona gouda, chili.",
            weight: "350g",
          },
          {
            name: "Podpłomyk „Jesiotr”",
            price: "49,-",
            description: "Crème fraîche, por, kapary, cytrynowy twaróg, zioła.",
            weight: "320g",
          },
        ],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desery",
    groups: [
      {
        title: "Na zakończenie",
        items: [
          { name: "Sernik pistacjowy", price: "27,-", weight: "120g" },
          { name: "Tarta z rabarbarem", price: "22,-", weight: "120g" },
          {
            name: "Beza z mascarpone i owocami lasu",
            price: "25,-",
            weight: "120g",
          },
        ],
      },
    ],
  },
  {
    id: "drinks",
    label: "Napoje",
    groups: [
      {
        title: "Kawy",
        items: [
          { name: "Czarna", price: "15,-" },
          { name: "Cappuccino", price: "16,-" },
          { name: "Latte", price: "18,-" },
          { name: "Orange espresso", price: "18,-" },
        ],
      },
      {
        title: "Herbaty",
        items: [{ name: "Richmont, imbryk 450 ml", price: "15,-" }],
      },
      {
        title: "Inne",
        items: [
          { name: "Lemoniada 300 ml", price: "16,-" },
          { name: "Kwas chlebowy 500 ml", price: "17,-" },
          {
            name: "Woda gazowana / niegazowana 250 ml",
            price: "9,-",
          },
          { name: "Wino 125 ml", price: "27,-" },
          { name: "Koktajl 200 ml", price: "19,-" },
          { name: "Aperol Spritz 150 ml", price: "31,-" },
          {
            name: "Pet nat / naturalne lekko musujące wino",
            price: "29,-",
          },
        ],
      },
      {
        title: "Powiększ śniadanie",
        items: [
          { name: "Boczek", price: "5,-" },
          { name: "Szparagi z palonym masłem", price: "19,-" },
          { name: "Nasze pieczywo + masło", price: "12,-" },
          { name: "Aioli", price: "4,-" },
          { name: "Biała kiełbaska", price: "7,-" },
          { name: "Jajko", price: "4,-" },
        ],
      },
    ],
  },
];

const menuPhotos: MenuPhoto[] = [
  { src: "/images/menu/menu-dania-1.jpg", label: "Menu główne — strona 1" },
  { src: "/images/menu/menu-dania-2.jpg", label: "Menu główne — strona 2" },
  {
    src: "/images/menu/menu-sniadanie-brunch.jpg",
    label: "Śniadanie + brunch",
  },
];

const galleryItems: GalleryItem[] = [
  {
    src: "/images/jedzenie (1).jpg",
    alt: "Sezonowe talerze",
    caption: "Sezonowe talerze",
    heightClass: "h-[21rem]",
  },
  {
    src: "/images/jedzenie (2).jpg",
    alt: "Podlaskie inspiracje",
    caption: "Podlaskie inspiracje",
    heightClass: "h-[18rem]",
  },
  {
    src: "/images/jedzenie (3).jpg",
    alt: "Śniadania i brunch",
    caption: "Śniadania i brunch",
    heightClass: "h-[24rem]",
  },
  {
    src: "/images/jedzenie (4).jpg",
    alt: "Sezonowe talerze",
    caption: "Sezonowe talerze",
    heightClass: "h-[17rem]",
  },
  {
    src: "/images/jedzenie (5).jpg",
    alt: "Wino i wieczory",
    caption: "Wino i wieczory",
    heightClass: "h-[24rem]",
  },
  {
    src: "/images/jedzenie (6).jpg",
    alt: "Podlaskie inspiracje",
    caption: "Podlaskie inspiracje",
    heightClass: "h-[18rem]",
  },
  {
    src: "/images/jedzenie (7).jpg",
    alt: "Słoiki i dania na wynos",
    caption: "Słoiki i dania na wynos",
    heightClass: "h-[21rem]",
  },
  {
    src: "/images/jedzenie (8).jpg",
    alt: "Sezonowe talerze",
    caption: "Sezonowe talerze",
    heightClass: "h-[18rem]",
  },
  {
    src: "/images/jedzenie (9).jpg",
    alt: "Wino i wieczory",
    caption: "Wino i wieczory",
    heightClass: "h-[23rem]",
  },
  {
    src: "/images/wnetrze.png",
    alt: "Kameralne wnętrze",
    caption: "Kameralne wnętrze",
    heightClass: "h-[26rem]",
  },
  {
    src: "/images/wnetrze1.jpg",
    alt: "Otwarty klimat restauracji",
    caption: "Otwarty klimat restauracji",
    heightClass: "h-[18rem]",
  },
  {
    src: "/images/wnetrze2.jpg",
    alt: "Kameralne wnętrze",
    caption: "Kameralne wnętrze",
    heightClass: "h-[22rem]",
  },
];

const reels = [
  { src: "/images/video/1 (1).mp4", label: "Z kuchni" },
  { src: "/images/video/1 (2).mp4", label: "Weekendowe smaki" },
  { src: "/images/video/1 (3).mp4", label: "Przygotowanie talerza" },
  { src: "/images/video/1 (4).mp4", label: "Celebruj chwile" },
];

const reviews = [
  {
    quote:
      "Bardzo smaczne dania, ciekawe menu śniadaniowo-brunchowe i świetne sezonowe propozycje.",
    author: "Gość restauracji",
  },
  {
    quote:
      "Kameralne miejsce z duszą, pięknym wnętrzem, dobrą muzyką i jedzeniem, które zostaje w pamięci.",
    author: "Gość restauracji",
  },
  {
    quote:
      "Świetna obsługa, wyjątkowe wino i kuchnia pełna charakteru. Jedno z tych miejsc, do których chce się wracać.",
    author: "Gość restauracji",
  },
  {
    quote:
      "Idealne miejsce na lunch, kolację, rodzinne spotkanie albo spokojny wieczór przy dobrym jedzeniu.",
    author: "Gość restauracji",
  },
];

const openingHours = [
  "Poniedziałek: zamknięte",
  "Wtorek: 8:00–15:00",
  "Środa: 8:00–15:00",
  "Czwartek: 8:00–15:00",
  "Piątek: 8:00–22:00",
  "Sobota: 9:00–23:00",
  "Niedziela: 9:00–20:00",
];

const interiorTags = [
  "romantyczna atmosfera",
  "stoliki na zewnątrz",
  "spokojne spotkania",
  "rodzinne przyjęcia",
  "kameralny klimat",
];

const serviceTags = [
  "dostawa",
  "na wynos",
  "stoliki na zewnątrz",
  "rezerwacje",
  "umiarkowane ceny",
  "menu publikowane na Facebooku",
  "kontakt telefoniczny",
];

const mapsEmbedUrl =
  "https://www.google.com/maps?q=Weso%C5%82a%2017%2FU1%2C%2015-306%20Bia%C5%82ystok%2C%20Polska&output=embed";
const mapsExternalUrl =
  "https://www.google.com/maps/search/?api=1&query=Weso%C5%82a%2017%2FU1%2C%2015-306%20Bia%C5%82ystok%2C%20Polska";

const assetPath = (path: string) => encodeURI(path);

const riseIn = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

export default function RestaurantLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState<string>(
    menuCategories[0]?.id ?? "breakfast-brunch",
  );
  const [openMenuAccordion, setOpenMenuAccordion] = useState<string>(
    menuCategories[0]?.id ?? "breakfast-brunch",
  );
  const [activeMenuPhoto, setActiveMenuPhoto] = useState<MenuPhoto | null>(null);
  const [formNotice, setFormNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!activeMenuPhoto) {
      return;
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenuPhoto(null);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [activeMenuPhoto]);

  const closeMenu = () => setMobileMenuOpen(false);

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormNotice(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const guests = String(formData.get("guests") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();
    const time = String(formData.get("time") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !phone || !guests || !date) {
      setFormNotice({
        type: "error",
        message: "Uzupełnij pola: imię, telefon, liczba osób oraz data.",
      });
      return;
    }

    const guestsCount = Number(guests);
    if (!Number.isFinite(guestsCount) || guestsCount < 1) {
      setFormNotice({
        type: "error",
        message: "Liczba osób musi być większa od zera.",
      });
      return;
    }

    const compactPhone = phone.replace(/[\s()-]/g, "");
    if (!/^\+?\d{6,15}$/.test(compactPhone)) {
      setFormNotice({
        type: "error",
        message: "Podaj poprawny numer telefonu.",
      });
      return;
    }

    const mailSubject = encodeURIComponent(
      "Zapytanie o rezerwację — Kwestia Czasu / NAGO",
    );
    const mailBody = encodeURIComponent(
      [
        `Imię: ${name}`,
        `Telefon: ${phone}`,
        `Liczba osób: ${guests}`,
        `Data: ${date}`,
        `Godzina: ${time || "Nie podano"}`,
        `E-mail: ${email || "Nie podano"}`,
        `Wiadomość: ${message || "Brak dodatkowej wiadomości."}`,
      ].join("\n"),
    );

    window.location.href = `mailto:neobistrokwestiaczasu@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    setFormNotice({
      type: "success",
      message: "Wiadomość zostanie przygotowana w programie pocztowym.",
    });
    form.reset();
  };

  const activeMenuCategory =
    menuCategories.find((category) => category.id === activeMenuTab) ??
    menuCategories[0];

  const renderMenuCategoryContent = (category: MenuCategory) => (
    <div className="space-y-5">
      {category.note && (
        <p className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink-soft)]">
          {category.note}
        </p>
      )}
      {category.groups.map((group) => (
        <article
          key={`${category.id}-${group.title}`}
          className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-6"
        >
          <h3 className="font-serif text-2xl text-[var(--ink)]">{group.title}</h3>
          {group.description && (
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              {group.description}
            </p>
          )}
          <div className="mt-4 divide-y divide-[var(--line)]">
            {group.items.map((item) => (
              <div
                key={`${group.title}-${item.name}`}
                className="py-4 first:pt-1 last:pb-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-[var(--ink)] sm:text-lg">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.weight && (
                        <span className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--ink-soft)]">
                          {item.weight}
                        </span>
                      )}
                      {item.tags?.map((tag) => (
                        <span
                          key={`${item.name}-${tag}`}
                          className="rounded-full border border-[var(--line)] bg-[var(--cream)] px-2.5 py-1 text-xs text-[var(--olive)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="whitespace-nowrap text-base font-semibold text-[var(--wood)] sm:text-lg">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="bg-[var(--cream)] pb-24 text-[var(--ink)] md:pb-28 lg:pb-0">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          hasScrolled
            ? "border-b border-white/15 bg-[rgba(21,21,21,0.78)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <Link href="#hero" className="inline-flex flex-col leading-none">
            <span
              className={`font-serif text-2xl tracking-wide transition-colors sm:text-3xl ${
                hasScrolled ? "text-[var(--cream)]" : "text-white"
              }`}
            >
              Kwestia Czasu
            </span>
            <span
              className={`mt-1 text-[0.6rem] tracking-[0.45em] transition-colors sm:text-xs ${
                hasScrolled ? "text-[var(--beige)]" : "text-white/80"
              }`}
            >
              N A G O
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  hasScrolled
                    ? "text-[var(--cream)]/90 hover:text-[var(--cream)]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#reservation"
              className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-[var(--wood)] md:inline-flex"
            >
              Zarezerwuj stolik
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Otwórz menu"
              className={`inline-flex items-center justify-center rounded-full border p-2.5 transition md:hidden ${
                hasScrolled
                  ? "border-[var(--cream)]/25 text-[var(--cream)]"
                  : "border-white/25 text-white"
              }`}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/10 bg-[var(--ink)]/95 px-4 pb-6 pt-3 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm text-[var(--cream)] transition hover:bg-white/10"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservation"
                onClick={closeMenu}
                className="mt-1 rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--ink)]"
              >
                Zarezerwuj stolik
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        <section id="hero" className="relative isolate min-h-screen overflow-hidden">
          <img
            src={assetPath("/images/jedzenie (5).jpg")}
            alt="Autorskie danie restauracji Kwestia Czasu NAGO"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(21,21,21,0.86)_0%,rgba(42,28,20,0.68)_48%,rgba(21,21,21,0.74)_100%)]" />
          <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top,rgba(183,121,74,0.35),transparent_50%)]" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={riseIn}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-36 text-[var(--cream)] sm:px-6 lg:px-10"
          >
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--beige)]/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--beige)]">
                <Sparkles className="size-3.5" />
                Kwestia Czasu / N A G O
              </span>
              <h1 className="mt-7 font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
                Podlaskie i słowiańskie smaki w nowoczesnym wydaniu.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--cream)]/86 sm:text-lg">
                Kameralna restauracja w Białymstoku, w której sezonowe produkty,
                domowe receptury i nowoczesne podanie spotykają się przy jednym
                stole.
              </p>
              <p className="mt-4 text-base font-medium italic text-[var(--beige)] sm:text-lg">
                Z nami możesz celebrować chwile.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#reservation"
                  className="inline-flex items-center rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-[var(--wood)]"
                >
                  Zarezerwuj stolik
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center rounded-full border border-[var(--beige)]/40 px-7 py-3 text-sm font-semibold text-[var(--cream)] transition hover:bg-white/10"
                >
                  Zobacz menu
                </a>
              </div>

              <div className="mt-10 space-y-2 text-sm text-[var(--beige)]/90">
                <p className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  Wesoła 17/U1, Białystok
                </p>
                <p>
                  Śniadania • Brunch • Lunch • Kolacje • Wino • Słoiki z NAGO
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="about"
          className="scroll-mt-32 border-y border-[var(--line)] bg-[var(--paper)]"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={riseIn}
              transition={{ duration: 0.65 }}
              className="space-y-6"
            >
              <span className="section-kicker">O nas</span>
              <h2 className="font-serif text-3xl leading-tight text-[var(--ink)] sm:text-5xl">
                Kwestia czasu, smaku i dobrego momentu.
              </h2>
              <p className="leading-relaxed text-[var(--ink-soft)]">
                Stawiamy na to, co wyrosło w naszym klimacie i w danym okresie.
                Gotujemy z sezonowych składników, inspirując się kuchnią
                podlaską, słowiańską i polską, ale podajemy ją w świeży,
                współczesny sposób. Oprócz kuchni tradycyjnej znajdziesz u nas
                także dużo propozycji wegetariańskich i wegańskich, a regularną
                kartę uzupełnia zmieniające się menu lunchowe.
              </p>
              <p className="leading-relaxed text-[var(--ink-soft)]">
                To miejsce do spokojnego śniadania, rodzinnego obiadu,
                romantycznej kolacji, spotkania przy winie albo odebrania
                dobrego jedzenia na wynos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] shadow-[0_30px_80px_rgba(21,21,21,0.16)]"
            >
              <img
                src={assetPath("/images/wnetrze1.jpg")}
                alt="Wnętrze restauracji Kwestia Czasu NAGO"
                className="h-full min-h-[20rem] w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={riseIn}
            transition={{ duration: 0.55 }}
            className="mb-10 max-w-2xl"
          >
            <span className="section-kicker">Wyróżniki</span>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
              Smak, który zostaje z Tobą na dłużej.
            </h2>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {highlightCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 transition hover:-translate-y-1 hover:border-[var(--wood)]/40"
                >
                  <Icon className="mb-4 size-5 text-[var(--wood)]" />
                  <h3 className="font-serif text-xl text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={riseIn}
              transition={{ duration: 0.55 }}
              className="mb-10 max-w-3xl"
            >
              <span className="section-kicker">Co u nas znajdziesz</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
                Dzień zaczyna się tu spokojnie, a kończy z charakterem.
              </h2>
            </motion.div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {offerCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-6"
                  >
                    <Icon className="mb-4 size-5 text-[var(--olive)]" />
                    <h3 className="font-serif text-2xl text-[var(--ink)]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {item.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="menu" className="scroll-mt-32">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={riseIn}
              transition={{ duration: 0.62 }}
              className="mb-10"
            >
              <span className="section-kicker">Menu</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
                Menu N A G O
              </h2>
              <p className="mt-5 max-w-4xl leading-relaxed text-[var(--ink-soft)]">
                Karta zmienia się sezonowo, ale idea zostaje ta sama: podlaskie i
                słowiańskie smaki, autorskie receptury i produkty dobrane do
                danego momentu.
              </p>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">
                Menu jest sezonowe i może się zmieniać w ciągu tygodnia.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {menuCategories.map((category) => (
                  <span
                    key={`chip-${category.id}`}
                    className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-xs text-[var(--ink-soft)]"
                  >
                    {category.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+48600575050"
                  className="inline-flex items-center rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--brown)]"
                >
                  Zadzwoń i zapytaj o dzisiejsze menu
                </a>
                <a
                  href="#reservation"
                  className="inline-flex items-center rounded-full border border-[var(--ink)]/15 px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--wood)]/50 hover:bg-[var(--paper)]"
                >
                  Zarezerwuj stolik
                </a>
              </div>
            </motion.div>

            <div className="hidden gap-6 md:grid md:grid-cols-[15.5rem_1fr]">
              <div className="sticky top-28 self-start rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-3">
                {menuCategories.map((category) => {
                  const isActive = activeMenuCategory?.id === category.id;
                  return (
                    <button
                      key={`tab-${category.id}`}
                      type="button"
                      onClick={() => setActiveMenuTab(category.id)}
                      className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm transition last:mb-0 ${
                        isActive
                          ? "bg-[var(--ink)] text-[var(--cream)]"
                          : "border border-transparent text-[var(--ink-soft)] hover:border-[var(--line)] hover:bg-[var(--cream)]"
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeMenuCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                {renderMenuCategoryContent(activeMenuCategory)}
              </motion.div>
            </div>

            <div className="space-y-3 md:hidden">
              {menuCategories.map((category) => {
                const isOpen = openMenuAccordion === category.id;
                return (
                  <article
                    key={`accordion-${category.id}`}
                    className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuAccordion((prev) =>
                          prev === category.id ? "" : category.id,
                        )
                      }
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span className="text-sm font-semibold text-[var(--ink)]">
                        {category.label}
                      </span>
                      <ChevronDown
                        className={`size-4 text-[var(--wood)] transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.24 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        {renderMenuCategoryContent(category)}
                      </div>
                    </motion.div>
                  </article>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mt-14 rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-6"
            >
              <h3 className="font-serif text-3xl text-[var(--ink)]">
                Pełna karta w formie zdjęcia
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {menuPhotos.map((photo) => (
                  <article
                    key={photo.src}
                    className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--cream)]"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMenuPhoto(photo)}
                      className="block w-full text-left"
                    >
                      <img
                        src={assetPath(photo.src)}
                        alt={photo.label}
                        className="h-52 w-full object-cover transition duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                    <div className="flex items-center justify-between gap-2 px-4 py-3">
                      <p className="text-sm text-[var(--ink-soft)]">{photo.label}</p>
                      <a
                        href={assetPath(photo.src)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--wood)]"
                      >
                        Otwórz
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-sm text-[var(--ink-soft)]">
                Menu oraz ceny mogą się zmieniać sezonowo. Najaktualniejszą kartę
                potwierdzisz telefonicznie lub na miejscu.
              </p>
            </motion.div>
          </div>
        </section>

        {activeMenuPhoto && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/72 p-4">
            <button
              type="button"
              aria-label="Zamknij podgląd menu"
              className="absolute inset-0 cursor-default"
              onClick={() => setActiveMenuPhoto(null)}
            />
            <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-[var(--paper)]">
              <button
                type="button"
                onClick={() => setActiveMenuPhoto(null)}
                className="absolute right-3 top-3 z-20 rounded-full bg-black/65 p-2 text-white"
                aria-label="Zamknij"
              >
                <X className="size-4" />
              </button>
              <img
                src={assetPath(activeMenuPhoto.src)}
                alt={activeMenuPhoto.label}
                className="max-h-[78vh] w-full object-contain bg-[var(--cream)]"
              />
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <p className="text-sm text-[var(--ink-soft)]">{activeMenuPhoto.label}</p>
                <a
                  href={assetPath(activeMenuPhoto.src)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--ink)]"
                >
                  Otwórz w nowej karcie
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        <section
          id="gallery"
          className="scroll-mt-32 border-y border-[var(--line)] bg-[var(--paper)]"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={riseIn}
              transition={{ duration: 0.55 }}
              className="mb-12 max-w-2xl"
            >
              <span className="section-kicker">Galeria</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
                Smaki i przestrzeń, które tworzą klimat N A G O.
              </h2>
            </motion.div>

            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {galleryItems.map((item, index) => (
                <motion.article
                  key={item.src}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
                >
                  <img
                    src={assetPath(item.src)}
                    alt={item.alt}
                    className={`w-full ${item.heightClass} object-cover transition duration-500 group-hover:scale-105`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <p className="absolute inset-x-4 bottom-4 text-sm text-white opacity-0 transition duration-300 group-hover:opacity-100">
                    {item.caption}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="reels" className="scroll-mt-32">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={riseIn}
              transition={{ duration: 0.55 }}
              className="mb-12 max-w-3xl"
            >
              <span className="section-kicker">Rolki</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
                Kulisy kuchni i chwile przy stole
              </h2>
            </motion.div>

            <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {reels.map((reel, index) => (
                <motion.article
                  key={reel.src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="w-[78vw] max-w-[18rem] snap-start rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-3 shadow-[0_20px_50px_rgba(21,21,21,0.14)] sm:w-full sm:max-w-none"
                >
                  <div className="relative overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-black">
                    <video
                      src={assetPath(reel.src)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-[24rem] w-full object-cover sm:h-[23rem]"
                    />
                  </div>
                  <p className="pt-3 text-sm font-medium text-[var(--ink-soft)]">
                    {reel.label}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="interior" className="scroll-mt-32 border-y border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={riseIn}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="section-kicker">Wnętrze</span>
              <h2 className="font-serif text-3xl leading-tight sm:text-5xl">
                Kameralnie, ciepło, bez pośpiechu.
              </h2>
              <p className="max-w-xl leading-relaxed text-[var(--ink-soft)]">
                Cegła, drewno, ciepłe światło, rośliny i małe stoliki tworzą
                atmosferę miejsca, do którego przychodzi się nie tylko zjeść,
                ale też zostać na dłużej.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {interiorTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--line)] bg-[var(--cream)] px-3 py-1.5 text-xs text-[var(--ink-soft)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="col-span-2 overflow-hidden rounded-3xl border border-[var(--line)]"
              >
                <img
                  src={assetPath("/images/wnetrze.png")}
                  alt="Kameralne wnętrze restauracji"
                  className="h-[15rem] w-full object-cover sm:h-[18rem]"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="overflow-hidden rounded-3xl border border-[var(--line)]"
              >
                <img
                  src={assetPath("/images/wnetrze1.jpg")}
                  alt="Otwarty klimat restauracji"
                  className="h-[13rem] w-full object-cover sm:h-[15rem]"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="overflow-hidden rounded-3xl border border-[var(--line)]"
              >
                <img
                  src={assetPath("/images/wnetrze2.jpg")}
                  alt="Detale wnętrza restauracji"
                  className="h-[13rem] w-full object-cover sm:h-[15rem]"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="occasions" className="scroll-mt-32 border-b border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={riseIn}
              transition={{ duration: 0.52 }}
              className="max-w-3xl"
            >
              <span className="section-kicker">Na jaką okazję?</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                Na śniadanie, kolację i wszystko pomiędzy.
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
                Kwestia Czasu / N A G O sprawdza się wtedy, gdy chcesz zjeść
                spokojnie, spotkać się przy winie, zamówić coś na wynos albo
                zorganizować kameralne przyjęcie.
              </p>
            </motion.div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {occasionCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.38, delay: index * 0.04 }}
                    className="group rounded-2xl border border-[var(--line)] bg-[var(--cream)] px-4 py-4 transition hover:border-[var(--wood)]/50 hover:bg-white"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Icon className="size-4 text-[var(--wood)]" />
                      <p className="text-sm font-medium text-[var(--ink)]">{item.title}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-32">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={riseIn}
              transition={{ duration: 0.58 }}
              className="mb-10 max-w-3xl"
            >
              <span className="section-kicker">Opinie</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
                Goście wracają tu dla smaku i atmosfery.
              </h2>
            </motion.div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5">
                <p className="text-sm text-[var(--ink-soft)]">96% poleca na Facebooku</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5">
                <p className="text-sm text-[var(--ink-soft)]">
                  Ponad 200 opinii z rekomendacjami
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {reviews.map((review, index) => (
                <motion.article
                  key={review.quote}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-7"
                >
                  <Star className="mb-4 size-4 text-[var(--accent)]" />
                  <p className="leading-relaxed text-[var(--ink)]">{review.quote}</p>
                  <p className="mt-4 text-sm text-[var(--ink-soft)]">{review.author}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="reservation"
          className="scroll-mt-32 bg-[linear-gradient(130deg,var(--ink)_0%,var(--brown)_62%,#101010_100%)]"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 text-[var(--cream)] sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={riseIn}
              transition={{ duration: 0.58 }}
              className="space-y-6"
            >
              <span className="section-kicker section-kicker-dark">Rezerwacje</span>
              <h2 className="font-serif text-3xl leading-tight sm:text-5xl">
                Zarezerwuj stolik albo zapytaj o dzisiejsze menu.
              </h2>
              <p className="leading-relaxed text-[var(--beige)]/88">
                Najprościej skontaktować się z nami telefonicznie. Przy większych
                spotkaniach, przyjęciach lub rezerwacjach napisz wiadomość —
                oddzwonimy i potwierdzimy szczegóły.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+48600575050"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--wood)]"
                >
                  <Phone className="size-4" />
                  Zadzwoń: 600 575 050
                </a>
                <a
                  href="mailto:neobistrokwestiaczasu@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-[var(--cream)] transition hover:bg-white/10"
                >
                  <Mail className="size-4" />
                  Napisz e-mail
                </a>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              onSubmit={onFormSubmit}
              className="rounded-3xl border border-white/15 bg-white/6 p-5 backdrop-blur-sm sm:p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-field">
                  <span>Imię</span>
                  <input type="text" name="name" placeholder="Twoje imię" required />
                </label>
                <label className="form-field">
                  <span>Telefon</span>
                  <input
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    placeholder="600 000 000"
                    required
                  />
                </label>
                <label className="form-field">
                  <span>Liczba osób</span>
                  <input type="number" name="guests" min={1} placeholder="2" required />
                </label>
                <label className="form-field">
                  <span>Data</span>
                  <input type="date" name="date" required />
                </label>
                <label className="form-field">
                  <span>Godzina</span>
                  <input type="time" name="time" />
                </label>
                <label className="form-field">
                  <span>E-mail</span>
                  <input type="email" name="email" placeholder="twoj@email.com" />
                </label>
              </div>
              <label className="form-field mt-4 block">
                <span>Wiadomość</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Napisz, czy to rezerwacja, przyjęcie lub zapytanie o menu."
                />
              </label>
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--wood)]"
              >
                Wyślij zapytanie
              </button>
              {formNotice && (
                <p
                  aria-live="polite"
                  className={`mt-3 text-sm ${
                    formNotice.type === "error" ? "text-red-200" : "text-[var(--beige)]"
                  }`}
                >
                  {formNotice.message}
                </p>
              )}
            </motion.form>
          </div>
        </section>

        <section id="contact" className="scroll-mt-32 border-y border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={riseIn}
              transition={{ duration: 0.58 }}
              className="space-y-6"
            >
              <span className="section-kicker">Kontakt</span>
              <h2 className="font-serif text-4xl leading-tight tracking-tight whitespace-normal md:text-5xl lg:text-[44px] lg:whitespace-nowrap">
                Kwestia Czasu / N A G O
              </h2>
              <div className="space-y-3 text-[var(--ink-soft)]">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-1 size-4 shrink-0 text-[var(--wood)]" />
                  Wesoła 17/U1, 15-306 Białystok
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-[var(--wood)]" />
                  <a href="tel:+48600575050" className="hover:text-[var(--ink)]">
                    600 575 050
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="size-4 text-[var(--wood)]" />
                  <a
                    href="mailto:neobistrokwestiaczasu@gmail.com"
                    className="hover:text-[var(--ink)]"
                  >
                    neobistrokwestiaczasu@gmail.com
                  </a>
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-5">
                <h3 className="mb-3 flex items-center gap-2 font-serif text-2xl text-[var(--ink)]">
                  <Clock3 className="size-5 text-[var(--wood)]" />
                  Godziny otwarcia
                </h3>
                <ul className="space-y-1 text-sm text-[var(--ink-soft)]">
                  {openingHours.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-[var(--ink-soft)]">
                  Godziny mogą się zmieniać — przed wizytą sprawdź aktualności lub
                  zadzwoń.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-5">
                <h3 className="mb-3 font-serif text-2xl text-[var(--ink)]">Usługi</h3>
                <div className="flex flex-wrap gap-2">
                  {serviceTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-xs text-[var(--ink-soft)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.58 }}
              className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--cream)] shadow-[0_20px_50px_rgba(21,21,21,0.08)] lg:min-h-[620px]"
            >
              <iframe
                title="Mapa restauracji Kwestia Czasu NAGO"
                src={mapsEmbedUrl}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={mapsExternalUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-[var(--cream)] shadow-lg transition hover:bg-[var(--brown)]"
              >
                Otwórz w Google Maps
                <ExternalLink className="size-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-4 z-[65] px-3 sm:px-5 lg:hidden">
        <div className="mx-auto grid w-full max-w-xl grid-cols-3 gap-2 rounded-2xl border border-white/12 bg-[rgba(21,21,21,0.84)] p-2 text-[var(--cream)] shadow-[0_18px_36px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <a
            href="tel:600575050"
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-2 text-xs font-semibold transition hover:bg-white/12"
          >
            <Phone className="size-3.5" />
            Zadzwoń
          </a>
          <a
            href="#menu"
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-2 text-xs font-semibold transition hover:bg-white/12"
          >
            <UtensilsCrossed className="size-3.5" />
            Menu
          </a>
          <a
            href="#reservation"
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-[var(--accent)] px-2 text-xs font-semibold text-[var(--ink)] transition hover:bg-[var(--wood)]"
          >
            <CalendarDays className="size-3.5" />
            Rezerwuj
          </a>
        </div>
      </div>

      <footer className="bg-[var(--ink)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 text-[var(--beige)] sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
          <div>
            <p className="font-serif text-3xl text-[var(--cream)]">Kwestia Czasu</p>
            <p className="mt-1 text-xs tracking-[0.4em] text-[var(--beige)]">N A G O</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--beige)]/90">
              Podlaskie i słowiańskie smaki, sezonowe produkty i kameralna
              atmosfera w centrum Białegostoku.
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--beige)]/80">
              Nawigacja
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#about" className="transition hover:text-[var(--cream)]">
                  O nas
                </a>
              </li>
              <li>
                <a href="#menu" className="transition hover:text-[var(--cream)]">
                  Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition hover:text-[var(--cream)]">
                  Galeria
                </a>
              </li>
              <li>
                <a href="#reviews" className="transition hover:text-[var(--cream)]">
                  Opinie
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-[var(--cream)]">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--beige)]/80">
              Dane
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[var(--beige)]/90">
              <li>Telefon: 600 575 050</li>
              <li>E-mail: neobistrokwestiaczasu@gmail.com</li>
              <li>Adres: Wesoła 17/U1, Białystok</li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex rounded-full border border-white/20 p-2 text-[var(--beige)] transition hover:border-white/40 hover:text-[var(--cream)]"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex rounded-full border border-white/20 p-2 text-[var(--beige)] transition hover:border-white/40 hover:text-[var(--cream)]"
              >
                <Camera className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 text-center text-xs text-[var(--beige)]/70">
          © {new Date().getFullYear()} Kwestia Czasu / N A G O. Wszystkie prawa
          zastrzeżone.
        </div>
      </footer>
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoorstelBanner from "@/components/VoorstelBanner";
import { club, IS_VOORSTEL, SITE_URL } from "@/content/club";

const kop = Barlow_Condensed({
  variable: "--font-kop-next",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});
const tekst = Inter({ variable: "--font-tekst-next", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${club.naam} – ${club.leuze}`, template: "%s" },
  description: `${club.naam} uit ${club.gemeente}: voetbalclub sinds ${club.opgericht}, UEFA Grassroots Award 2021/2022.`,
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: club.naam, locale: "nl_BE", type: "website" },
  ...(IS_VOORSTEL ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = { themeColor: "#4B2A7B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE" className={`${kop.variable} ${tekst.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-goud focus:px-4 focus:py-2 focus:font-bold focus:text-paars-950"
        >
          Ga naar de inhoud
        </a>
        {IS_VOORSTEL && <VoorstelBanner />}
        <Header />
        <main id="inhoud" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

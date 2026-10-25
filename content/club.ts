/**
 * ZO PAS JE DIT AAN
 * - Dit bestand bevat de vaste gegevens van de club (naam, adres, contact).
 * - Alleen de gegevens in dit bestand zijn echt. Wijzig ze alleen als de club verhuist of een nieuw nummer krijgt.
 * - IS_VOORSTEL: zet op `false` zodra de club de site overneemt. Dan verdwijnt de
 *   "Ontwerpvoorstel"-strook en mag Google de site indexeren.
 *   (Pas dan ook `public/robots.txt` aan, zie de README.)
 * - SITE_URL: het webadres waarop de site uiteindelijk staat (zonder slash op het einde).
 */
export const IS_VOORSTEL = true;

// TODO: vervangen door het echte adres van de site
export const SITE_URL = "https://ikdien-redesign.pages.dev";

export interface Club {
  naam: string;
  korteNaam: string;
  opgericht: number;
  leuze: string;
  straat: string;
  postcode: string;
  gemeente: string;
  telefoon: string;
  telefoonLink: string;
  emailFinance: string;
  emailVoetbal: string;
  /** Middelpunt van de OpenStreetMap-kaart. TODO: controleer de coördinaten van Kattenbroek 15. */
  kaart: { lat: number; lon: number };
}

export const club: Club = {
  naam: "Kon. Ik Dien FC",
  korteNaam: "Ik Dien",
  opgericht: 1924,
  leuze: "IK DIEN – ONE TEAM",
  straat: "Kattenbroek 15",
  postcode: "2650",
  gemeente: "Edegem",
  telefoon: "+32 3 457 43 72",
  telefoonLink: "+3234574372",
  emailFinance: "info@ikdien.be",
  emailVoetbal: "fcikdien@ikdien.be",
  kaart: { lat: 51.1565, lon: 4.445 },
};

export const uefaAward = {
  titel: "Beste Amateurclub van Europa 2021/2022",
  naam: "UEFA Grassroots Award",
  bekendGemaakt: "4 april 2022",
};

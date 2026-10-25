/**
 * ZO PAS JE DIT AAN
 * - Elke ploeg is één blok tussen { }. Kopieer een bestaand blok om een ploeg toe te voegen.
 * - `slug` = het stuk in de URL (kleine letters, geen spaties): /ploegen/<slug>/
 * - `categorie` bepaalt onder welke titel de ploeg op de pagina Sportief staat.
 * - `teBevestigen: true` toont de opmerking "Te bevestigen door de club". Zet op `false` als het klopt.
 * - `voorbeeld: true` toont het label "Voorbeeld". Zet op `false` zodra je echte info invult.
 * - Alle ploegen hieronder zijn VOORBEELDEN. De club bevestigt zelf welke ploegen er bestaan.
 * - Toon hier GEEN spelerslijsten of namen van minderjarigen (privacy).
 */
export type PloegCategorie = "A-ploeg" | "Jeugd" | "Dames" | "Andere ploegen";

export interface Training {
  dag: string;
  uur: string;
  plaats: string;
}

export interface Ploeg {
  slug: string;
  naam: string;
  categorie: PloegCategorie;
  omschrijving: string;
  trainers: string[];
  trainingen: Training[];
  foto?: string; // bv. "/fotos/a-ploeg.jpg"
  teBevestigen: boolean;
  voorbeeld: boolean;
}

export const categorieen: PloegCategorie[] = ["A-ploeg", "Jeugd", "Dames", "Andere ploegen"];

const trainingVolgt: Training[] = [{ dag: "Dag volgt", uur: "Uur volgt", plaats: "Plaats volgt" }];

export const ploegen: Ploeg[] = [
  {
    slug: "a-ploeg",
    naam: "A-ploeg",
    categorie: "A-ploeg",
    omschrijving: "Voorbeeldtekst over de A-ploeg. De club vult dit zelf aan.",
    trainers: ["Naam volgt"],
    trainingen: trainingVolgt,
    teBevestigen: false,
    voorbeeld: true,
  },
  {
    slug: "jeugd-onder-9",
    naam: "Jeugd – onder 9 (voorbeeld)",
    categorie: "Jeugd",
    omschrijving: "Voorbeeldtekst over deze jeugdcategorie. De club vult dit zelf aan.",
    trainers: ["Naam volgt"],
    trainingen: trainingVolgt,
    teBevestigen: true,
    voorbeeld: true,
  },
  {
    slug: "jeugd-onder-13",
    naam: "Jeugd – onder 13 (voorbeeld)",
    categorie: "Jeugd",
    omschrijving: "Voorbeeldtekst over deze jeugdcategorie. De club vult dit zelf aan.",
    trainers: ["Naam volgt"],
    trainingen: trainingVolgt,
    teBevestigen: true,
    voorbeeld: true,
  },
  {
    slug: "jeugd-onder-17",
    naam: "Jeugd – onder 17 (voorbeeld)",
    categorie: "Jeugd",
    omschrijving: "Voorbeeldtekst over deze jeugdcategorie. De club vult dit zelf aan.",
    trainers: ["Naam volgt"],
    trainingen: trainingVolgt,
    teBevestigen: true,
    voorbeeld: true,
  },
  {
    slug: "dames",
    naam: "Dames",
    categorie: "Dames",
    omschrijving: "Voorbeeldtekst over de damesploeg. De club vult dit zelf aan.",
    trainers: ["Naam volgt"],
    trainingen: trainingVolgt,
    teBevestigen: true,
    voorbeeld: true,
  },
  {
    slug: "g-voetbal",
    naam: "G-voetbal",
    categorie: "Andere ploegen",
    omschrijving: "Placeholder: bestaat deze ploeg? De club bevestigt dit en vult de tekst aan.",
    trainers: ["Naam volgt"],
    trainingen: trainingVolgt,
    teBevestigen: true,
    voorbeeld: true,
  },
];

export const getPloeg = (slug: string) => ploegen.find((p) => p.slug === slug);

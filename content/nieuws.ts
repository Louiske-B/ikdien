/**
 * ZO PAS JE DIT AAN
 * Een nieuwsbericht toevoegen: kopieer een blok, zet het bovenaan en pas aan.
 *  - `slug`: korte naam in de URL (kleine letters, koppeltekens): /nieuws/<slug>/
 *  - `datum`: "JJJJ-MM-DD"
 *  - `categorie`: kies uit de lijst `nieuwsCategorieen`
 *  - `tekst`: lijst van alinea's (elke alinea tussen aanhalingstekens, gescheiden door een komma)
 *  - `foto`: optioneel, bv. "/fotos/nieuws-1.jpg"
 * Alle berichten hieronder zijn VOORBEELDEN.
 */
export const nieuwsCategorieen = ["Club", "Sportief", "Jeugd", "Evenementen"] as const;
export type NieuwsCategorie = (typeof nieuwsCategorieen)[number];

export interface Nieuwsbericht {
  slug: string;
  titel: string;
  datum: string;
  categorie: NieuwsCategorie;
  samenvatting: string;
  tekst: string[];
  foto?: string;
  voorbeeld: boolean;
}

export const nieuws: Nieuwsbericht[] = [
  {
    slug: "voorbeeldbericht-1",
    titel: "Voorbeeldbericht 1",
    datum: "2026-10-20",
    categorie: "Club",
    samenvatting: "Dit is een voorbeeldsamenvatting van een nieuwsbericht.",
    tekst: ["Dit is voorbeeldtekst. De club vervangt dit bericht door echt nieuws.", "Een tweede voorbeeldalinea."],
    voorbeeld: true,
  },
  {
    slug: "voorbeeldbericht-2",
    titel: "Voorbeeldbericht 2",
    datum: "2026-10-12",
    categorie: "Sportief",
    samenvatting: "Nog een voorbeeldsamenvatting, nu over sportief nieuws.",
    tekst: ["Dit is voorbeeldtekst voor een sportief bericht."],
    voorbeeld: true,
  },
  {
    slug: "voorbeeldbericht-3",
    titel: "Voorbeeldbericht 3",
    datum: "2026-10-01",
    categorie: "Jeugd",
    samenvatting: "Een voorbeeldsamenvatting over de jeugdwerking.",
    tekst: ["Dit is voorbeeldtekst voor een jeugdbericht."],
    voorbeeld: true,
  },
  {
    slug: "voorbeeldbericht-4",
    titel: "Voorbeeldbericht 4",
    datum: "2026-09-15",
    categorie: "Evenementen",
    samenvatting: "Een voorbeeldsamenvatting over een evenement.",
    tekst: ["Dit is voorbeeldtekst voor een evenementenbericht."],
    voorbeeld: true,
  },
];

export const getNieuws = (slug: string) => nieuws.find((n) => n.slug === slug);

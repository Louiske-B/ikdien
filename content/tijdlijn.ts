/**
 * ZO PAS JE DIT AAN
 * De tijdlijn van 100 jaar Ik Dien (1924–2024).
 *  - Een mijlpaal aanpassen of toevoegen: wijzig `jaar`, `titel` en `tekst` van een blok.
 *  - Alleen 1924 (oprichting) en 2024 (100 jaar) zijn echt. ALLE andere mijlpalen zijn
 *    placeholders: de club vult de echte geschiedenis zelf in.
 *  - Fotogalerij: zet foto's in `public/fotos/` en vul het pad in bij `src` (bv. "/fotos/feest.jpg").
 *    Toon alleen foto's waarvoor toestemming is (zie README, privacy).
 */
export interface Mijlpaal {
  jaar: number;
  titel: string;
  tekst: string;
  voorbeeld: boolean;
}

export const tijdlijn: Mijlpaal[] = [
  { jaar: 1924, titel: "Oprichting van de club", tekst: "Ik Dien FC werd opgericht. De club vult hier het verhaal aan.", voorbeeld: false },
  { jaar: 1944, titel: "Mijlpaal", tekst: "Mijlpaal – in te vullen door de club", voorbeeld: true },
  { jaar: 1964, titel: "Mijlpaal", tekst: "Mijlpaal – in te vullen door de club", voorbeeld: true },
  { jaar: 1984, titel: "Mijlpaal", tekst: "Mijlpaal – in te vullen door de club", voorbeeld: true },
  { jaar: 2004, titel: "Mijlpaal", tekst: "Mijlpaal – in te vullen door de club", voorbeeld: true },
  { jaar: 2024, titel: "100 jaar Ik Dien", tekst: "De club bestaat 100 jaar. De club vult hier het verhaal aan.", voorbeeld: false },
];

export interface GalerijFoto {
  id: string;
  bijschrift: string;
  src?: string;
}

export const galerij: GalerijFoto[] = Array.from({ length: 8 }, (_, i) => ({
  id: `g${i + 1}`,
  bijschrift: `Voorbeeldfoto ${i + 1}`,
}));

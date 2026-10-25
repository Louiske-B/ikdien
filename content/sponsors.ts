/**
 * ZO PAS JE DIT AAN
 * Een sponsor toevoegen: kopieer een blok en pas aan.
 *  - `niveau`: "hoofdsponsor" | "gold" | "silver" | "brons"
 *  - `logo`: optioneel, bv. "/fotos/sponsors/bakkerij.png". Zonder logo toont de site een placeholder.
 *  - `url`: optioneel, de website van de sponsor
 * Alle sponsors hieronder zijn VOORBEELDEN.
 */
export type SponsorNiveau = "hoofdsponsor" | "gold" | "silver" | "brons";

export interface Sponsor {
  id: string;
  naam: string;
  niveau: SponsorNiveau;
  logo?: string;
  url?: string;
  voorbeeld: boolean;
}

export const niveaus: { id: SponsorNiveau; titel: string }[] = [
  { id: "hoofdsponsor", titel: "Hoofdsponsor" },
  { id: "gold", titel: "Gold" },
  { id: "silver", titel: "Silver" },
  { id: "brons", titel: "Brons" },
];

export const sponsors: Sponsor[] = [
  { id: "s1", naam: "Voorbeeldsponsor 1", niveau: "hoofdsponsor", voorbeeld: true },
  { id: "s2", naam: "Voorbeeldsponsor 2", niveau: "gold", voorbeeld: true },
  { id: "s3", naam: "Voorbeeldsponsor 3", niveau: "gold", voorbeeld: true },
  { id: "s4", naam: "Voorbeeldsponsor 4", niveau: "silver", voorbeeld: true },
  { id: "s5", naam: "Voorbeeldsponsor 5", niveau: "silver", voorbeeld: true },
  { id: "s6", naam: "Voorbeeldsponsor 6", niveau: "silver", voorbeeld: true },
  { id: "s7", naam: "Voorbeeldsponsor 7", niveau: "brons", voorbeeld: true },
  { id: "s8", naam: "Voorbeeldsponsor 8", niveau: "brons", voorbeeld: true },
  { id: "s9", naam: "Voorbeeldsponsor 9", niveau: "brons", voorbeeld: true },
  { id: "s10", naam: "Voorbeeldsponsor 10", niveau: "brons", voorbeeld: true },
];

/**
 * ZO PAS JE DIT AAN
 * Een evenement toevoegen: kopieer een blok en pas aan.
 *  - `datum`: "JJJJ-MM-DDTUU:MM"
 *  - `ploeg`: optioneel. Laat weg voor een evenement van de hele club.
 * Alle evenementen hieronder zijn VOORBEELDEN.
 */
export interface Evenement {
  id: string;
  titel: string;
  datum: string;
  plaats: string;
  omschrijving: string;
  ploeg?: string;
  voorbeeld: boolean;
}

export const evenementen: Evenement[] = [
  { id: "e1", titel: "Voorbeeldevenement 1", datum: "2026-12-05T18:00", plaats: "Plaats volgt", omschrijving: "Voorbeeldomschrijving van een clubevenement.", voorbeeld: true },
  { id: "e2", titel: "Voorbeeldevenement 2", datum: "2027-01-23T19:00", plaats: "Plaats volgt", omschrijving: "Voorbeeldomschrijving van een clubevenement.", voorbeeld: true },
  { id: "e3", titel: "Voorbeeldevenement 3", datum: "2027-03-14T10:00", plaats: "Plaats volgt", omschrijving: "Voorbeeldomschrijving van een clubevenement.", voorbeeld: true },
];

/**
 * ZO PAS JE DIT AAN
 * Een wedstrijd toevoegen: kopieer een blok, pas de waarden aan.
 *  - `ploeg`: de `slug` van de ploeg uit ploegen.ts (bv. "a-ploeg")
 *  - `datum`: "JJJJ-MM-DDTUU:MM" (bv. "2026-11-08T15:00")
 *  - `thuis`: true = thuiswedstrijd, false = uitwedstrijd
 *  - Uitslag invullen: voeg `score: { club: 2, tegenstander: 1 }` toe. Zonder `score` staat er "Nog te spelen".
 *  - `voorbeeld: true` toont het label "Voorbeeld". Zet op false bij echte wedstrijden.
 * Alle wedstrijden hieronder zijn VOORBEELDEN met fictieve tegenstanders.
 */
export interface Wedstrijd {
  id: string;
  ploeg: string;
  datum: string;
  tegenstander: string;
  thuis: boolean;
  score?: { club: number; tegenstander: number };
  voorbeeld: boolean;
}

export const wedstrijden: Wedstrijd[] = [
  { id: "w1", ploeg: "a-ploeg", datum: "2026-11-08T15:00", tegenstander: "Tegenstander A", thuis: true, voorbeeld: true },
  { id: "w2", ploeg: "a-ploeg", datum: "2026-11-15T15:00", tegenstander: "Tegenstander B", thuis: false, voorbeeld: true },
  { id: "w3", ploeg: "jeugd-onder-13", datum: "2026-11-14T10:00", tegenstander: "Tegenstander C", thuis: true, voorbeeld: true },
  { id: "w4", ploeg: "dames", datum: "2026-11-22T14:00", tegenstander: "Tegenstander D", thuis: false, voorbeeld: true },
  { id: "w5", ploeg: "a-ploeg", datum: "2026-10-18T15:00", tegenstander: "Tegenstander E", thuis: true, score: { club: 2, tegenstander: 1 }, voorbeeld: true },
  { id: "w6", ploeg: "a-ploeg", datum: "2026-10-11T15:00", tegenstander: "Tegenstander F", thuis: false, score: { club: 0, tegenstander: 0 }, voorbeeld: true },
  { id: "w7", ploeg: "jeugd-onder-17", datum: "2026-10-10T11:00", tegenstander: "Tegenstander G", thuis: true, score: { club: 1, tegenstander: 3 }, voorbeeld: true },
];

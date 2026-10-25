/**
 * Datumhulpjes. We lezen "JJJJ-MM-DDTUU:MM" bewust zelf uit (zonder tijdzone), zodat de tekst
 * op de server en in de browser altijd identiek is (geen hydration-fouten).
 */
const DAGEN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
const MAANDEN = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

export interface Delen {
  j: number;
  m: number;
  d: number;
  u: number;
  min: number;
}

export function ontleed(s: string): Delen {
  const [datum, tijd = "00:00"] = s.split("T");
  const [j, m, d] = datum.split("-").map(Number);
  const [u, min] = tijd.split(":").map(Number);
  return { j, m, d, u, min };
}

export const weekdag = (s: string) => {
  const { j, m, d } = ontleed(s);
  return DAGEN[new Date(Date.UTC(j, m - 1, d)).getUTCDay()];
};

export const maandNaam = (m: number) => MAANDEN[m - 1];

export const datumLang = (s: string) => {
  const { j, m, d } = ontleed(s);
  return `${weekdag(s)} ${d} ${MAANDEN[m - 1]} ${j}`;
};

export const datumKort = (s: string) => {
  const { m, d } = ontleed(s);
  return `${d} ${MAANDEN[m - 1].slice(0, 3)}`;
};

export const uur = (s: string) => {
  const { u, min } = ontleed(s);
  return `${String(u).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
};

/** Tijdstip in milliseconden, ervan uitgaande dat de tijd lokale (Belgische) tijd is. */
export const naarMs = (s: string) => {
  const { j, m, d, u, min } = ontleed(s);
  return new Date(j, m - 1, d, u, min).getTime();
};

export const sorteerOpDatum = <T extends { datum: string }>(lijst: T[]) =>
  [...lijst].sort((a, b) => a.datum.localeCompare(b.datum));

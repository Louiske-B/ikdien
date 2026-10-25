/**
 * ZO PAS JE DIT AAN
 * - Alle externe links staan hier, op één plek.
 * - Vervang `TODO` door het echte webadres, bv. "https://www.facebook.com/...".
 * - Zolang er een TODO staat, toont de site een uitgeschakelde knop "Link volgt".
 * - Documenten (PDF's): zet het bestand in `public/documenten/` en gebruik als URL "/documenten/bestandsnaam.pdf".
 */
export const TODO = "TODO: URL invullen";

export interface ExterneLink {
  label: string;
  url: string;
}

export const links = {
  twizzitInschrijving: { label: "Inschrijven via Twizzit", url: TODO },
  facebook: { label: "Facebook", url: TODO },
  instagram: { label: "Instagram", url: TODO },
  uefaAftermovie: { label: "Bekijk de aftermovie", url: TODO },
  panathonverklaring: { label: "Officiële Panathonverklaring", url: TODO },
  clubreglement: { label: "Clubreglement", url: TODO },
  privacyverklaring: { label: "Privacyverklaring", url: TODO },
  jeugdbeleidsplan: { label: "Download het jeugdbeleidsplan (PDF)", url: TODO },
  twizzitSite: { label: "Twizzit", url: TODO },
} satisfies Record<string, ExterneLink>;

export const isTodo = (url: string) => url.startsWith("TODO");

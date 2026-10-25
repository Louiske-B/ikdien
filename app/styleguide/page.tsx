import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { ExterneKnop, Knop } from "@/components/Knoppen";
import { EventCard, MatchCard, NewsCard, SponsorLogo, TeamCard } from "@/components/Kaarten";
import Voorbeeld from "@/components/Voorbeeld";
import { links } from "@/content/links";
import { nieuws } from "@/content/nieuws";
import { ploegen } from "@/content/ploegen";
import { sponsors } from "@/content/sponsors";
import { wedstrijden } from "@/content/wedstrijden";
import { evenementen } from "@/content/evenementen";

export const metadata: Metadata = {
  title: "Styleguide | Kon. Ik Dien FC",
  description: "Interne pagina met het designsysteem van het ontwerpvoorstel.",
  robots: { index: false, follow: false },
};

const tinten = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const tintKlassen: Record<(typeof tinten)[number], string> = {
  50: "bg-paars-50", 100: "bg-paars-100", 200: "bg-paars-200", 300: "bg-paars-300", 400: "bg-paars-400",
  500: "bg-paars-500", 600: "bg-paars-600", 700: "bg-paars-700", 800: "bg-paars-800", 900: "bg-paars-900", 950: "bg-paars-950",
};

export default function Styleguide() {
  return (
    <div className="container-pagina space-y-16 py-12">
      <SectionHeading niveau={1} titel="Styleguide" intro="Interne pagina: toont alle bouwstenen van het ontwerp." />

      <section aria-labelledby="kleuren">
        <h2 id="kleuren" className="mb-4 text-3xl text-paars-700">Kleuren</h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-11">
          {tinten.map((t) => (
            <div key={t} className={`${tintKlassen[t]} flex h-20 items-end rounded p-2 text-xs font-semibold ${t < 400 ? "text-paars-950" : "text-white"}`}>
              paars-{t}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:max-w-md">
          <div className="flex h-20 items-end rounded border border-neutral-300 bg-white p-2 text-xs font-semibold">wit</div>
          <div className="flex h-20 items-end rounded bg-goud-licht p-2 text-xs font-semibold text-paars-950">goud-licht</div>
          <div className="flex h-20 items-end rounded bg-goud p-2 text-xs font-semibold text-paars-950">goud</div>
          <div className="flex h-20 items-end rounded bg-goud-donker p-2 text-xs font-semibold text-white">goud-donker</div>
        </div>
        <p className="mt-3 text-neutral-700">Goud is een accent (badges, lijnen, highlights). Gebruik het nooit voor kleine tekst op wit.</p>
      </section>

      <section aria-labelledby="typo">
        <h2 id="typo" className="mb-4 text-3xl text-paars-700">Typografie</h2>
        <p className="font-kop text-7xl font-extrabold uppercase text-paars-700">Kop 1 – One Team</p>
        <p className="font-kop text-5xl font-bold uppercase text-paars-700">Kop 2 – Sportief</p>
        <p className="font-kop text-3xl font-bold uppercase text-paars-700">Kop 3 – Nieuws</p>
        <p className="mt-3 max-w-prose">Broodtekst in Inter. Dit is een voorbeeldzin om de leesbaarheid van de lopende tekst te tonen, met een comfortabele regelhoogte.</p>
        <p className="mt-2 text-sm text-neutral-700">Kleine tekst, minstens contrast 4,5 : 1.</p>
      </section>

      <section aria-labelledby="knoppen">
        <h2 id="knoppen" className="mb-4 text-3xl text-paars-700">Knoppen</h2>
        <div className="flex flex-wrap gap-3">
          <Knop href="/styleguide/">Primair</Knop>
          <Knop href="/styleguide/" variant="goud">Goud</Knop>
          <Knop href="/styleguide/" variant="omlijnd">Omlijnd</Knop>
          <span className="rounded bg-paars-900 p-2"><Knop href="/styleguide/" variant="licht">Licht</Knop></span>
          <ExterneKnop link={links.twizzitInschrijving} />
        </div>
      </section>

      <section aria-labelledby="kaarten">
        <h2 id="kaarten" className="mb-4 text-3xl text-paars-700">Kaarten</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <NewsCard bericht={nieuws[0]} />
          <TeamCard ploeg={ploegen[1]} />
          <div className="space-y-4">
            <MatchCard wedstrijd={wedstrijden[0]} ploegNaam="A-ploeg" />
            <MatchCard wedstrijd={wedstrijden[4]} ploegNaam="A-ploeg" />
          </div>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2"><EventCard evenement={evenementen[0]} /></div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {sponsors.slice(0, 4).map((s) => <SponsorLogo key={s.id} sponsor={s} />)}
        </div>
        <div className="mt-5 flex items-center gap-3">Label: <Voorbeeld /></div>
      </section>

      <section aria-labelledby="foto">
        <h2 id="foto" className="mb-4 text-3xl text-paars-700">Foto-placeholders</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <PhotoPlaceholder label="A-ploeg" verhouding="16 / 9" />
          <PhotoPlaceholder label="Kattenbroek" verhouding="4 / 3" />
          <PhotoPlaceholder label="Jeugd" verhouding="1 / 1" />
        </div>
      </section>
    </div>
  );
}

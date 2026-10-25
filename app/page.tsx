import Link from "next/link";
import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import SectionHeading from "@/components/SectionHeading";
import { ExterneKnop, ExterneTekstLink, Knop } from "@/components/Knoppen";
import { MatchCard, NewsCard } from "@/components/Kaarten";
import Countdown from "@/components/Countdown";
import KomendeEvenementen from "@/components/KomendeEvenementen";
import SponsorCarousel from "@/components/SponsorCarousel";
import { club, uefaAward } from "@/content/club";
import { links } from "@/content/links";
import { nieuws } from "@/content/nieuws";
import { ploegen } from "@/content/ploegen";
import { sponsors } from "@/content/sponsors";
import { wedstrijden } from "@/content/wedstrijden";
import { evenementen } from "@/content/evenementen";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = {
  ...maakMeta(club.leuze, `${club.naam} uit ${club.gemeente}: voetbalclub sinds ${club.opgericht}. Beste Amateurclub van Europa 2021/2022 (UEFA Grassroots Award).`, "/"),
  title: `${club.naam} – ${club.leuze}`,
};

const ploegNaam = (slug: string) => ploegen.find((p) => p.slug === slug)?.naam ?? slug;

export default function Home() {
  const volgende = wedstrijden.map((w) => ({ wedstrijd: w, ploegNaam: ploegNaam(w.ploeg) }));
  const uitslagen = wedstrijden
    .filter((w) => w.score)
    .sort((a, b) => b.datum.localeCompare(a.datum))
    .slice(0, 3);
  const laatsteNieuws = [...nieuws].sort((a, b) => b.datum.localeCompare(a.datum)).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paars-950 text-white">
        <PhotoPlaceholder label="Kattenbroek" verhouding="auto" priority className="absolute inset-0 !h-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-paars-950 via-paars-950/80 to-transparent" aria-hidden="true" />
        <div className="patroon-diag snede-onder relative">
          <div className="container-pagina py-20 sm:py-32">
            <p className="font-kop text-xl font-semibold uppercase tracking-widest text-goud">Sinds {club.opgericht} · {club.gemeente}</p>
            <h1 className="mt-2 max-w-3xl text-6xl sm:text-8xl">
              Ik Dien <span className="text-goud">–</span> One Team
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Knop href="/lid-worden/" variant="goud">Word lid</Knop>
              <Knop href="/kalender/" variant="licht">Kalender</Knop>
            </div>
          </div>
        </div>
      </section>

      {/* UEFA-strook */}
      <section aria-labelledby="uefa" className="py-10">
        <div className="container-pagina">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border-2 border-goud bg-paars-900 p-6 text-white shadow-lg sm:flex-row sm:items-center">
            <div>
              <p className="font-kop text-lg font-semibold uppercase tracking-widest text-goud">{uefaAward.naam}</p>
              <h2 id="uefa" className="text-3xl sm:text-4xl">Beste Amateurclub van Europa 2021/2022</h2>
              <p className="mt-1 text-paars-100">Nieuws bekendgemaakt op {uefaAward.bekendGemaakt}.</p>
            </div>
            <ExterneKnop link={links.uefaAftermovie} variant="goud" />
          </div>
        </div>
      </section>

      {/* Volgende wedstrijd */}
      <section aria-labelledby="volgende" className="bg-paars-900 py-16 text-white">
        <div className="container-pagina grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading titel="Volgende wedstrijd" licht />
            <h2 id="volgende" className="sr-only">Volgende wedstrijd</h2>
            <Countdown items={volgende} />
          </div>
          <div>
            <h2 className="mb-4 text-3xl text-goud">Laatste uitslagen</h2>
            <ul className="space-y-3 text-paars-950">
              {uitslagen.map((w) => (
                <li key={w.id}><MatchCard wedstrijd={w} ploegNaam={ploegNaam(w.ploeg)} /></li>
              ))}
            </ul>
            <Link href="/kalender/" className="mt-4 inline-block font-semibold text-goud underline underline-offset-4 hover:text-goud-licht">Alle wedstrijden →</Link>
          </div>
        </div>
      </section>

      {/* Nieuws */}
      <section className="container-pagina py-16" aria-labelledby="nieuws">
        <div id="nieuws"><SectionHeading titel="Laatste nieuws" /></div>
        <ul className="grid gap-5 md:grid-cols-3">
          {laatsteNieuws.map((n) => (
            <li key={n.slug}><NewsCard bericht={n} /></li>
          ))}
        </ul>
        <Link href="/nieuws/" className="mt-6 inline-block font-semibold text-paars-700 underline underline-offset-4">Alle nieuws →</Link>
      </section>

      {/* Evenementen */}
      <section className="bg-paars-50 py-16" aria-labelledby="evenementen">
        <div className="container-pagina grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div id="evenementen"><SectionHeading titel="Komende evenementen" /></div>
            <KomendeEvenementen evenementen={evenementen} />
          </div>
          <aside className="rounded-xl bg-paars-700 p-6 text-white">
            <h2 className="text-3xl">Volg ons</h2>
            <p className="mt-2 text-paars-100">Blijf op de hoogte via onze kanalen.</p>
            <ul className="mt-4 space-y-2">
              <li><ExterneTekstLink link={links.instagram} /></li>
              <li><ExterneTekstLink link={links.facebook} /></li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Sponsors */}
      <section className="container-pagina py-16" aria-labelledby="sponsors">
        <div id="sponsors"><SectionHeading titel="Onze sponsors" /></div>
        <SponsorCarousel sponsors={sponsors} />
        <Link href="/sponsors/" className="mt-6 inline-block font-semibold text-paars-700 underline underline-offset-4">Alle sponsors →</Link>
      </section>
    </>
  );
}

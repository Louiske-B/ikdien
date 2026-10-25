import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import { ExterneKnop } from "@/components/Knoppen";
import { club } from "@/content/club";
import { links } from "@/content/links";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Lid worden", `Word lid van ${club.naam}. Inschrijven gebeurt via Twizzit.`, "/lid-worden/");

const stappen = [
  { titel: "Kies je ploeg", tekst: "Bekijk de ploegen onder Sportief en kies de categorie die bij jou past." },
  { titel: "Schrijf in via Twizzit", tekst: "De inschrijving gebeurt volledig via Twizzit, ons ledenbeheersysteem." },
  { titel: "Wij nemen contact op", tekst: "Na je inschrijving krijg je van de club meer info over de eerste training." },
];

const faq = [
  { v: "Waar schrijf ik me in?", a: "Via Twizzit. Deze website zelf verwerkt geen inschrijvingen." },
  { v: "Wat kost het lidgeld?", a: "Info volgt: de club vult dit aan." },
  { v: "Kan ik eerst eens proberen?", a: "Info volgt: de club vult dit aan." },
  { v: "Wie kan ik contacteren met vragen?", a: `Mail naar ${club.emailVoetbal} of bel ${club.telefoon}.` },
];

export default function LidWorden() {
  return (
    <>
      <PaginaKop titel="Lid worden" intro="Speel mee bij Ik Dien – One Team." />
      <div className="container-pagina space-y-14 py-12">
        <section className="rounded-xl border-2 border-goud bg-paars-900 p-8 text-center text-white" aria-labelledby="inschrijven">
          <h2 id="inschrijven" className="text-4xl sm:text-5xl">Schrijf je in via Twizzit</h2>
          <p className="mx-auto mt-3 max-w-xl text-paars-100">De inschrijving gebeurt via Twizzit, niet via deze website.</p>
          <div className="mt-6 flex justify-center"><ExterneKnop link={links.twizzitInschrijving} variant="goud" /></div>
        </section>

        <section aria-labelledby="stappen">
          <h2 id="stappen" className="mb-6 text-4xl text-paars-700">In 3 stappen</h2>
          <ol className="grid gap-5 md:grid-cols-3">
            {stappen.map((s, i) => (
              <li key={s.titel} className="kaart p-6">
                <span className="font-kop text-6xl font-extrabold text-goud-donker" aria-hidden="true">{i + 1}</span>
                <h3 className="text-2xl text-paars-900">{s.titel}</h3>
                <p className="mt-1 text-neutral-700">{s.tekst}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq" className="max-w-3xl">
          <h2 id="faq" className="mb-6 text-4xl text-paars-700">Veelgestelde vragen</h2>
          <div className="divide-y divide-paars-100 rounded-xl border border-paars-100">
            {faq.map((f) => (
              <details key={f.v} className="group p-4">
                <summary className="cursor-pointer list-none font-semibold text-paars-900 marker:hidden">
                  <span className="mr-2 inline-block text-goud-donker transition-transform group-open:rotate-90" aria-hidden="true">▶</span>
                  {f.v}
                </summary>
                <p className="mt-2 pl-6 text-neutral-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

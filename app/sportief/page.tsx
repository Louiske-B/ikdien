import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import { ExterneKnop } from "@/components/Knoppen";
import { TeamCard } from "@/components/Kaarten";
import { club } from "@/content/club";
import { links } from "@/content/links";
import { categorieen, ploegen } from "@/content/ploegen";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Sportief", `Alle ploegen van ${club.naam} per categorie.`, "/sportief/");

export default function Sportief() {
  return (
    <>
      <PaginaKop titel="Sportief" intro="Onze ploegen per categorie. Kies een ploeg voor trainers, trainingsuren en kalender." />
      <div className="container-pagina space-y-14 py-12">
        {categorieen.map((c) => {
          const lijst = ploegen.filter((p) => p.categorie === c);
          if (lijst.length === 0) return null;
          const id = `cat-${c.toLowerCase().replace(/\W+/g, "-")}`;
          return (
            <section key={c} aria-labelledby={id}>
              <h2 id={id} className="mb-5 text-4xl text-paars-700">{c}</h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {lijst.map((p) => <li key={p.slug}><TeamCard ploeg={p} /></li>)}
              </ul>
            </section>
          );
        })}
        <section className="rounded-xl bg-paars-50 p-6" aria-labelledby="beleid">
          <h2 id="beleid" className="text-3xl text-paars-700">Jeugdbeleidsplan</h2>
          <p className="mb-4 mt-2 text-neutral-700">Lees hoe de club de jeugdwerking aanpakt.</p>
          <ExterneKnop link={links.jeugdbeleidsplan} />
        </section>
      </div>
    </>
  );
}

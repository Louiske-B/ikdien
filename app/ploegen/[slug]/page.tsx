import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import KalenderWeergave from "@/components/KalenderWeergave";
import Voorbeeld from "@/components/Voorbeeld";
import { Knop } from "@/components/Knoppen";
import { getPloeg, ploegen } from "@/content/ploegen";
import { maakMeta } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return ploegen.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPloeg(slug);
  if (!p) return {};
  return maakMeta(p.naam, `Trainers, trainingsuren en kalender van ${p.naam}.`, `/ploegen/${p.slug}/`);
}

export default async function PloegPagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPloeg(slug);
  if (!p) notFound();

  return (
    <>
      <PaginaKop titel={p.naam} intro={p.omschrijving} kruimel={{ href: "/sportief/", label: "Sportief" }}>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.voorbeeld && <Voorbeeld />}
          {p.teBevestigen && <span className="rounded bg-white/15 px-2 py-0.5 text-sm">Te bevestigen door de club</span>}
        </div>
      </PaginaKop>
      <div className="container-pagina space-y-14 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <PhotoPlaceholder label={p.naam} src={p.foto} alt="" verhouding="4 / 3" className="rounded-xl" />
          <div className="space-y-8">
            <section aria-labelledby="trainers">
              <h2 id="trainers" className="mb-2 text-3xl text-paars-700">Trainers</h2>
              <ul className="list-disc pl-5">{p.trainers.map((t) => <li key={t}>{t}</li>)}</ul>
            </section>
            <section aria-labelledby="trainingen">
              <h2 id="trainingen" className="mb-2 text-3xl text-paars-700">Trainingsuren</h2>
              <ul className="space-y-1">
                {p.trainingen.map((t, i) => <li key={i}>{t.dag} · {t.uur} · {t.plaats}</li>)}
              </ul>
            </section>
            <Knop href={`/kalender/?ploeg=${p.slug}`} variant="omlijnd">Bekijk in de volledige kalender</Knop>
          </div>
        </div>
        <section aria-labelledby="kal">
          <h2 id="kal" className="mb-4 text-4xl text-paars-700">Kalender {p.naam}</h2>
          <Suspense fallback={<p>Kalender laden…</p>}>
            <KalenderWeergave vaste={p.slug} />
          </Suspense>
        </section>
      </div>
    </>
  );
}

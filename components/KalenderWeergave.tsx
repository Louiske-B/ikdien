"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EventCard, MatchCard } from "./Kaarten";
import Voorbeeld from "./Voorbeeld";
import { useNow } from "@/lib/hooks";
import { maandNaam, ontleed, sorteerOpDatum, uur } from "@/lib/datum";
import { ploegen } from "@/content/ploegen";
import { wedstrijden, type Wedstrijd } from "@/content/wedstrijden";
import { evenementen, type Evenement } from "@/content/evenementen";

type Item =
  | { soort: "wedstrijd"; datum: string; id: string; wedstrijd: Wedstrijd }
  | { soort: "evenement"; datum: string; id: string; evenement: Evenement };

const ploegNaam = (slug: string) => ploegen.find((p) => p.slug === slug)?.naam ?? slug;
const DAGEN = ["ma", "di", "wo", "do", "vr", "za", "zo"];
const pad2 = (n: number) => String(n).padStart(2, "0");

function itemTitel(i: Item) {
  return i.soort === "wedstrijd" ? `${i.wedstrijd.thuis ? "Thuis" : "Uit"}: ${i.wedstrijd.tegenstander}` : i.evenement.titel;
}

/**
 * Kalender met lijst- en maandweergave. De filterstand staat in de URL
 * (?ploeg=a-ploeg&weergave=maand&maand=2026-11), zodat een gefilterde link deelbaar is.
 */
export default function KalenderWeergave({ vaste }: { vaste?: string }) {
  const router = useRouter();
  const pad = usePathname();
  const params = useSearchParams();
  const nu = useNow(60_000);

  const ploeg = vaste ?? params.get("ploeg") ?? "";
  const weergave = params.get("weergave") === "maand" ? "maand" : "lijst";

  const items: Item[] = useMemo(() => {
    const w: Item[] = wedstrijden
      .filter((x) => !ploeg || x.ploeg === ploeg)
      .map((x) => ({ soort: "wedstrijd", datum: x.datum, id: x.id, wedstrijd: x }));
    const e: Item[] = evenementen
      .filter((x) => !ploeg || !x.ploeg || x.ploeg === ploeg)
      .map((x) => ({ soort: "evenement", datum: x.datum, id: x.id, evenement: x }));
    return sorteerOpDatum([...w, ...e]);
  }, [ploeg]);

  // Maand: uit de URL, anders de maand van het eerstvolgende item (na laden), anders van het eerste item.
  const eerstvolgende = nu === null ? items[0] : items.find((i) => i.datum >= new Date(nu).toISOString().slice(0, 10)) ?? items[0];
  const standaardMaand = (eerstvolgende?.datum ?? "2026-11-01").slice(0, 7);
  const maandParam = params.get("maand");
  const maand = maandParam && /^\d{4}-\d{2}$/.test(maandParam) ? maandParam : standaardMaand;

  function zet(wijzig: Record<string, string>) {
    const p = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(wijzig)) {
      if (v) p.set(k, v);
      else p.delete(k);
    }
    const q = p.toString();
    router.replace(q ? `${pad}?${q}` : pad, { scroll: false });
  }

  function verschuif(delta: number) {
    const [j, m] = maand.split("-").map(Number);
    const d = new Date(Date.UTC(j, m - 1 + delta, 1));
    zet({ maand: `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}` });
  }

  const tab = (actief: boolean) =>
    `min-h-11 rounded-md border-2 px-4 font-kop text-lg font-semibold uppercase tracking-wide ${
      actief ? "border-paars-700 bg-paars-700 text-white" : "border-paars-200 text-paars-800 hover:bg-paars-50"
    }`;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        {!vaste && (
          <div>
            <label htmlFor="ploegfilter" className="block text-sm font-semibold">Filter per ploeg</label>
            <select
              id="ploegfilter"
              value={ploeg}
              onChange={(e) => zet({ ploeg: e.target.value })}
              className="mt-1 min-h-11 rounded-md border border-neutral-500 bg-white px-3"
            >
              <option value="">Alle ploegen</option>
              {ploegen.map((p) => <option key={p.slug} value={p.slug}>{p.naam}</option>)}
            </select>
          </div>
        )}
        <div className="flex gap-2" role="group" aria-label="Weergave">
          <button type="button" className={tab(weergave === "lijst")} aria-pressed={weergave === "lijst"} onClick={() => zet({ weergave: "" })}>Lijst</button>
          <button type="button" className={tab(weergave === "maand")} aria-pressed={weergave === "maand"} onClick={() => zet({ weergave: "maand" })}>Maand</button>
        </div>
      </div>

      {weergave === "lijst" ? (
        items.length === 0 ? (
          <p>Geen wedstrijden of evenementen gevonden.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.id}>
                {i.soort === "wedstrijd" ? (
                  <MatchCard wedstrijd={i.wedstrijd} ploegNaam={ploegNaam(i.wedstrijd.ploeg)} />
                ) : (
                  <EventCard evenement={i.evenement} />
                )}
              </li>
            ))}
          </ul>
        )
      ) : (
        <Maand maand={maand} items={items} verschuif={verschuif} />
      )}
    </div>
  );
}

function Maand({ maand, items, verschuif }: { maand: string; items: Item[]; verschuif: (d: number) => void }) {
  const [j, m] = maand.split("-").map(Number);
  const dagenInMaand = new Date(Date.UTC(j, m, 0)).getUTCDate();
  const startOffset = (new Date(Date.UTC(j, m - 1, 1)).getUTCDay() + 6) % 7; // maandag = 0
  const perDag = new Map<number, Item[]>();
  for (const i of items) {
    const { j: ij, m: im, d } = ontleed(i.datum);
    if (ij === j && im === m) perDag.set(d, [...(perDag.get(d) ?? []), i]);
  }
  const cellen: (number | null)[] = [...Array(startOffset).fill(null), ...Array.from({ length: dagenInMaand }, (_, k) => k + 1)];
  while (cellen.length % 7 !== 0) cellen.push(null);
  const maandItems = [...perDag.entries()].sort((a, b) => a[0] - b[0]);

  return (
    <section aria-label={`Kalender ${maandNaam(m)} ${j}`}>
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={() => verschuif(-1)} className="knop-omlijnd !min-h-10 !px-4" aria-label="Vorige maand">←</button>
        <h2 className="text-3xl text-paars-700" aria-live="polite">{maandNaam(m)} {j}</h2>
        <button type="button" onClick={() => verschuif(1)} className="knop-omlijnd !min-h-10 !px-4" aria-label="Volgende maand">→</button>
      </div>

      {/* Raster vanaf tablet */}
      <div className="hidden sm:block" role="table" aria-label={`Maandoverzicht ${maandNaam(m)}`}>
        <div className="grid grid-cols-7 gap-px rounded-t-lg bg-paars-700 text-center text-sm font-bold uppercase text-white" role="row">
          {DAGEN.map((d) => <div key={d} className="py-2" role="columnheader">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-px bg-paars-200" role="rowgroup">
          {cellen.map((d, idx) => (
            <div key={idx} className={`min-h-28 p-1.5 ${d ? "bg-white" : "bg-paars-50"}`} role="cell">
              {d && (
                <>
                  <div className="text-sm font-bold text-paars-800">{d}</div>
                  <ul className="mt-1 space-y-1">
                    {(perDag.get(d) ?? []).map((i) => (
                      <li
                        key={i.id}
                        className={`rounded px-1.5 py-0.5 text-xs leading-tight ${i.soort === "wedstrijd" ? "bg-paars-100 text-paars-950" : "bg-goud-licht text-paars-950"}`}
                      >
                        <span className="font-bold">{uur(i.datum)}</span> {itemTitel(i)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agenda op smalle schermen */}
      <div className="sm:hidden">
        {maandItems.length === 0 ? (
          <p>Niets gepland deze maand.</p>
        ) : (
          <ul className="space-y-3">
            {maandItems.flatMap(([, lijst]) => lijst).map((i) => (
              <li key={i.id}>
                {i.soort === "wedstrijd" ? (
                  <MatchCard wedstrijd={i.wedstrijd} ploegNaam={ploegNaam(i.wedstrijd.ploeg)} />
                ) : (
                  <EventCard evenement={i.evenement} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {items.some((i) => (i.soort === "wedstrijd" ? i.wedstrijd.voorbeeld : i.evenement.voorbeeld)) && <p className="mt-3 flex items-center gap-2 text-sm text-neutral-700">Deze items zijn voorbeelddata <Voorbeeld /></p>}
    </section>
  );
}

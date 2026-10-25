"use client";

import { MatchCard } from "./Kaarten";
import { useNow } from "@/lib/hooks";
import { naarMs } from "@/lib/datum";
import type { Wedstrijd } from "@/content/wedstrijden";

interface Item {
  wedstrijd: Wedstrijd;
  ploegNaam: string;
}

/**
 * Volgende wedstrijd met aftelklok. Telt pas na het laden in de browser
 * (tot dan is `useNow` null), zodat er geen hydration-fout kan ontstaan.
 */
export default function Countdown({ items }: { items: Item[] }) {
  const nu = useNow(1000);

  const volgende =
    nu === null
      ? null
      : items
          .filter((i) => !i.wedstrijd.score && naarMs(i.wedstrijd.datum) > nu)
          .sort((a, b) => naarMs(a.wedstrijd.datum) - naarMs(b.wedstrijd.datum))[0];

  if (nu === null) {
    return <div className="min-h-48 animate-pulse rounded-xl bg-paars-800/60" aria-busy="true" aria-label="Volgende wedstrijd wordt geladen" />;
  }

  if (!volgende) {
    return (
      <div className="rounded-xl border border-paars-700 p-6 text-center">
        <p className="font-kop text-2xl uppercase">Geen geplande wedstrijd</p>
      </div>
    );
  }

  const rest = Math.max(0, naarMs(volgende.wedstrijd.datum) - nu);
  const dagen = Math.floor(rest / 86_400_000);
  const uren = Math.floor((rest % 86_400_000) / 3_600_000);
  const min = Math.floor((rest % 3_600_000) / 60_000);
  const sec = Math.floor((rest % 60_000) / 1000);
  const blokken: [number, string][] = [[dagen, "dagen"], [uren, "uur"], [min, "min"], [sec, "sec"]];

  return (
    <div>
      <p className="sr-only" role="timer">
        Nog {dagen} dagen, {uren} uur en {min} minuten tot de volgende wedstrijd.
      </p>
      <div className="grid grid-cols-4 gap-2 text-center" aria-hidden="true">
        {blokken.map(([waarde, eenheid]) => (
          <div key={eenheid} className="rounded-lg bg-paars-950 py-3 text-white">
            <div className="font-kop text-4xl font-extrabold leading-none text-goud sm:text-5xl">{String(waarde).padStart(2, "0")}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-paars-200">{eenheid}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-paars-950">
        <MatchCard wedstrijd={volgende.wedstrijd} ploegNaam={volgende.ploegNaam} />
      </div>
    </div>
  );
}

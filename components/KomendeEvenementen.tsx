"use client";

import { EventCard } from "./Kaarten";
import { useNow } from "@/lib/hooks";
import { naarMs, sorteerOpDatum } from "@/lib/datum";
import type { Evenement } from "@/content/evenementen";

/** Toont de komende evenementen. Filtert pas in de browser, want "komend" hangt af van het moment van bezoek. */
export default function KomendeEvenementen({ evenementen, max = 3 }: { evenementen: Evenement[]; max?: number }) {
  const nu = useNow(60_000);
  const lijst = sorteerOpDatum(evenementen).filter((e) => nu === null || naarMs(e.datum) > nu).slice(0, max);
  if (lijst.length === 0) return <p className="text-neutral-700">Geen komende evenementen.</p>;
  return (
    <ul className="space-y-4">
      {lijst.map((e) => (
        <li key={e.id}>
          <EventCard evenement={e} />
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useState } from "react";
import { SponsorLogo } from "./Kaarten";
import type { Sponsor } from "@/content/sponsors";

/**
 * Logo-carrousel. Stopt bij hover en focus, heeft een pauzeknop, en toont bij
 * `prefers-reduced-motion` een statische grid (zie globals.css).
 */
export default function SponsorCarousel({ sponsors }: { sponsors: Sponsor[] }) {
  const [gepauzeerd, setGepauzeerd] = useState(false);
  const rij = (kopie: boolean) =>
    sponsors.map((s) => (
      <li key={`${kopie ? "k" : "o"}${s.id}`} className={`w-44 shrink-0 px-2 ${kopie ? "marquee-kopie" : ""}`} aria-hidden={kopie || undefined}>
        <SponsorLogo sponsor={s} />
      </li>
    ));
  return (
    <div className="marquee" data-gepauzeerd={gepauzeerd}>
      <div className="overflow-hidden">
        <ul className="marquee-spoor" aria-label="Onze sponsors">
          {rij(false)}
          {rij(true)}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setGepauzeerd(!gepauzeerd)}
        className="marquee-knop mt-3 rounded border border-paars-300 px-3 py-1 text-sm font-semibold text-paars-800 hover:bg-paars-50"
        aria-pressed={gepauzeerd}
      >
        {gepauzeerd ? "Carrousel hervatten" : "Carrousel pauzeren"}
      </button>
    </div>
  );
}

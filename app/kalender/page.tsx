import { Suspense } from "react";
import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import KalenderWeergave from "@/components/KalenderWeergave";
import { club } from "@/content/club";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Kalender", `Wedstrijden en evenementen van ${club.naam}, met filter per ploeg.`, "/kalender/");

export default function Kalender() {
  return (
    <>
      <PaginaKop titel="Kalender" intro="Wedstrijden en evenementen. Kies een ploeg en wissel tussen lijst- en maandweergave; de link met je filter kan je delen." />
      <div className="container-pagina py-12">
        <Suspense fallback={<p>Kalender laden…</p>}>
          <KalenderWeergave />
        </Suspense>
      </div>
    </>
  );
}

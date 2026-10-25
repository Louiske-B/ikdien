import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import { club } from "@/content/club";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Visie: One Team", `De visie van ${club.naam}: ${club.leuze}.`, "/club/visie/");

export default function Visie() {
  return (
    <>
      <PaginaKop titel="Visie: One Team" intro={club.leuze} kruimel={{ href: "/club/", label: "Club" }} />
      <div className="container-pagina max-w-3xl space-y-4 py-12 text-lg">
        <p>Onze leuze is <strong>{club.leuze}</strong>.</p>
        <p className="rounded-md border-l-4 border-goud bg-paars-50 p-4 text-base">
          Officiële tekst volgt: de club formuleert hier zelf haar visie.
        </p>
      </div>
    </>
  );
}

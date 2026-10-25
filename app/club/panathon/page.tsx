import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import { ExterneKnop } from "@/components/Knoppen";
import { club } from "@/content/club";
import { links } from "@/content/links";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Panathonverklaring", `De Panathonverklaring bij ${club.naam}.`, "/club/panathon/");

export default function Panathon() {
  return (
    <>
      <PaginaKop titel="Panathonverklaring" kruimel={{ href: "/club/", label: "Club" }} />
      <div className="container-pagina max-w-3xl space-y-4 py-12 text-lg">
        <p>De Panathonverklaring gaat over ethiek en fair play in de jeugdsport. Hieronder vind je het officiële document.</p>
        <p className="rounded-md border-l-4 border-goud bg-paars-50 p-4 text-base">
          Toelichting volgt: de club legt hier uit wat de verklaring voor haar betekent.
        </p>
        <ExterneKnop link={links.panathonverklaring} />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import { ExterneKnop } from "@/components/Knoppen";
import { club } from "@/content/club";
import { links } from "@/content/links";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Clubreglement", `Het clubreglement van ${club.naam}.`, "/club/clubreglement/");

export default function Clubreglement() {
  return (
    <>
      <PaginaKop titel="Clubreglement" kruimel={{ href: "/club/", label: "Club" }} />
      <div className="container-pagina max-w-3xl space-y-4 py-12 text-lg">
        <p className="rounded-md border-l-4 border-goud bg-paars-50 p-4">Officiële tekst volgt.</p>
        <ExterneKnop link={links.clubreglement} />
      </div>
    </>
  );
}

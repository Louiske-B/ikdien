import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import { ExterneKnop } from "@/components/Knoppen";
import { club } from "@/content/club";
import { links } from "@/content/links";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Privacyverklaring", `De privacyverklaring van ${club.naam}.`, "/club/privacy/");

export default function Privacy() {
  return (
    <>
      <PaginaKop titel="Privacyverklaring" kruimel={{ href: "/club/", label: "Club" }} />
      <div className="container-pagina max-w-3xl space-y-4 py-12 text-lg">
        <p className="rounded-md border-l-4 border-goud bg-paars-50 p-4">Officiële tekst volgt.</p>
        <ExterneKnop link={links.privacyverklaring} />
      </div>
    </>
  );
}

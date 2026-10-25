import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import NieuwsLijst from "@/components/NieuwsLijst";
import { club } from "@/content/club";
import { nieuws } from "@/content/nieuws";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Echo & Nieuws", `Het laatste nieuws van ${club.naam}.`, "/nieuws/");

export default function Nieuws() {
  const gesorteerd = [...nieuws].sort((a, b) => b.datum.localeCompare(a.datum));
  return (
    <>
      <PaginaKop titel="Echo & Nieuws" intro="Wat er leeft bij Ik Dien." />
      <div className="container-pagina py-12">
        <NieuwsLijst berichten={gesorteerd} />
      </div>
    </>
  );
}

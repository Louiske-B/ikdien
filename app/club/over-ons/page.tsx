import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { ExterneKnop } from "@/components/Knoppen";
import { club, uefaAward } from "@/content/club";
import { links } from "@/content/links";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Over ons", `${club.naam}, voetbalclub in ${club.gemeente} sinds ${club.opgericht}.`, "/club/over-ons/");

export default function OverOns() {
  return (
    <>
      <PaginaKop titel="Over ons" kruimel={{ href: "/club/", label: "Club" }} />
      <div className="container-pagina grid gap-10 py-12 md:grid-cols-2">
        <div className="space-y-4 text-lg">
          <p>
            {club.naam} is een voetbalclub uit {club.gemeente}, opgericht in {club.opgericht}. In 2024 vierde de club haar 100-jarig bestaan.
          </p>
          <p>
            Onze leuze is <strong>{club.leuze}</strong>.
          </p>
          <p>
            In het seizoen 2021/22 won de club de <strong>{uefaAward.naam}</strong>: {uefaAward.titel}. Het nieuws werd bekendgemaakt op {uefaAward.bekendGemaakt}.
          </p>
          <p className="rounded-md border-l-4 border-goud bg-paars-50 p-4 text-base">
            Meer tekst volgt: de club vult dit verhaal zelf aan (geschiedenis, werking, accommodatie).
          </p>
          <ExterneKnop link={links.uefaAftermovie} variant="omlijnd" />
        </div>
        <PhotoPlaceholder label="Kattenbroek" verhouding="4 / 3" className="rounded-xl" />
      </div>
    </>
  );
}

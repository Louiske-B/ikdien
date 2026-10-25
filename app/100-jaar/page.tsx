import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import SectionHeading from "@/components/SectionHeading";
import Tijdlijn from "@/components/Tijdlijn";
import Galerij from "@/components/Galerij";
import { galerij } from "@/content/tijdlijn";
import { club } from "@/content/club";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("100 jaar Ik Dien", `${club.naam} bestaat 100 jaar: opgericht in ${club.opgericht}, honderd jaar gevierd in 2024.`, "/100-jaar/");

export default function HonderdJaar() {
  return (
    <>
      <PaginaKop titel="100 jaar Ik Dien" intro={`Opgericht in ${club.opgericht}, honderd jaar gevierd in 2024.`} />
      <div className="container-pagina space-y-16 py-12">
        <section aria-labelledby="tijdlijn">
          <div id="tijdlijn"><SectionHeading titel="Tijdlijn 1924 – 2024" intro="De mijlpalen tussen de oprichting en het eeuwfeest. De club vult de echte geschiedenis zelf aan." /></div>
          <Tijdlijn />
        </section>
        <section aria-labelledby="galerij">
          <div id="galerij"><SectionHeading titel="Fotogalerij" intro="Klik op een foto om ze te vergroten. Gebruik de pijltjestoetsen om te bladeren en Esc om te sluiten." /></div>
          <Galerij fotos={galerij} />
        </section>
      </div>
    </>
  );
}

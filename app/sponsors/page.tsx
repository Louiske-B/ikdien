import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import Formulier from "@/components/Formulier";
import { SponsorLogo } from "@/components/Kaarten";
import { club } from "@/content/club";
import { niveaus, sponsors } from "@/content/sponsors";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Sponsors", `De sponsors van ${club.naam} en hoe je zelf sponsor wordt.`, "/sponsors/");

export default function Sponsors() {
  return (
    <>
      <PaginaKop titel="Sponsors" intro="Dankzij onze sponsors kan Ik Dien blijven werken aan voetbal voor iedereen." />
      <div className="container-pagina space-y-14 py-12">
        {niveaus.map((n) => {
          const lijst = sponsors.filter((s) => s.niveau === n.id);
          if (lijst.length === 0) return null;
          return (
            <section key={n.id} aria-labelledby={`niveau-${n.id}`}>
              <h2 id={`niveau-${n.id}`} className="mb-5 flex items-center gap-3 text-4xl text-paars-700">
                <span className="h-1.5 w-10 bg-goud" aria-hidden="true" />
                {n.titel}
              </h2>
              <ul className={`grid gap-4 ${n.id === "hoofdsponsor" ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                {lijst.map((s) => <li key={s.id}><SponsorLogo sponsor={s} groot={n.id === "hoofdsponsor"} /></li>)}
              </ul>
            </section>
          );
        })}

        <section aria-labelledby="word-sponsor" className="grid gap-8 rounded-xl bg-paars-50 p-6 md:grid-cols-2 md:p-10">
          <div>
            <h2 id="word-sponsor" className="text-4xl text-paars-700">Word sponsor</h2>
            <p className="mt-3 text-lg">Wil je de club steunen? Laat je gegevens achter en we nemen contact op. Voor vragen over sponsoring kan je ook terecht bij Team Finance: <a className="font-semibold text-paars-700 underline" href={`mailto:${club.emailFinance}`}>{club.emailFinance}</a>.</p>
          </div>
          <Formulier
            knop="Verstuur aanvraag"
            velden={[
              { naam: "bedrijf", label: "Bedrijfsnaam", type: "text", verplicht: true },
              { naam: "contact", label: "Contactpersoon", type: "text", verplicht: true },
              { naam: "email", label: "E-mailadres", type: "email", verplicht: true },
              { naam: "telefoon", label: "Telefoon", type: "tel" },
              { naam: "niveau", label: "Gewenst niveau", type: "select", opties: niveaus.map((n) => n.titel) },
              { naam: "bericht", label: "Bericht", type: "textarea" },
            ]}
          />
        </section>
      </div>
    </>
  );
}

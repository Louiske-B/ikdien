import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import Voorbeeld from "@/components/Voorbeeld";
import { club } from "@/content/club";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Bestuur & contactpersonen", `Bestuur en contactpersonen van ${club.naam}.`, "/club/bestuur/");

/** Voorbeeldfuncties; de club past dit aan. Namen volgen: we tonen geen personen zonder toestemming. */
const functies = ["Voorzitter", "Secretaris", "Penningmeester", "Jeugdverantwoordelijke", "Sportief verantwoordelijke"];

export default function Bestuur() {
  return (
    <>
      <PaginaKop titel="Bestuur" kruimel={{ href: "/club/", label: "Club" }} />
      <div className="container-pagina space-y-12 py-12">
        <section aria-labelledby="contactpersonen">
          <h2 id="contactpersonen" className="mb-4 text-3xl text-paars-700">Contactpersonen</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="kaart p-6">
              <h3 className="text-2xl text-paars-900">Team Voetbal</h3>
              <a className="mt-2 inline-block font-semibold text-paars-700 underline underline-offset-2" href={`mailto:${club.emailVoetbal}`}>{club.emailVoetbal}</a>
            </div>
            <div className="kaart p-6">
              <h3 className="text-2xl text-paars-900">Team Finance</h3>
              <a className="mt-2 inline-block font-semibold text-paars-700 underline underline-offset-2" href={`mailto:${club.emailFinance}`}>{club.emailFinance}</a>
            </div>
          </div>
        </section>
        <section aria-labelledby="bestuur">
          <h2 id="bestuur" className="mb-4 text-3xl text-paars-700">Bestuur</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {functies.map((f) => (
              <li key={f} className="kaart p-6">
                <div className="flex items-center gap-2"><h3 className="text-2xl text-paars-900">{f}</h3><Voorbeeld /></div>
                <p className="mt-1 text-neutral-700">Naam volgt</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

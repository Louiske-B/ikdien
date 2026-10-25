import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import Formulier from "@/components/Formulier";
import { club } from "@/content/club";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Contact", `Contactgegevens, kaart en contactformulier van ${club.naam}, ${club.straat}, ${club.postcode} ${club.gemeente}.`, "/contact/");

export default function Contact() {
  const { lat, lon } = club.kaart;
  const d = 0.006;
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik`;
  const zoek = `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${club.straat}, ${club.postcode} ${club.gemeente}`)}`;

  return (
    <>
      <PaginaKop titel="Contact" intro="Vragen? Neem gerust contact met ons op." />
      <div className="container-pagina grid gap-10 py-12 lg:grid-cols-2">
        <div className="space-y-8">
          <section aria-labelledby="gegevens">
            <h2 id="gegevens" className="mb-3 text-3xl text-paars-700">Gegevens</h2>
            <address className="space-y-2 text-lg not-italic">
              <p>{club.naam}<br />{club.straat}<br />{club.postcode} {club.gemeente}</p>
              <p>Tel: <a className="font-semibold text-paars-700 underline underline-offset-2" href={`tel:${club.telefoonLink}`}>{club.telefoon}</a></p>
              <p>Team Voetbal: <a className="font-semibold text-paars-700 underline underline-offset-2" href={`mailto:${club.emailVoetbal}`}>{club.emailVoetbal}</a></p>
              <p>Team Finance: <a className="font-semibold text-paars-700 underline underline-offset-2" href={`mailto:${club.emailFinance}`}>{club.emailFinance}</a></p>
            </address>
          </section>
          <section aria-labelledby="kaart">
            <h2 id="kaart" className="mb-3 text-3xl text-paars-700">Kaart</h2>
            <iframe
              title={`Kaart van ${club.straat}, ${club.gemeente} (OpenStreetMap)`}
              src={embed}
              className="h-80 w-full rounded-xl border border-paars-200"
              loading="lazy"
            />
            <p className="mt-2"><a className="font-semibold text-paars-700 underline underline-offset-2" href={zoek} target="_blank" rel="noopener noreferrer">Open in OpenStreetMap<span className="sr-only"> (opent in een nieuw tabblad)</span></a></p>
          </section>
        </div>
        <section aria-labelledby="formulier">
          <h2 id="formulier" className="mb-3 text-3xl text-paars-700">Stuur ons een bericht</h2>
          <Formulier
            knop="Verstuur"
            velden={[
              { naam: "naam", label: "Naam", type: "text", verplicht: true },
              { naam: "email", label: "E-mailadres", type: "email", verplicht: true },
              { naam: "onderwerp", label: "Onderwerp", type: "text" },
              { naam: "bericht", label: "Bericht", type: "textarea", verplicht: true },
            ]}
          />
        </section>
      </div>
    </>
  );
}

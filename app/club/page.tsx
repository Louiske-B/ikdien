import Link from "next/link";
import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import { club } from "@/content/club";
import { maakMeta } from "@/lib/meta";

export const metadata: Metadata = maakMeta("Club", `Alles over ${club.naam}: over ons, visie, bestuur, Panathonverklaring, clubreglement en privacy.`, "/club/");

const clubPaginas = [
  { href: "/club/over-ons/", titel: "Over ons", tekst: "Wie we zijn en waar we vandaan komen." },
  { href: "/club/visie/", titel: "Visie: One Team", tekst: "Waar Ik Dien voor staat." },
  { href: "/club/bestuur/", titel: "Bestuur & contactpersonen", tekst: "Wie waarvoor aanspreekbaar is." },
  { href: "/club/panathon/", titel: "Panathonverklaring", tekst: "Ethiek en fair play in de jeugdsport." },
  { href: "/club/clubreglement/", titel: "Clubreglement", tekst: "De afspraken binnen de club." },
  { href: "/club/privacy/", titel: "Privacyverklaring", tekst: "Hoe we met persoonsgegevens omgaan." },
];

export default function Club() {
  return (
    <>
      <PaginaKop titel="De club" intro={`${club.naam} · ${club.leuze}`} />
      <ul className="container-pagina grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {clubPaginas.map((p) => (
          <li key={p.href} className="kaart-link p-6">
            <h2 className="text-3xl text-paars-700">
              <Link href={p.href} className="after:absolute after:inset-0">{p.titel}</Link>
            </h2>
            <p className="mt-2 text-neutral-700">{p.tekst}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

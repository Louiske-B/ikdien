import Link from "next/link";
import Logo from "./Logo";
import { ExterneTekstLink } from "./Knoppen";
import { club, IS_VOORSTEL } from "@/content/club";
import { links } from "@/content/links";

export default function Footer() {
  return (
    <footer className="patroon-diag bg-paars-950 text-paars-100">
      <div className="container-pagina grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 text-white">
            <Logo size={44} />
            <span className="font-kop text-2xl font-extrabold uppercase">{club.naam}</span>
          </div>
          <p className="mt-3 font-kop text-xl uppercase tracking-wide text-goud">{club.leuze}</p>
          <p className="mt-2 text-sm">Opgericht in {club.opgericht}</p>
        </div>

        <div>
          <h2 className="text-2xl text-white">Contact</h2>
          <address className="mt-3 space-y-1 not-italic">
            <p>{club.straat}</p>
            <p>{club.postcode} {club.gemeente}</p>
            <p><a className="underline underline-offset-2 hover:text-goud-licht" href={`tel:${club.telefoonLink}`}>{club.telefoon}</a></p>
            <p><a className="underline underline-offset-2 hover:text-goud-licht" href={`mailto:${club.emailVoetbal}`}>{club.emailVoetbal}</a></p>
          </address>
        </div>

        <div>
          <h2 className="text-2xl text-white">Volg en lees</h2>
          <ul className="mt-3 space-y-1">
            <li><ExterneTekstLink link={links.facebook} /></li>
            <li><ExterneTekstLink link={links.instagram} /></li>
            <li><ExterneTekstLink link={links.twizzitSite} /></li>
            <li><Link className="underline underline-offset-2 hover:text-goud-licht" href="/club/clubreglement/">Clubreglement</Link></li>
            <li><Link className="underline underline-offset-2 hover:text-goud-licht" href="/club/privacy/">Privacyverklaring</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm">
        © {new Date().getFullYear()} {club.naam}
        {IS_VOORSTEL && <> · <span className="font-semibold text-goud">Ontwerpvoorstel</span></>}
      </div>
    </footer>
  );
}

import Link from "next/link";
import PhotoPlaceholder from "./PhotoPlaceholder";
import Voorbeeld from "./Voorbeeld";
import { club } from "@/content/club";
import { datumKort, datumLang, ontleed, uur } from "@/lib/datum";
import type { Nieuwsbericht } from "@/content/nieuws";
import type { Wedstrijd } from "@/content/wedstrijden";
import type { Ploeg } from "@/content/ploegen";
import type { Sponsor } from "@/content/sponsors";
import type { Evenement } from "@/content/evenementen";

export function NewsCard({ bericht }: { bericht: Nieuwsbericht }) {
  return (
    <article className="kaart-link h-full">
      <PhotoPlaceholder label={bericht.categorie} src={bericht.foto} alt="" verhouding="16 / 9" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-paars-700">{bericht.categorie}</span>
          <time dateTime={bericht.datum} className="text-neutral-600">{datumLang(bericht.datum)}</time>
          {bericht.voorbeeld && <Voorbeeld />}
        </div>
        <h3 className="text-2xl text-paars-900">
          <Link href={`/nieuws/${bericht.slug}/`} className="after:absolute after:inset-0">
            {bericht.titel}
          </Link>
        </h3>
        <p className="text-neutral-700">{bericht.samenvatting}</p>
      </div>
    </article>
  );
}

export function MatchCard({ wedstrijd, ploegNaam }: { wedstrijd: Wedstrijd; ploegNaam?: string }) {
  const { thuis, score, tegenstander } = wedstrijd;
  const links = thuis ? club.naam : tegenstander;
  const rechts = thuis ? tegenstander : club.naam;
  const sl = score ? (thuis ? score.club : score.tegenstander) : null;
  const sr = score ? (thuis ? score.tegenstander : score.club) : null;
  return (
    <article className="kaart p-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <time dateTime={wedstrijd.datum} className="font-semibold text-paars-800">
          {datumLang(wedstrijd.datum)} · {uur(wedstrijd.datum)}
        </time>
        <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${thuis ? "bg-paars-700 text-white" : "bg-paars-100 text-paars-900"}`}>
          {thuis ? "Thuis" : "Uit"}
        </span>
        {ploegNaam && <span className="text-neutral-600">{ploegNaam}</span>}
        {wedstrijd.voorbeeld && <Voorbeeld className="ml-auto" />}
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <span className="text-right font-semibold">{links}</span>
        {score ? (
          <span className="rounded bg-paars-900 px-3 py-1 font-kop text-2xl font-bold text-white">
            <span className="sr-only">Uitslag: </span>
            {sl} – {sr}
          </span>
        ) : (
          <span className="rounded border border-paars-200 px-2 py-1 text-xs font-semibold uppercase text-neutral-700">Nog te spelen</span>
        )}
        <span className="text-left font-semibold">{rechts}</span>
      </div>
    </article>
  );
}

export function TeamCard({ ploeg }: { ploeg: Ploeg }) {
  return (
    <article className="kaart-link h-full">
      <PhotoPlaceholder label={ploeg.naam} src={ploeg.foto} alt="" verhouding="4 / 3" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap gap-2">
          {ploeg.voorbeeld && <Voorbeeld />}
          {ploeg.teBevestigen && (
            <span className="rounded border border-paars-200 px-2 py-0.5 text-sm text-neutral-700">Te bevestigen door de club</span>
          )}
        </div>
        <h3 className="text-2xl text-paars-900">
          <Link href={`/ploegen/${ploeg.slug}/`} className="after:absolute after:inset-0">
            {ploeg.naam}
          </Link>
        </h3>
        <p className="text-neutral-700">{ploeg.omschrijving}</p>
      </div>
    </article>
  );
}

export function SponsorLogo({ sponsor, groot = false }: { sponsor: Sponsor; groot?: boolean }) {
  const inhoud = sponsor.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={sponsor.logo} alt={sponsor.naam} className="max-h-full max-w-full object-contain" />
  ) : (
    <span className="px-2 text-center font-kop text-lg font-semibold uppercase leading-tight text-paars-700">{sponsor.naam}</span>
  );
  return (
    <div className={`relative flex items-center justify-center rounded-lg border border-paars-100 bg-white p-3 ${groot ? "h-40" : "h-24"}`}>
      {inhoud}
      {sponsor.voorbeeld && <Voorbeeld className="absolute right-1 top-1 !px-1.5 !py-0 !text-xs" />}
    </div>
  );
}

export function EventCard({ evenement }: { evenement: Evenement }) {
  const { d } = ontleed(evenement.datum);
  return (
    <article className="kaart flex-row gap-4 p-4">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-paars-700 text-white" aria-hidden="true">
        <span className="font-kop text-2xl font-bold leading-none">{d}</span>
        <span className="text-xs uppercase">{datumKort(evenement.datum).split(" ")[1]}</span>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl text-paars-900">{evenement.titel}</h3>
          {evenement.voorbeeld && <Voorbeeld />}
        </div>
        <p className="text-sm text-neutral-700">
          <time dateTime={evenement.datum}>{datumLang(evenement.datum)} · {uur(evenement.datum)}</time> · {evenement.plaats}
        </p>
        <p className="mt-1 text-neutral-700">{evenement.omschrijving}</p>
      </div>
    </article>
  );
}

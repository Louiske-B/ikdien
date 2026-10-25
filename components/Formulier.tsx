"use client";

import { useState, type FormEvent } from "react";
import { club } from "@/content/club";

export interface Veld {
  naam: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  verplicht?: boolean;
  opties?: string[];
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulier met frontend-validatie. Het wordt NIET verzonden: na een geldige invoer
 * verschijnt de melding dat het formulier nog niet gekoppeld is.
 *
 * TODO backend: de site is statisch (geen server), dus verzenden kan via
 *  - Formspree (of een gelijkaardige dienst): zet in handleSubmit een fetch("https://formspree.io/f/<id>", { method: "POST", body: new FormData(e.currentTarget) })
 *  - Cloudflare Pages Functions: maak een map `functions/` met een endpoint dat een e-maildienst (bv. Resend of MailChannels) aanroept.
 * Vergeet bij echte verzending geen spam-bescherming (honeypot of Turnstile) en pas Content-Security-Policy `connect-src` in public/_headers aan.
 */
export default function Formulier({ velden, knop }: { velden: Veld[]; knop: string }) {
  const [fouten, setFouten] = useState<Record<string, string>>({});
  const [klaar, setKlaar] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nieuw: Record<string, string> = {};
    for (const v of velden) {
      const waarde = String(data.get(v.naam) ?? "").trim();
      if (v.verplicht && !waarde) nieuw[v.naam] = `${v.label} is verplicht.`;
      else if (v.type === "email" && waarde && !EMAIL.test(waarde)) nieuw[v.naam] = "Geef een geldig e-mailadres in.";
    }
    setFouten(nieuw);
    setKlaar(Object.keys(nieuw).length === 0);
  }

  const basis = "mt-1 w-full rounded-md border border-neutral-500 bg-white px-3 py-2 text-base";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {velden.map((v) => {
        const id = `veld-${v.naam}`;
        const fout = fouten[v.naam];
        const gemeenschappelijk = {
          id,
          name: v.naam,
          required: v.verplicht,
          "aria-invalid": fout ? true : undefined,
          "aria-describedby": fout ? `${id}-fout` : undefined,
          className: basis,
        };
        return (
          <div key={v.naam}>
            <label htmlFor={id} className="font-semibold">
              {v.label}
              {v.verplicht ? <span aria-hidden="true"> *</span> : <span className="font-normal text-neutral-600"> (optioneel)</span>}
            </label>
            {v.type === "textarea" ? (
              <textarea {...gemeenschappelijk} rows={5} />
            ) : v.type === "select" ? (
              <select {...gemeenschappelijk} defaultValue="">
                <option value="" disabled>Kies…</option>
                {v.opties?.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input {...gemeenschappelijk} type={v.type} autoComplete={v.type === "email" ? "email" : v.type === "tel" ? "tel" : undefined} />
            )}
            {fout && <p id={`${id}-fout`} className="mt-1 text-sm font-semibold text-red-700">{fout}</p>}
          </div>
        );
      })}
      <button type="submit" className="knop-primair">{knop}</button>
      {klaar && (
        <p role="status" className="rounded-md border-2 border-goud bg-paars-50 p-4 font-semibold text-paars-900">
          Dit formulier is nog niet gekoppeld – mail ons via{" "}
          <a className="underline" href={`mailto:${club.emailVoetbal}`}>{club.emailVoetbal}</a>
        </p>
      )}
    </form>
  );
}

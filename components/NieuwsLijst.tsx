"use client";

import { useState } from "react";
import { NewsCard } from "./Kaarten";
import { nieuwsCategorieen, type Nieuwsbericht } from "@/content/nieuws";

export default function NieuwsLijst({ berichten }: { berichten: Nieuwsbericht[] }) {
  const [categorie, setCategorie] = useState<string>("Alles");
  const getoond = berichten.filter((b) => categorie === "Alles" || b.categorie === categorie);
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter op categorie">
        {["Alles", ...nieuwsCategorieen].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={categorie === c}
            onClick={() => setCategorie(c)}
            className={`min-h-11 rounded-full border-2 px-4 font-kop text-lg font-semibold uppercase tracking-wide ${
              categorie === c ? "border-paars-700 bg-paars-700 text-white" : "border-paars-200 text-paars-800 hover:bg-paars-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{getoond.length} berichten getoond</p>
      {getoond.length === 0 ? (
        <p>Geen berichten in deze categorie.</p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-3">
          {getoond.map((b) => (
            <li key={b.slug}><NewsCard bericht={b} /></li>
          ))}
        </ul>
      )}
    </>
  );
}

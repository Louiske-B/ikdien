"use client";

import { useState } from "react";

export default function VoorstelBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-goud text-paars-950" role="region" aria-label="Melding ontwerpvoorstel">
      <div className="container-pagina flex items-center justify-between gap-3 py-1.5 text-sm font-semibold">
        <p>Ontwerpvoorstel – dit is niet de officiële website van Kon. Ik Dien FC</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-paars-950/10"
          aria-label="Melding sluiten"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useFocusTrap } from "@/lib/hooks";
import type { GalerijFoto } from "@/content/tijdlijn";

/** Fotogalerij met lightbox: Esc sluit, pijltjestoetsen bladeren, de focus blijft in het venster. */
export default function Galerij({ fotos }: { fotos: GalerijFoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const venster = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const sluit = useCallback(() => setIndex(null), []);
  const vorige = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length)), [fotos.length]);
  const volgende = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % fotos.length)), [fotos.length]);

  useFocusTrap(venster, open, sluit);

  useEffect(() => {
    if (!open) return;
    function toets(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") vorige();
      if (e.key === "ArrowRight") volgende();
    }
    document.addEventListener("keydown", toets);
    return () => document.removeEventListener("keydown", toets);
  }, [open, vorige, volgende]);

  const foto = index !== null ? fotos[index] : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {fotos.map((f, i) => (
          <li key={f.id}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-lg"
              aria-label={`Foto vergroten: ${f.bijschrift}`}
            >
              <PhotoPlaceholder label={f.bijschrift} src={f.src} alt="" verhouding="1 / 1" className="transition-transform group-hover:scale-105" />
            </button>
          </li>
        ))}
      </ul>

      {foto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-paars-950/95 p-4" role="dialog" aria-modal="true" aria-label="Fotogalerij">
          <div ref={venster} className="w-full max-w-4xl">
            <div className="mb-3 flex items-center justify-between text-white">
              <p aria-live="polite">{foto.bijschrift} <span className="text-paars-200">({(index ?? 0) + 1} / {fotos.length})</span></p>
              <button type="button" onClick={sluit} className="knop-licht !min-h-10 !px-4">Sluiten</button>
            </div>
            <PhotoPlaceholder label={foto.bijschrift} src={foto.src} alt={foto.bijschrift} verhouding="3 / 2" className="rounded-lg" />
            <div className="mt-3 flex justify-between">
              <button type="button" onClick={vorige} className="knop-goud">← Vorige</button>
              <button type="button" onClick={volgende} className="knop-goud">Volgende →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

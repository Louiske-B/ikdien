import Image from "next/image";

/**
 * Foto of placeholder met vaste beeldverhouding (geen layout shift).
 * Zet een bestand in public/fotos/ en geef het pad door als `src` (bv. "/fotos/a-ploeg.jpg").
 * Zonder `src` verschijnt een placeholder met de tekst "Foto: <label>".
 */
export default function PhotoPlaceholder({
  label,
  src,
  alt,
  verhouding = "16 / 9",
  priority = false,
  className = "",
}: {
  label: string;
  src?: string;
  alt?: string;
  verhouding?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden bg-paars-100 ${className}`} style={{ aspectRatio: verhouding }}>
      {src ? (
        <Image src={src} alt={alt ?? label} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority={priority} />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder: ${label}`}
          className="patroon-diag flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-paars-700 to-paars-950 p-4 text-center text-paars-100"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="11" r="2" />
            <path d="m21 16-5-5-8 8" />
          </svg>
          <span className="font-kop text-lg font-semibold uppercase tracking-wide">Foto: {label}</span>
        </div>
      )}
    </div>
  );
}

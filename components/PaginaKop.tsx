import Link from "next/link";
import type { ReactNode } from "react";

/** Paarse paginakop met diagonale onderrand. `kruimel` = optionele terug-link (bv. naar Club). */
export default function PaginaKop({
  titel,
  intro,
  kruimel,
  children,
}: {
  titel: string;
  intro?: string;
  kruimel?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <section className="bg-paars-800 text-white">
      <div className="patroon-diag snede-onder">
        <div className="container-pagina pt-12 sm:pt-16">
          {kruimel && (
            <Link href={kruimel.href} className="mb-3 inline-block font-semibold text-goud underline underline-offset-4 hover:text-goud-licht">
              ← {kruimel.label}
            </Link>
          )}
          <h1 className="text-5xl sm:text-7xl">{titel}</h1>
          <div className="mt-3 h-1.5 w-20 bg-goud" aria-hidden="true" />
          {intro && <p className="mt-4 max-w-2xl text-lg text-paars-100">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

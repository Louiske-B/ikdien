import Link from "next/link";
import type { ReactNode } from "react";
import { isTodo, type ExterneLink } from "@/content/links";

type Variant = "primair" | "goud" | "omlijnd" | "licht";

/** Interne knop (naar een pagina op deze site). */
export function Knop({ href, variant = "primair", children }: { href: string; variant?: Variant; children: ReactNode }) {
  return (
    <Link href={href} className={`knop-${variant}`}>
      {children}
    </Link>
  );
}

/**
 * Externe knop. Staat de URL in content/links.ts nog op TODO, dan is de knop uitgeschakeld
 * en toont hij "Link volgt".
 */
export function ExterneKnop({ link, variant = "primair", label }: { link: ExterneLink; variant?: Variant; label?: string }) {
  const tekst = label ?? link.label;
  if (isTodo(link.url)) {
    return (
      <span className="knop-uit" role="link" aria-disabled="true">
        {tekst} – Link volgt
      </span>
    );
  }
  const extern = link.url.startsWith("http");
  return (
    <a
      href={link.url}
      className={`knop-${variant}`}
      {...(extern ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
    >
      {tekst}
      {extern && <span className="sr-only"> (opent in een nieuw tabblad)</span>}
    </a>
  );
}

/** Tekstlink naar een externe bestemming; toont "Link volgt" zolang de URL ontbreekt. */
export function ExterneTekstLink({ link, className = "" }: { link: ExterneLink; className?: string }) {
  if (isTodo(link.url)) {
    return (
      <span className={`text-neutral-600 ${className}`} aria-disabled="true">
        {link.label} (link volgt)
      </span>
    );
  }
  return (
    <a href={link.url} className={`underline underline-offset-2 hover:text-goud-licht ${className}`} target="_blank" rel="noopener noreferrer">
      {link.label}
      <span className="sr-only"> (opent in een nieuw tabblad)</span>
    </a>
  );
}

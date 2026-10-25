"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { club } from "@/content/club";
import { useFocusTrap } from "@/lib/hooks";

const nav = [
  { href: "/100-jaar/", label: "100 jaar" },
  { href: "/club/", label: "Club" },
  { href: "/sportief/", label: "Sportief" },
  { href: "/kalender/", label: "Kalender" },
  { href: "/nieuws/", label: "Echo & Nieuws" },
  { href: "/sponsors/", label: "Sponsors" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const pad = usePathname();
  const [open, setOpen] = useState(false);
  const paneel = useRef<HTMLDivElement>(null);
  const sluit = useCallback(() => setOpen(false), []);
  useFocusTrap(paneel, open, sluit);

  const actief = (href: string) => pad === href || pad.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-paars-900 text-white shadow-md">
      <div className="container-pagina flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${club.naam} – naar de homepage`}>
          <Logo size={44} />
          <span className="font-kop text-2xl font-extrabold uppercase leading-none tracking-wide">
            {club.korteNaam} <span className="text-goud">FC</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hoofdmenu">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={actief(n.href) ? "page" : undefined}
              className={`rounded px-3 py-2 font-kop text-lg font-semibold uppercase tracking-wide hover:bg-white/10 ${actief(n.href) ? "text-goud" : ""}`}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/lid-worden/" className="knop-goud ml-2 !py-1.5">
            Word lid
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobiel-menu"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d={open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobiel-menu" ref={paneel} className="border-t border-white/10 lg:hidden">
          <nav className="container-pagina flex flex-col gap-1 py-3" aria-label="Mobiel menu">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={sluit}
                aria-current={actief(n.href) ? "page" : undefined}
                className={`rounded px-3 py-3 font-kop text-xl font-semibold uppercase tracking-wide hover:bg-white/10 ${actief(n.href) ? "text-goud" : ""}`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/lid-worden/" onClick={sluit} className="knop-goud mt-2">
              Word lid
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

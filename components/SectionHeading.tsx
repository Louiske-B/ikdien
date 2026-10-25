import type { ReactNode } from "react";

export default function SectionHeading({
  titel,
  intro,
  niveau = 2,
  licht = false,
  children,
}: {
  titel: string;
  intro?: string;
  niveau?: 1 | 2;
  licht?: boolean;
  children?: ReactNode;
}) {
  const H = niveau === 1 ? "h1" : "h2";
  const grootte = niveau === 1 ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl";
  return (
    <div className="mb-8">
      <H className={`${grootte} ${licht ? "text-white" : "text-paars-700"}`}>{titel}</H>
      <div className="mt-3 h-1.5 w-20 bg-goud" aria-hidden="true" />
      {intro && <p className={`mt-4 max-w-2xl text-lg ${licht ? "text-paars-100" : "text-neutral-700"}`}>{intro}</p>}
      {children}
    </div>
  );
}

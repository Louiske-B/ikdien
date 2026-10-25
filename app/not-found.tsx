import type { Metadata } from "next";
import { Knop } from "@/components/Knoppen";

export const metadata: Metadata = { title: "Pagina niet gevonden | Kon. Ik Dien FC", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="patroon-diag bg-paars-900 py-24 text-center text-white">
      <div className="container-pagina">
        <p className="font-kop text-9xl font-extrabold text-goud">404</p>
        <h1 className="text-5xl">Buitenspel!</h1>
        <p className="mx-auto mt-4 max-w-md text-paars-100">Deze pagina bestaat niet (meer). Keer terug naar het middenveld.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Knop href="/" variant="goud">Naar de homepage</Knop>
          <Knop href="/kalender/" variant="licht">Kalender</Knop>
        </div>
      </div>
    </section>
  );
}

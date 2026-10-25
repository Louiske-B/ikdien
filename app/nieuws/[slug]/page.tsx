import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PaginaKop from "@/components/PaginaKop";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Voorbeeld from "@/components/Voorbeeld";
import { datumLang } from "@/lib/datum";
import { getNieuws, nieuws } from "@/content/nieuws";
import { maakMeta } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return nieuws.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = getNieuws(slug);
  if (!n) return {};
  return maakMeta(n.titel, n.samenvatting, `/nieuws/${n.slug}/`);
}

export default async function NieuwsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNieuws(slug);
  if (!n) notFound();

  return (
    <>
      <PaginaKop titel={n.titel} kruimel={{ href: "/nieuws/", label: "Alle nieuws" }}>
        <p className="mt-4 flex flex-wrap items-center gap-3 text-paars-100">
          <span className="font-semibold text-goud">{n.categorie}</span>
          <time dateTime={n.datum}>{datumLang(n.datum)}</time>
          {n.voorbeeld && <Voorbeeld />}
        </p>
      </PaginaKop>
      <article className="container-pagina max-w-3xl space-y-5 py-12 text-lg">
        <PhotoPlaceholder label={n.categorie} src={n.foto} alt="" verhouding="16 / 9" className="rounded-xl" />
        {n.tekst.map((alinea, i) => <p key={i}>{alinea}</p>)}
      </article>
    </>
  );
}

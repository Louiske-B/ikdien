import type { Metadata } from "next";
import { club, IS_VOORSTEL } from "@/content/club";

/** Unieke title, description en Open Graph per pagina. */
export function maakMeta(titel: string, beschrijving: string, pad: string): Metadata {
  const volledig = `${titel} | ${club.naam}`;
  return {
    title: volledig,
    description: beschrijving,
    alternates: { canonical: pad },
    openGraph: {
      title: volledig,
      description: beschrijving,
      url: pad,
      siteName: club.naam,
      locale: "nl_BE",
      type: "website",
    },
    ...(IS_VOORSTEL ? { robots: { index: false, follow: false } } : {}),
  };
}

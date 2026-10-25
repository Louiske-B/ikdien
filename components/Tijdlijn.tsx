import Voorbeeld from "./Voorbeeld";
import { tijdlijn } from "@/content/tijdlijn";

export default function Tijdlijn() {
  return (
    <ol className="relative border-l-4 border-goud pl-6 sm:pl-10">
      {tijdlijn.map((m) => (
        <li key={m.jaar} className="relative pb-10 last:pb-0">
          <span className="absolute -left-[2.15rem] top-1 h-5 w-5 rounded-full border-4 border-goud bg-paars-700 sm:-left-[3.15rem]" aria-hidden="true" />
          <p className="font-kop text-5xl font-extrabold text-paars-700">{m.jaar}</p>
          <div className="kaart mt-2 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl text-paars-900">{m.titel}</h3>
              {m.voorbeeld && <Voorbeeld />}
            </div>
            <p className="mt-1 text-neutral-700">{m.tekst}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

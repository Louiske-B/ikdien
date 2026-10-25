# Kon. Ik Dien FC – ontwerpvoorstel voor een nieuwe website

Dit is een **ontwerpvoorstel**, niet de officiële website. De site is statisch (geen server nodig), gebouwd met Next.js, TypeScript en Tailwind CSS. Alle teksten staan in het Nederlands.

Alleen deze gegevens zijn echt: naam, oprichting 1924, leuze "IK DIEN – ONE TEAM", UEFA Grassroots Award 2021/22, adres en contactgegevens. **Al het andere (nieuws, wedstrijden, ploegen, trainers, sponsors, mijlpalen, bestuur) is voorbeelddata** en draagt het label "Voorbeeld".

## 1. Lokaal draaien

1. Installeer [Node.js](https://nodejs.org) (LTS-versie).
2. Open een terminal in deze map en typ:
   ```
   npm install
   npm run dev
   ```
3. Open <http://localhost:3000>. Wijzigingen verschijnen meteen.
4. De interne pagina `/styleguide/` toont alle kleuren, knoppen en kaarten.

Controleren en bouwen: `npm run lint` en `npm run build` (maakt de map `out/`). Testen zoals op de echte server: `npx serve out`.

## 2. Inhoud aanpassen

Alle inhoud staat in de map `content/`. Elk bestand begint met een blok **"Zo pas je dit aan"**. Open het bestand in een teksteditor (bv. Visual Studio Code), pas de tekst tussen aanhalingstekens aan en bewaar.

**Een nieuwsbericht toevoegen** (`content/nieuws.ts`): kopieer een blok bovenaan de lijst en pas aan:
```ts
{
  slug: "kampioenenfeest",          // komt in de URL: /nieuws/kampioenenfeest/
  titel: "Kampioenenfeest",
  datum: "2027-05-20",
  categorie: "Club",                // Club, Sportief, Jeugd of Evenementen
  samenvatting: "Korte tekst voor in het overzicht.",
  tekst: ["Eerste alinea.", "Tweede alinea."],
  voorbeeld: false,                 // false = het label "Voorbeeld" verdwijnt
},
```

**Een wedstrijd en uitslag invullen** (`content/wedstrijden.ts`):
```ts
{ id: "w20", ploeg: "a-ploeg", datum: "2027-03-07T15:00", tegenstander: "FC Voorbeeld", thuis: true, voorbeeld: false },
```
Is de wedstrijd gespeeld? Voeg `score: { club: 2, tegenstander: 1 }` toe. Zonder score staat er "Nog te spelen". De `ploeg` moet overeenkomen met een `slug` uit `content/ploegen.ts`.

**Een sponsor toevoegen** (`content/sponsors.ts`):
```ts
{ id: "s11", naam: "Bakkerij Voorbeeld", niveau: "gold", logo: "/fotos/sponsors/bakkerij.png", url: "https://...", voorbeeld: false },
```
Niveaus: `hoofdsponsor`, `gold`, `silver`, `brons`.

Andere bestanden: `club.ts` (vaste clubgegevens), `ploegen.ts` (ploegen, trainers, trainingsuren), `evenementen.ts`, `tijdlijn.ts` (100 jaar en fotogalerij), `links.ts` (externe links).

## 3. Foto's en het echte logo vervangen

- **Foto's:** zet het bestand in `public/fotos/` (bv. `a-ploeg.jpg`) en vul in het contentbestand het pad in: `foto: "/fotos/a-ploeg.jpg"`. De placeholder verdwijnt dan vanzelf. Voor de hero op de homepage, zie `app/page.tsx` (zoek `Foto: Kattenbroek`) en geef `src="/fotos/hero.jpg"` mee.
- **Logo:** vervang `public/logo.svg` door het echte logo (zelfde bestandsnaam, of pas het pad aan in `components/Logo.tsx`). Het huidige logo is een neutrale placeholder. Het favicon is `public/favicon.svg`.
- **Privacy:** foto's van (minderjarige) spelers mogen pas online met toestemming, volgens de privacyverklaring van de club en de GDPR. Deze site toont bewust geen spelerslijsten, verjaardagen of ledenlijsten.

## 4. Externe links invullen

Open `content/links.ts` en vervang `"TODO: URL invullen"` door het echte webadres (Twizzit-inschrijving, Facebook, Instagram, aftermovie, Panathonverklaring, clubreglement, privacyverklaring, jeugdbeleidsplan). Zolang er een TODO staat, toont de site een uitgeschakelde knop "Link volgt". PDF's zet je in `public/documenten/`, met als URL `/documenten/bestandsnaam.pdf`.

## 5. Het ontwerpvoorstel-label uitzetten

Neemt de club de site over?

1. Zet in `content/club.ts` `IS_VOORSTEL = false`. De strook "Ontwerpvoorstel", het label in de footer en `noindex` verdwijnen samen.
2. Pas `public/robots.txt` aan: vervang `Disallow: /` door `Allow: /`.
3. Vul in `content/club.ts` het echte webadres in bij `SITE_URL`.
4. Controleer ook de pagina `/styleguide/`: die blijft altijd `noindex`.

## 6. Publiceren via GitHub en Cloudflare Pages

1. Zet de map op GitHub (nieuwe repository, bestanden uploaden of pushen).
2. Ga naar Cloudflare, **Workers & Pages**, **Create**, **Pages**, **Connect to Git** en kies de repository.
3. Instellingen: framework preset *Next.js (Static HTML Export)*, build command `npm run build`, output directory `out`.
4. Na het bouwen staat de site op een `*.pages.dev`-adres. Een eigen domein koppel je onder *Custom domains*.
5. `public/_headers` stelt de beveiligingsheaders in. `public/robots.txt` en de `noindex`-metadata houden het voorstel uit Google.

Formulieren (contact en "Word sponsor") worden **nog niet verzonden**: ze valideren en tonen de melding "Dit formulier is nog niet gekoppeld". Hoe je ze koppelt (Formspree of Cloudflare Pages Functions) staat als `TODO backend` in `components/Formulier.tsx`.

De OpenStreetMap-kaart gebruikt bij benadering het centrum van Edegem. Controleer de coördinaten in `content/club.ts` (`kaart`). De knop "Open in OpenStreetMap" zoekt wel op het exacte adres.

## Wat de club nog moet aanleveren

- [ ] Het echte logo (SVG of PNG)
- [ ] Foto's: hero/Kattenbroek, A-ploeg, jeugdploegen, dames, 100 jaar (met toestemming voor herkenbare personen)
- [ ] Externe links: Twizzit-inschrijving, Facebook, Instagram, UEFA-aftermovie, Panathonverklaring, clubreglement, privacyverklaring, jeugdbeleidsplan (PDF)
- [ ] Teksten: over ons, visie "One Team", Panathon-toelichting, clubreglement, privacyverklaring, lidgeld en FAQ
- [ ] Ploegen: welke ploegen bestaan er (ook G-voetbal en dames?), trainers (met toestemming) en trainingsuren
- [ ] Bestuur: functies en namen (met toestemming)
- [ ] Geschiedenis: echte mijlpalen 1924–2024
- [ ] Sponsors: lijst, niveaus en logo's
- [ ] Wedstrijden, uitslagen, evenementen en nieuws
- [ ] Beslissing over formulieren (Formspree of Cloudflare) en het definitieve webadres

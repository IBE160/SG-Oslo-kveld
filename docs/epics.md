# Epics & User Stories – «To Like»

Dette dokumentet beskriver de sentrale epics og user stories i To Like-spillet.  
Strukturen følger BMAD-modellen og dekker både funksjonelle og visuelle krav.

---

## 🟦 Epic 1 – Spilloppsett (Startskjerm)

### User Stories
- Som spiller vil jeg velge antall spillere (2–6) slik at flere kan delta.
- Som spiller vil jeg kunne gi navn til spillerne slik at spillet føles personlig.
- Som spiller vil jeg velge antall kort slik at vanskelighetsgraden kan justeres.
- Som spiller vil jeg velge spillmodus (tall eller bokstaver/figurer) slik at spillet kan varieres.
- Som spiller vil jeg trykke «Start Spill!» for å starte en ny runde.

---

## 🟩 Epic 2 – Spilllogikk (Kjernemekanikk)

### User Stories
- Som spiller vil jeg kunne snu kort for å prøve å finne et par.
- Som spiller vil jeg at to kort som matches blir stående synlige.
- Som spiller vil jeg at kort som ikke matcher snur seg tilbake etter kort tid.
- Som spiller vil jeg få poeng når jeg finner et par.
- Som spiller vil jeg at spillet automatisk holder orden på turrekkefølgen.
- Som spiller vil jeg at spillet oppdager når alle parene er funnet.

---

## 🟧 Epic 3 – UI og spillopplevelse (Visuelt design)

### User Stories
- Som spiller vil jeg at kortene skal være tydelige, store nok og estetisk utformet.
- Som spiller vil jeg at spillbrettet skal tilpasse seg automatisk etter hvor mange kort vi velger.
- Som spiller vil jeg se hvem sin tur det er underveis i spillet.
- Som bruker vil jeg at forsiden skal være oversiktlig, fargerik og lett å forstå.
- Som spiller vil jeg ha en visuell effekt når jeg vinner (f.eks. gratulasjon og konfetti).

---

## 🟨 Epic 4 – Resultat og avslutning

### User Stories
- Som spiller vil jeg se hvem som vant etter at spillet er ferdig.
- Som spiller vil jeg se en poengoversikt for alle spillere.
- Som spiller vil jeg kunne starte en ny runde uten å gå tilbake til forsiden.
- Som spiller vil jeg se en modal/vinner-skjerm som tydelig markerer at spillet er avsluttet.

---

## 🟥 Epic 5 – Teknisk kvalitet og struktur

### User Stories
- Som utvikler vil jeg ha et tydelig skille mellom spilllogikk (Zustand) og visning (React-komponenter).
- Som utvikler vil jeg bruke en egen funksjon for å generere kortstokken (tall eller bokstaver).
- Som utvikler vil jeg ha en README som forklarer spillet og teknologistacken.
- Som utvikler vil jeg ha prosjektet organisert etter Next.js-standard (src/app, components, store).
- Som utvikler vil jeg ha et testmiljø tilgjengelig (Vitest / Testing Library).
- Som gruppe vil vi ha dokumentert vår arbeidsfordeling (bidrag.md).

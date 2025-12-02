# Arkitektur – «To Like»

Dette dokumentet beskriver den tekniske arkitekturen for To Like-spillet.

## 1. Overordnet arkitektur
Applikasjonen er bygget på Next.js (App Router) og består av følgende hoveddeler:

### 1.1 Presentasjonslag
- Sider og komponenter i `src/app/` og `src/components/`
- Layout, kort-komponenter, resultatvisning, startskjerm

### 1.2 Logikk / State management
- Zustand brukes til spilltilstand:
  - spillere
  - turrekkefølge
  - kortdeck
  - synlige kort
  - poengsum

### 1.3 Utilities
- Funksjoner som genererer kort-deck
- Funksjoner som sjekker om to kort matcher
- Logikk for å gå til neste spiller

### 1.4 Dataflyt
1. Bruker velger instillinger → state initialiseres  
2. Spillbrett genereres → kort legges ut  
3. Bruker gjør valg → state oppdateres  
4. UI reagerer automatisk (React + Zustand)  
5. Resultat vises når alle par er funnet  

### 1.5 Filstruktur (forenklet)
src/
├─ app/
│ ├─ page.tsx (startside)
│ ├─ game/page.tsx (spillside)
├─ components/
│ ├─ Card.tsx
│ ├─ PlayerScore.tsx
│ └─ WinnerScreen.tsx
├─ store/
│ └─ gameStore.ts
└─ utils/
└─ deckGenerator.ts

---

# ✅ 5. `epics.md`  
*(Byttes etter arkitektur → riktig rekkefølge)*

**Lim inn dette:**

```markdown
# Epics & User Stories – «To Like»

Dette dokumentet beskriver epics og tilhørende user stories for To Like-spillet.

## Epic 1 – Spilloppsett
### User Stories
- Som spiller vil jeg velge antall spillere slik at flere kan delta.
- Som spiller vil jeg velge antall kort slik at vi kan tilpasse vanskelighetsgrad.
- Som spiller vil jeg velge om vi bruker tall eller bokstaver.

## Epic 2 – Spilllogikk
### User Stories
- Som spiller vil jeg kunne snu kort for å prøve å finne et par.
- Som spiller vil jeg få poeng når jeg finner et par.
- Som spiller vil jeg se når kort ikke matcher og går tilbake.
- Som spiller vil jeg at turen automatisk går videre til neste spiller.

## Epic 3 – UI/UX
### User Stories
- Som spiller vil jeg at kortene ser tydelige og pene ut.
- Som bruker vil jeg ha et ryddig og oversiktlig spillbrett.
- Som spiller vil jeg se en vinner-skjerm når spillet er ferdig.

## Epic 4 – Resultatvisning
### User Stories
- Som spiller vil jeg se resultatlisten etter spill.
- Som spiller vil jeg vite hvem som vant.

## Epic 5 – Teknisk kvalitet
### User Stories
- Som utvikler vil jeg ha en README som forklarer spillet.
- Som utvikler vil jeg at koden ligger organisert i src/
- Som utvikler vil jeg ha testmiljø klart (Vitest)

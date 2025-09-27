# To Like med tall

Dette er et klassisk memory-spill (også kjent som "Huskespill" eller "Konsentrasjon") bygget med en moderne web-teknologistack.

## Regler

Målet med spillet er å finne alle parene med like tall.

1.  **Spillstart**: Velg antall spillere og antall brikker du vil spille med.
2.  **Spillets gang**: Spillet går i runder. Når det er din tur, klikker du på to brikker for å snu dem.
3.  **Match**: Hvis de to brikkene har samme tall, har du funnet et par! Du får ett poeng, brikkene forblir synlige, og du får en ny tur.
4.  **Ingen match**: Hvis brikkene har ulikt tall, snus de tilbake med forsiden ned etter et kort øyeblikk. Turen går deretter videre til neste spiller.
5.  **Spillets slutt**: Spillet er over når alle parene er funnet. En resultattavle viser poengsummen for hver spiller og kårer en vinner.
6.  **Nytt spill**: Du kan starte en ny runde med de samme eller nye innstillinger.

### Standard antall brikker

For å sikre en balansert opplevelse, justeres standard antall brikker basert på antall spillere:

-   **2 spillere (standard):** 30 brikker (15 par)
-   **3 spillere:** 40 brikker (20 par)
-   **4 spillere:** 50 brikker (25 par)
-   **5 spillere:** 60 brikker (30 par)
-   **6 spillere:** 70 brikker (35 par)

Logikken er at standard (15 par) økes med 5 par for hver ekstra spiller utover to. Du kan alltid overstyre dette og velge et manuelt antall brikker (partall mellom 10 og 100).

## Teknologistack

-   **Rammeverk**: Next.js (App Router)
-   **Språk**: TypeScript
-   **Styling**: Tailwind CSS
-   **Tilstandshåndtering**: Zustand
-   **Testing**: Vitest, React Testing Library

## Installasjon og kjøring

**Forutsetninger**: Node.js (v18 eller nyere) og npm.

1.  **Klone repoet (hvis aktuelt)**
    ```bash
    git clone <repo-url>
    cd tolike
    ```

2.  **Installer avhengigheter**:
    ```bash
    npm install
    ```

3.  **Start utviklingsserveren**:
    ```bash
    npm run dev
    ```

    Åpne [http://localhost:3000](http://localhost:3000) i nettleseren din.

4.  **Kjør tester**:
    ```bash
    npm run test
    ```

## Prosjektstruktur

```
tolike/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── game/         # Spill-spesifikke komponenter
│   │   │   │   ├── Board.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── GameController.tsx
│   │   │   │   ├── ResultsModal.tsx
│   │   │   │   ├── Scoreboard.tsx
│   │   │   │   └── SettingsPanel.tsx
│   │   │   └── ui/           # Generelle UI-komponenter
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── lib/
│   │   └── utils.ts        # Hjelpefunksjoner (kortstokking etc.)
│   └── store/
│       └── gameStore.ts    # Zustand store for global tilstand
├── tests/
│   └── game.test.ts        # Enhetstester for spillogikk
├── public/
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

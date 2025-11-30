# To Like – memory-spill med tall og bokstaver

Dette er et enkelt memory-spill («Huskespill») laget som eksamensprosjekt i  
**IBE160 Programmering med KI** ved Høgskolen i Molde.

Vi er ikke utdannede utviklere. Vi har brukt **KI-verktøy** til å hjelpe oss med koden  
(struktur, spilletilstand, komponenter og forslag til styling), men vi har selv:

- beskrevet hva vi ønsker at spillet skal gjøre  
- valgt og justert løsninger  
- testet spillet og finjustert opplevelsen  
- jobbet spesielt med grafikk, farger og layout  
- skrevet all tekst i README og refleksjonsrapporten

Målet vårt har vært å lage et forståelig, spillbart produkt og samtidig lære hvordan man kan bruke KI som «medutvikler» når man ikke er programmerer fra før.

---

## Hva spillet gjør

**To Like** er et digitalt memory-spill for 2+ spillere.

- Spillet kan spilles med **tall** eller **bokstaver**
- Spillerne bytter på å snu to kort
- Får du et par, får du poeng og får fortsette
- Hvis det ikke er et par, går turen videre til neste spiller
- Når alle par er funnet, viser spillet en resultattavle og kårer en vinner
- Det vises også en enkel vinner-skjerm for å gi litt ekstra «spillfølelse»

Spillet er ment å kunne spilles sammen på én skjerm, f.eks. i et klasserom eller på stua.

---

## Regler – steg for steg

1. **Spillstart**  
   På startsiden kan du:
   - velge hvor mange spillere som skal være med  
   - velge hvor mange kort dere vil spille med (må være et partall)  
   - velge om dere vil spille med **tall** eller **bokstaver**

2. **Din tur**  
   Når det er din tur:
   - klikk på ett kort for å snu det  
   - klikk på et nytt kort

3. **Hvis det er et par**  
   - de to kortene har samme verdi (samme tall eller samme bokstav)  
   - du får **ett poeng**  
   - kortene blir liggende synlige  
   - du får **en ny tur**

4. **Hvis det ikke er et par**  
   - kortene er ulike  
   - kortene snus automatisk tilbake etter et lite øyeblikk  
   - turen går videre til **neste spiller**

5. **Spillets slutt**  
   - spillet er ferdig når alle parene er funnet  
   - en resultattavle viser poengene til alle spillerne  
   - spillet kårer en vinner  
   - en vinner-visning gir en liten «feiring» til slutt

6. **Nytt spill**  
   Etter en runde kan dere:
   - starte et nytt spill med samme innstillinger, eller  
   - velge nytt antall kort / spillere / modus

---

## Antall kort

- Spillet krever alltid et **partall** antall kort (2, 4, 6, …) fordi hvert kort må ha en tvilling  
- For hvert par lages det to like kort (tall eller bokstav)  
- Koden støtter fleksibelt antall kort  
- I praksis har vi testet mest med **små brett** (for eksempel 12–16 kort), fordi:
  - brettet ser ryddig og oversiktlig ut  
  - det er enklere å følge med for alle på samme skjerm  

---

## Teknologistack

Spillet er bygget som en moderne webapplikasjon:

- **Rammeverk:** Next.js (App Router)  
- **Språk:** TypeScript  
- **Styling:** Tailwind CSS  
- **Tilstandshåndtering:** Zustand  
- **Testing:** Vitest + React Testing Library  
- **Bygg/verktøy:** Node.js, npm, Vite  

Dette passer godt til emnet IBE160, der fokuset er **KI-assistert programmering** fremfor at studentene skal mestre all syntaks fra før.

---

## Installasjon og kjøring

**Forutsetninger:**  
Du trenger **Node.js v18+** og **npm** installert på maskinen.

1. **Klon repoet**
   ```bash
   git clone https://github.com/IBE160/SG-Oslo-kveld.git
   cd SG-Oslo-kveld

2. Installer avhengigheter
    npm install

3. Start utviklingsserver
    npm run dev

4. Åpne spillet i nettleser
    http://localhost:3000       

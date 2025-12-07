# PRD – Product Requirements Document for «To Like»

## 1. Introduksjon
«To Like» er et digitalt memory-spill hvor flere spillere konkurrerer om å finne flest par.
Spillet utvikles som et studentprosjekt i IBE160 Programmering med KI.

## 2. Problem
Memory-spill er en enkel og kjent spillkategori som passer godt som et KI-assistert
prosjekt for studenter uten lang programmeringserfaring.

## 3. Mål
- Lage et fungerende, spillbart memory-spill
- Ha et ryddig UI og visuell stil
- Lære og dokumentere BMAD-prosessen
- Vise KI-bruk på en ansvarlig måte

## 4. Funksjonelle krav
### 4.1 Spilloppsett
- Velg antall spillere (min 2)
- Velg antall kort (må være et partall)
- Velg modus:
  - tall
  - bokstaver

### 4.2 Spillelogikk
- Spillere snur to kort per tur
- Par gir poeng + ny tur
- Ulike kort snus tilbake og tur går videre
- Når alle par er funnet → resultattavle + vinner

### 4.3 UI/UX krav
- Kort skal ha tydelig grafikk
- Enkelt, ryddig brettoppsett
- Farger som gjør kortene lett å se
- Vinner-visning med tydelig sluttstatus

## 5. Ikke-funksjonelle krav
- Skal kunne kjøres lokalt med `npm run dev`
- Bruke moderne webteknologi: Next.js, TypeScript, Zustand
- Kode skal ligge i `src/`

## 6. Teknologi
- Next.js
- TypeScript
- Zustand
- Tailwind CSS
- KI-verktøy: ChatGPT & Gemini CLI (planlegging + støtte)

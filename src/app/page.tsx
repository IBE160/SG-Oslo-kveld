"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { GameMode } from "@/lib/deck";
import { useGameStore } from "@/store/gameStore";

export default function HomePage() {
  const router = useRouter();
  const [players, setPlayers] = useState<number>(2);
  const [cards, setCards] = useState<number>(30);
  const [names, setNames] = useState<string[]>(["Spiller 1", "Spiller 2"]);
  const gameMode = useGameStore((state) => state.gameMode);
  const setGameMode = useGameStore((state) => state.setGameMode);

  // Hold navn-array i sync med antall spillere
  useEffect(() => {
    setNames((prev) => {
      const next = [...prev];
      if (players > next.length) {
        for (let i = next.length; i < players; i++) next.push(`Spiller ${i + 1}`);
      } else if (players < next.length) {
        next.length = players;
      }
      return next;
    });
  }, [players]);

  function toInt(v: string, fb: number) {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : fb;
  }

  function startGame(e: React.FormEvent) {
    e.preventDefault();
    const p = Math.min(6, Math.max(2, players | 0));
    const maxCards = gameMode === "letters" ? 58 : 200;
    const even = Math.min(maxCards, Math.max(2, Math.trunc((cards | 0) / 2) * 2));

    const qs = new URLSearchParams({
      players: String(p),
      cards: String(even),
      names: names.map(encodeURIComponent).join(","),
      mode: gameMode,
    });
    router.push(`/game?${qs.toString()}`);
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animerte gradient-bakgrunn */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 animate-gradient" />
      {/* Myke, flytende prikker */}
      <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl float-slow" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-48 w-48 rounded-full bg-white/10 blur-3xl float-slow" style={{ animationDelay: "1.2s" }} />

      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center p-6">
        <div className="glass w-full rounded-2xl p-6 shadow-2xl md:p-8">
          {/* Tittel med gradient-tekst */}
          <h1 className="mb-6 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
            To Like <span className="opacity-80">({gameMode === "numbers" ? "Tall" : "Bokstaver"})</span>
          </h1>

          <form onSubmit={startGame} className="grid gap-5">
            {/* Modus-velger */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGameMode("numbers")}
                className={`rounded-lg py-2 text-center font-semibold text-white transition ${
                  gameMode === "numbers"
                    ? "bg-white/30 ring-2 ring-white/50"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                Tall
              </button>
              <button
                type="button"
                onClick={() => setGameMode("letters")}
                className={`rounded-lg py-2 text-center font-semibold text-white transition ${
                  gameMode === "letters"
                    ? "bg-white/30 ring-2 ring-white/50"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                Bokstaver
              </button>
            </div>

            {/* Antall spillere */}
            <label className="grid gap-2">
              <span className="text-sm font-medium text-white/90">Antall spillere (2–6):</span>
              <input
                type="number"
                min={2}
                max={6}
                value={players}
                onChange={(e) => setPlayers(toInt(e.target.value, 2))}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none transition focus:border-white/40"
                placeholder="2"
              />
            </label>

            {/* Navn på spillere */}
            <div className="grid gap-3">
              <span className="text-sm font-medium text-white/90">Navn på spillere:</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: players }).map((_, i) => (
                  <input
                    key={i}
                    value={names[i] ?? ""}
                    onChange={(e) =>
                      setNames((prev) => {
                        const next = [...prev];
                        next[i] = e.target.value;
                        return next;
                      })
                    }
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none transition focus:border-white/40"
                    placeholder={`Spiller ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Antall kort */}
            <label className="grid gap-2">
              <span className="text-sm font-medium text-white/90">
                Antall kort ({gameMode === "letters" ? "2–58" : "2–200"}, partall):
              </span>
              <input
                type="number"
                min={2}
                max={gameMode === "letters" ? 58 : 200}
                step={2}
                value={cards}
                onChange={(e) => setCards(toInt(e.target.value, 30))}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none transition focus:border-white/40"
                placeholder="30"
              />
              <small className="text-white/70">
                Velg hvor mange kort som skal brukes i spillet.
              </small>
            </label>

            {/* Start-knapp */}
            <div className="mt-2">
              <button
                type="submit"
                className="w-full rounded-xl border border-white/20 bg-white/15 px-4 py-3 font-semibold text-white shadow-lg backdrop-blur transition hover:scale-[1.01] hover:bg-white/20 active:scale-[0.995]"
              >
                Start spill
              </button>
            </div>
          </form>

          {/* Liten footer-tip */}
          <p className="mt-4 text-center text-xs text-white/70">
            Tips: 30 kort = par av 1–15. Du kan endre både antall spillere, navn og kort.
          </p>
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultsModal from "@/components/ResultsModal";
import WinnerAnnouncement from "@/components/WinnerAnnouncement";
import { useGameStore } from "@/store/gameStore";
import type { GameMode } from "@/lib/deck";

function toInt(v: string | null, fallback: number) {
  if (v == null) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

export default function GamePage() {
  const router = useRouter();
  const search = useSearchParams();

  const {
    deck,
    players,
    currentPlayer,
    isBusy,
    winner,
    gameStarted,
    gameMode,
    startGame,
    flipCard,
    resetGame,
  } = useGameStore();

  // ----- URL-parametre -----
  const playersParam = toInt(search.get("players"), 2);
  const cardsParam = toInt(search.get("cards"), 30);
  const namesParam = search.get("names") ?? "";
  const modeParam = (search.get("mode") as GameMode) || "numbers";

  const numPlayers = Math.min(6, Math.max(2, playersParam));
  const totalCards = Math.max(2, Math.trunc(cardsParam / 2) * 2);
  const playerNames = namesParam ? namesParam.split(",").map(decodeURIComponent) : [];

  const rawQuery = search.toString(); // debug

  // ----- State -----
  const [gameOver, setGameOver] = useState(false);
  const [showBigWinner, setShowBigWinner] = useState(false);

  // ----- Dynamisk grid -----
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cols, setCols] = useState(6);
  const [cardSize, setCardSize] = useState(80);
  const GAP = 10;

  function computeBestGrid(n: number, W: number, H: number) {
    if (n === 0 || W <= 0 || H <= 0) return { cols: 1, size: 40 };
    let best = { cols: 1, size: 0 };
    for (let c = 1; c <= n; c++) {
      const rows = Math.ceil(n / c);
      const sizeByW = (W - GAP * (c - 1)) / c;
      const sizeByH = (H - GAP * (rows - 1)) / rows;
      const size = Math.floor(Math.min(sizeByW, sizeByH));
      if (size > best.size) best = { cols: c, size };
    }
    return { cols: Math.max(1, best.cols), size: Math.max(36, best.size) };
  }

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const { cols, size } = computeBestGrid(deck.length, rect.width, rect.height);
      setCols(cols);
      setCardSize(size);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [deck.length]);

  // ----- Init / restart når valg endres -----
  useEffect(() => {
    startGame(numPlayers, modeParam);
  }, [numPlayers, totalCards, namesParam, modeParam, startGame]);

  // ----- Feiring ved match -----
  async function triggerCelebration() {
    const { default: confetti } = await import("canvas-confetti");
    confetti({ particleCount: 80, spread: 70, origin: { x: 0.5, y: 0.5 } });
  }

  // Valgfri lang winner-animasjon (du hadde denne – behold hvis ønskelig)
  async function runWinnerAnimation() {
    const { default: confetti } = await import("canvas-confetti");
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults: any = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  // Når gameOver blir true → vis stort banner hvis entydig vinner
  useEffect(() => {
    if (!winner) return;
    const maxScore = Math.max(...players.map((p) => p.score));
    const currentWinners = players.filter((p) => p.score === maxScore && p.score > 0);
    if (currentWinners.length === 1) {
      runWinnerAnimation();
      setShowBigWinner(true);
    }
    setGameOver(true);
  }, [winner, players]);

  function handleFlip(id: string) {
    if (isBusy) return;
    flipCard(id);
  }

  function handleReset() {
    resetGame();
    setGameOver(false);
    setShowBigWinner(false);
  }

  function goHome() {
    router.push("/");
  }

  const maxScore = Math.max(...players.map((p) => p.score));
  const winners = players.filter((p) => p.score === maxScore && maxScore > 0);

  return (
    <div style={{ padding: 16, height: "100vh", boxSizing: "border-box" }}>
      {/* Topp-linje */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <h1 style={{ margin: 0 }}>To Like ({gameMode === "numbers" ? "Tall" : "Bokstaver"})</h1>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={handleReset}
            style={{
              padding: "8px 14px",
              border: "1px solid #444",
              background: "#1f2937",
              color: "#fff",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Ny runde
          </button>
          <button
            onClick={goHome}
            style={{
              padding: "8px 14px",
              border: "1px solid #444",
              background: "#374151",
              color: "#fff",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Til start
          </button>
        </div>
      </div>

      {/* Poengtavle */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {players.map((p, idx) => (
          <div
            key={p.id}
            style={{
              padding: "6px 10px",
              border: "1px solid #ddd",
              borderRadius: 8,
              background: p.id === currentPlayer ? "red" : "#f3f4f6",
              fontWeight: p.id === currentPlayer ? 700 : 500,
              color: p.id === currentPlayer ? "black" : "inherit",
            }}
          >
            {playerNames[idx] || `Spiller ${p.id}`}: {p.score}
            {p.id === currentPlayer ? " ← din tur" : ""}
          </div>
        ))}
        <div style={{ marginLeft: "auto", opacity: 0.8 }}>
          Modus: {gameMode === "numbers" ? "Tall" : "Bokstaver"} • Spillere: {numPlayers} • Kort: {totalCards}
        </div>
      </div>

      {/* debug-linje (kan fjernes) */}
      <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>
        debug: ?{rawQuery} → players={numPlayers}, cards={totalCards}
      </div>

      {/* Brett */}
      <div
        ref={containerRef}
        style={{
          height: "calc(100vh - 160px)",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${cardSize}px)`,
            gridAutoRows: `${cardSize}px`,
            gap: `${GAP}px`,
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          {deck.map((c) => {
            const faceUp = c.isFaceUp || c.isMatched;
            const clickable = !isBusy && !c.isMatched && !c.isFaceUp;

            return (
              <div
                key={c.id}
                onClick={() => (clickable ? handleFlip(c.id) : undefined)}
                style={{
                  width: cardSize,
                  height: cardSize,
                  border: "1px solid #999",
                  display: "grid",
                  placeItems: "center",
                  background: faceUp ? "#ffffff" : "#2b6cb0",
                  color: faceUp ? "#111" : "#fff",
                  fontWeight: 900,
                  fontSize: `${Math.floor(cardSize * 0.55)}px`,
                  lineHeight: 1,
                  cursor: clickable ? "pointer" : "default",
                  opacity: c.isMatched ? 0.6 : 1,
                }}
                title={c.isMatched ? "Matchet" : faceUp ? String(c.value) : "?"}
              >
                {faceUp ? c.value : "?"}
              </div>
            );
          })}
        </div>
      </div>

      {/* Vinner-annonsering (stor) */}
      {showBigWinner && winners.length === 1 && (
        <WinnerAnnouncement
          winnerName={playerNames[winners[0].id - 1] || `Spiller ${winners[0].id}`}
          onComplete={() => setShowBigWinner(false)}
        />
      )}

      {/* Resultatmodal etter stor banner */}
      {gameOver && !showBigWinner && winners.length === 1 && (
        <ResultsModal
          winnerName={playerNames[winners[0].id - 1] || `Spiller ${winners[0].id}`}
          onClose={handleReset}
        />
      )}

      {/* Uavgjort / ingen poeng */}
      {gameOver && !showBigWinner && winners.length !== 1 && (
        <div
          style={{
            marginTop: 12,
            padding: 10,
            background: "#fffbeb",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <b>{maxScore > 0 ? "Uavgjort!" : "Ingen poeng!"}</b>
        </div>
      )}
    </div>
  );
}

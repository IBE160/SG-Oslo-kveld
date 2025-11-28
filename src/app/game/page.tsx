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
    gameMode,
    startGame,
    flipCard,
    resetGame,
  } = useGameStore();

  // -------- URL-parametre --------
  const playersParam = toInt(search.get("players"), 2);
  const cardsParam = toInt(search.get("cards"), 30);
  const namesParam = search.get("names") ?? "";
  const modeParam = (search.get("mode") as GameMode) || "numbers";

  const numPlayers = Math.min(6, Math.max(2, playersParam));
  const totalCards = Math.max(2, Math.trunc(cardsParam / 2) * 2);
  const playerNames = namesParam ? namesParam.split(",").map(decodeURIComponent) : [];

  const rawQuery = search.toString();

  // -------- State --------
  const [gameOver, setGameOver] = useState(false);
  const [showBigWinner, setShowBigWinner] = useState(false);

  // -------- Dynamisk grid --------
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

  // -------- Init / restart --------
  useEffect(() => {
    startGame(numPlayers, modeParam, totalCards);
  }, [numPlayers, totalCards, namesParam, modeParam, startGame]);

  // -------- Winner animation --------
  async function runWinnerAnimation() {
    const { default: confetti } = await import("canvas-confetti");
    confetti({ particleCount: 100, spread: 70, origin: { x: 0.5, y: 0.5 } });
  }

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

      {/* ---------- Topplinje ---------- */}
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

      {/* ---------- Poengtavle ---------- */}
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

      {/* ---------- Brett ---------- */}
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

            // ---------- INNHOLD PÅ KORT ----------
            const displayContent = faceUp ? (
              gameMode === "numbers" ? (
                /* 🔢 TALLMODUS */
                <span
                  style={{
                    fontSize: Math.floor(cardSize * 0.55),
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {c.value}
                </span>
              ) : (
                /* 🔤 BOKSTAVMODUS */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    lineHeight: 1,
                  }}
                >
                  {c.name && (
                    <span
                      style={{
                        fontSize: Math.floor(cardSize * 0.22),
                        fontWeight: 700,
                      }}
                    >
                      {c.name}
                    </span>
                  )}
                  {c.emoji && (
                    <span style={{ fontSize: cardSize * 0.48 }}>
                      {c.emoji}
                    </span>
                  )}
                </div>
              )
            ) : (
              /* BAKSIDE */
              <span
                style={{
                  fontSize: cardSize * 0.6,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                ?
              </span>
            );

            return (
              <div
                key={c.id}
                onClick={() =>
                  !isBusy && !c.isMatched && !c.isFaceUp ? handleFlip(c.id) : undefined
                }
                style={{
                  width: cardSize,
                  height: cardSize,
                  border: "1px solid #999",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: faceUp ? "#ffffff" : "#2b6cb0",
                  color: faceUp ? "#111" : "#fff",
                  cursor: !c.isMatched && !c.isFaceUp ? "pointer" : "default",
                  opacity: c.isMatched ? 0.6 : 1,
                }}
              >
                {displayContent}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- Winner Announcement ---------- */}
      {showBigWinner && winners.length === 1 && (
        <WinnerAnnouncement
          winnerName={playerNames[winners[0].id - 1] || `Spiller ${winners[0].id}`}
          onComplete={() => setShowBigWinner(false)}
        />
      )}

      {/* ---------- Resultatmodal ---------- */}
      {gameOver && !showBigWinner && winners.length === 1 && (
        <ResultsModal
          winnerName={playerNames[winners[0].id - 1] || `Spiller ${winners[0].id}`}
          onClose={handleReset}
        />
      )}

      {/* ---------- Uavgjort ---------- */}
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

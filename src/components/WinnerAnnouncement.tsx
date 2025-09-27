"use client";

import React, { useEffect } from "react";

type Props = {
  winnerName: string;
  onComplete?: () => void; // kalles etter animasjon (3s)
};

export default function WinnerAnnouncement({ winnerName, onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Vinner"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#fff",
          padding: "24px 32px",
          borderRadius: 16,
          background: "rgba(17,24,39,0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
          transform: "scale(1)",
          animation: "winnerPop 800ms ease-out",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: 1 }}>
          🎉 Gratulerer! 🎉
        </div>
        <div style={{ marginTop: 8, fontSize: 36, fontWeight: 800 }}>
          {winnerName}
        </div>
      </div>

      {/* Keyframes inline (enkelt) */}
      <style>{`
        @keyframes winnerPop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

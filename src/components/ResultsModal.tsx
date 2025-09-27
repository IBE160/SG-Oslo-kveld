"use client";

import React from "react";

type Props = {
  winnerName: string;
  onClose: () => void;
};

export default function ResultsModal({ winnerName, onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resultat"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "grid",
        placeItems: "center",
        zIndex: 900,
      }}
    >
      <div
        style={{
          width: "min(92vw, 520px)",
          background: "#111827",
          color: "#fff",
          border: "1px solid #374151",
          borderRadius: 12,
          padding: 20,
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 28, margin: "0 0 8px" }}>Resultat</h2>
        <p style={{ margin: "0 0 16px", fontSize: 18 }}>
          Vinner: <b>{winnerName}</b>
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "10px 16px",
            border: "1px solid #4B5563",
            background: "#1F2937",
            color: "#fff",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Ny runde
        </button>
      </div>
    </div>
  );
}

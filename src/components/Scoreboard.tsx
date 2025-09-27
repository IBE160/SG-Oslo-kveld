"use client";

import React from "react";

export interface Player {
  id: number;
  score: number;
}

interface Props {
  players: Player[];
}

export default function Scoreboard({ players }: Props) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-4">
      <h2 className="text-xl font-semibold mb-3">Poengtavle</h2>
      <ul className="space-y-2">
        {sorted.map((p, i) => (
          <li
            key={p.id}
            className="flex items-center justify-between rounded-md bg-neutral-700 px-3 py-2"
          >
            <span>
              {i + 1}. Spiller {p.id}
            </span>
            <span className="font-bold">{p.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

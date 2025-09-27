"use client";

import React from "react";

interface Props {
  currentPlayerName: string;
}

export default function TurnIndicator({ currentPlayerName }: Props) {
  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-4">
      <p className="text-lg">
        Tur: <span className="font-semibold text-yellow-300">{currentPlayerName}</span>
      </p>
    </div>
  );
}

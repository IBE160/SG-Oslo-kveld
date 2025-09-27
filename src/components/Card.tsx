"use client";

import * as React from "react";

type CardProps = {
  id: string;
  value: number;
  isFaceUp: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
};

export default function Card({
  id,
  value,
  isFaceUp,
  isMatched,
  onClick,
  disabled,
}: CardProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      onClick();
    }
  }

  return (
    <div
      id={`card-${id}`}
      className="card-square relative w-full h-full perspective-1000"
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Kort med verdi ${isFaceUp || isMatched ? value : "ukjent"}`}
      aria-pressed={isFaceUp || isMatched}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{ borderRadius: 0 }}
    >
      {/* Flipp-container */}
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-style-3d shadow
          ${(isFaceUp || isMatched) ? "rotate-y-180" : ""}
          ${isMatched ? " match-pulse match-glow" : ""}
          ${disabled ? " cursor-not-allowed opacity-70" : " cursor-pointer"}`}
        style={{ borderRadius: 0 }}
      >
        {/* Bakside (blå kort med hvit firkant) */}
        <div
          className="absolute inset-0 backface-hidden bg-blue-600 flex items-center justify-center"
          style={{ borderRadius: 0 }}
        >
          <div className="w-1/3 aspect-square bg-white" />
        </div>

        {/* Fremside (tallet) */}
        <div
          className="absolute inset-0 backface-hidden bg-white flex items-center justify-center text-neutral-900 text-4xl font-extrabold rotate-y-180 select-none border border-neutral-200"
          style={{ borderRadius: 0 }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

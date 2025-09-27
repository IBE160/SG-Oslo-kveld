"use client";

import * as React from "react";
import Card from "@/components/Card";

export type UICard = {
  id: string;
  value: number;
  isFaceUp: boolean;
  isMatched: boolean;
};

type BoardProps = {
  deck: UICard[];
  onFlip: (id: string) => void;
  isBusy: boolean;
};

export default function Board({ deck, onFlip, isBusy }: BoardProps) {
  return (
    <div
      className="grid gap-4 justify-center"
      style={{
        gridTemplateColumns: "repeat(auto-fill, 5cm)",
        gridAutoRows: "5cm",
      }}
    >
      {deck.map((c) => (
        <div key={c.id} style={{ width: "5cm", height: "5cm" }}>
          <Card
            id={c.id}
            value={c.value}
            isFaceUp={c.isFaceUp}
            isMatched={c.isMatched}
            onClick={() => onFlip(c.id)}
            disabled={isBusy || c.isMatched}
          />
        </div>
      ))}
    </div>
  );
}

export type UICard = {
  id: string;
  value: number;
  isFaceUp: boolean;
  isMatched: boolean;
};

// Lager en stokket kortstokk
export function generateDeck(totalCards: number = 30): UICard[] {
  if (totalCards % 2 !== 0) {
    throw new Error("Total number of cards must be an even number.");
  }
  const numPairs = totalCards / 2;
  const values = Array.from({ length: numPairs }, (_, i) => i + 1);
  const pairs: UICard[] = values.flatMap((v) => [
    { id: `a-${v}`, value: v, isFaceUp: false, isMatched: false },
    { id: `b-${v}`, value: v, isFaceUp: false, isMatched: false },
  ]);

  // Shuffle med Fisher-Yates
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  return pairs;
}

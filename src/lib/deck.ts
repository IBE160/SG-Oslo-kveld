export type Card = {
  id: string;
  value: number | string;
  isFaceUp: boolean;
  isMatched: boolean;
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateNumberDeck(totalCards: number): Card[] {
  const numPairs = totalCards / 2;
  const values = Array.from({ length: numPairs }, (_, i) => i + 1);
  const pairs: Card[] = values.flatMap((v) => [
    { id: `a-${v}`, value: v, isFaceUp: false, isMatched: false },
    { id: `b-${v}`, value: v, isFaceUp: false, isMatched: false },
  ]);
  return shuffle(pairs);
}

function generateLetterDeck(totalCards: number): Card[] {
  const numPairs = totalCards / 2;
  const availableLetters = shuffle(LETTERS);
  const values = availableLetters.slice(0, numPairs);
  const pairs: Card[] = values.flatMap((v) => [
    { id: `a-${v}`, value: v, isFaceUp: false, isMatched: false },
    { id: `b-${v}`, value: v, isFaceUp: false, isMatched: false },
  ]);
  return shuffle(pairs);
}

export type GameMode = "numbers" | "letters";

export function generateDeck(
  totalCards: number = 30,
  mode: GameMode = "numbers"
): Card[] {
  if (totalCards % 2 !== 0) {
    throw new Error("Total number of cards must be an even number.");
  }

  if (mode === "letters") {
    return generateLetterDeck(totalCards);
  }
  return generateNumberDeck(totalCards);
}

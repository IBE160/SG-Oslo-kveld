export type Card = {
  id: string;
  value: string | number;
  emoji?: string;
  name?: string;
  isFaceUp: boolean;
  isMatched: boolean;
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");

export const LETTER_DATA: Record<string, { emoji: string; name: string }> = {
  A: { emoji: "🛷", name: "Akebrett" },
  B: { emoji: "🐻", name: "Bjørn" },
  C: { emoji: "🐒", name: "Chimpanse" },
  D: { emoji: "🐬", name: "Delfin" },
  E: { emoji: "🦌", name: "Elg" },
  F: { emoji: "🐸", name: "Frosk" },
  G: { emoji: "🦒", name: "Giraff" },
  H: { emoji: "🐴", name: "Hest" },
  I: { emoji: "🍦", name: "Iskrem" },
  J: { emoji: "🐺", name: "Jerv" },
  K: { emoji: "🦘", name: "Kenguru" },
  L: { emoji: "🦁", name: "Løve" },
  M: { emoji: "🐭", name: "Mus" },
  N: { emoji: "🌌", name: "Nordlys" },
  O: { emoji: "🦦", name: "Oter" },
  P: { emoji: "🐧", name: "Pingvin" },
  Q: { emoji: "🐄", name: "Q" },     
  R: { emoji: "🦊", name: "Rev" },
  S: { emoji: "🐍", name: "Slange" },
  T: { emoji: "🐯", name: "Tiger" },
  U: { emoji: "🦉", name: "Ugle" },
  V: { emoji: "🐝", name: "Veps" },
  W: { emoji: "🌊", name: "Wave" },
  X: { emoji: "🦸", name: "X-men" },
  Y: { emoji: "🥛", name: "Yoghurt" },
  Z: { emoji: "🦓", name: "Zebra" },
  Æ: { emoji: "🦆", name: "Ærfugl" },
  Ø: { emoji: "🐟", name: "Ørret" },
  Å: { emoji: "🐍", name: "Ål" },
};


// Shuffle
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Number cards
function generateNumberDeck(totalCards: number): Card[] {
  const numPairs = totalCards / 2;
  const values = Array.from({ length: numPairs }, (_, i) => i + 1);
  const pairs: Card[] = values.flatMap((v) => [
    { id: `a-${v}`, value: v, isFaceUp: false, isMatched: false },
    { id: `b-${v}`, value: v, isFaceUp: false, isMatched: false },
  ]);
  return shuffle(pairs);
}

// Letter cards
function generateLetterDeck(totalCards: number): Card[] {
  const numPairs = totalCards / 2;
  const letters = shuffle(LETTERS).slice(0, numPairs);

  const pairs: Card[] = letters.flatMap((v) => {
    const { emoji, name } = LETTER_DATA[v];
    return [
      {
        id: `a-${v}`,
        value: v,
        emoji,
        name,
        isFaceUp: false,
        isMatched: false,
      },
      {
        id: `b-${v}`,
        value: v,
        emoji,
        name,
        isFaceUp: false,
        isMatched: false,
      },
    ];
  });

  return shuffle(pairs);
}

export type GameMode = "numbers" | "letters";

export function generateDeck(
  totalCards: number = 30,
  mode: GameMode = "numbers"
): Card[] {
  if (totalCards % 2 !== 0) {
    throw new Error("Total number of cards must be even.");
  }

  return mode === "letters"
    ? generateLetterDeck(totalCards)
    : generateNumberDeck(totalCards);
}

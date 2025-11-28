
import Card from './Card';

// TODO: Bytt ut denne demodataen med data fra din Zustand store.
// Eksempel: const cards = useGameStore(state => state.cards);
const exampleCards = [
  { id: 1, value: 8, isRevealed: false, isMatched: false, isMismatch: false },
  { id: 2, value: 4, isRevealed: true, isMatched: false, isMismatch: false },
  { id: 3, value: 5, isRevealed: true, isMatched: false, isMismatch: true }, // Viser 'mismatch'
  { id: 4, value: 2, isRevealed: false, isMatched: true, isMismatch: false },  // Viser 'matched'
  { id: 5, value: 6, isRevealed: false, isMatched: false, isMismatch: false },
  { id: 6, value: 2, isRevealed: false, isMatched: true, isMismatch: false },  // Viser 'matched'
  { id: 7, value: 8, isRevealed: false, isMatched: false, isMismatch: false },
  { id: 8, value: 6, isRevealed: false, isMatched: false, isMismatch: false },
];

export default function GameBoard() {
  // TODO: Hent 'cards' fra din state manager (Zustand) istedenfor.
  const cards = exampleCards; 

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {cards.map(card => (
        <Card
          key={card.id}
          value={card.value}
          isRevealed={card.isRevealed}
          isMatched={card.isMatched}
          isMismatch={card.isMismatch}
          onClick={() => { 
            /* TODO: Koble til din spill-logikk her.
               Eksempel: handleCardClick(card.id) 
            */
            console.log(`Card ${card.id} clicked!`);
          }}
        />
      ))}
    </div>
  );
}

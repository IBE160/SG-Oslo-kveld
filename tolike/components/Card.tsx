
import clsx from 'clsx';

interface CardProps {
  value: number;
  isRevealed: boolean;
  isMatched: boolean;
  isMismatch: boolean;
  onClick: () => void;
}

export default function Card({ value, isRevealed, isMatched, isMismatch, onClick }: CardProps) {
  const isVisible = isRevealed || isMatched;

  const cardClasses = clsx(
    'relative w-full aspect-square rounded-lg flex items-center justify-center font-bold text-4xl sm:text-5xl transition-all duration-300 cursor-pointer',
    {
      // Lukket kort
      'bg-slate-800 border-2 border-blue-500/50 hover:scale-105 hover:border-neon-blue': !isVisible,
      
      // Åpent kort (ikke matchet)
      'bg-teal-600/80 border-2 border-teal-400 shadow-neon-glow-green animate-card-pop': isRevealed && !isMatched,
      
      // Matchet kort
      'bg-teal-500/40 border-2 border-teal-400/50 text-teal-300/80 cursor-not-allowed animate-card-pulse': isMatched,
      
      // Feilmatch-animasjon
      'animate-card-shake': isMismatch,
    }
  );

  return (
    <button 
      onClick={onClick} 
      className={cardClasses} 
      disabled={isRevealed || isMatched}
    >
      {isVisible ? (
        <span className={clsx({ 'text-shadow-neon-green': isMatched })}>
          {value}
        </span>
      ) : (
        <span className="text-blue-300/80">?</span>
      )}
    </button>
  );
}


// Bruker alias, som er standard i nyere Next.js-prosjekter.
// Alternativ: import Game from '../../components/Game';
import Game from '@/components/Game';

export default function NeonGamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-dark-bg-start via-dark-bg-mid to-dark-bg-end text-white">
      
      <div className="text-center mb-8">
        <h1 className="text-6xl sm:text-8xl font-bold">
          <span className="text-neon-blue text-shadow-neon-blue">to</span>
          <span className="text-neon-pink text-shadow-neon-pink">like</span>
        </h1>
        <p className="text-slate-300 mt-2">
          Oppgradert med animasjoner og spilljuice ✨
        </p>
      </div>

      <Game />

    </main>
  );
}

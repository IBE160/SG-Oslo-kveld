
"use client";

import { useState } from 'react';
import GameBoard from './GameBoard';
import {clsx} from "clsx";

const initialPlayers = [
  { id: 1, name: 'Spiller 1', score: 0 },
  { id: 2, name: 'Spiller 2', score: 3 }, // Eksempelscore
];

export default function Game() {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [scoreKey, setScoreKey] = useState(0);

  const handleRestart = () => {
    // TODO: Kall din eksisterende restart-logikk fra Zustand store.
    console.log("Restarting game...");
  };

  // Eksempel på funksjon for å gi poeng (denne vil du fjerne senere)
  const handleAddScore = (playerId: number) => {
    setPlayers(prev => 
      prev.map(p => p.id === playerId ? { ...p, score: p.score + 1 } : p)
    );
    setScoreKey(prev => prev + 1); // Endre nøkkel for å trigge animasjon
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Scoreboard og kontroller */}
      <div className="flex justify-between items-center bg-black/30 p-4 rounded-t-lg border-b-2 border-neon-blue/50">
        <div className="flex gap-6">
          {players.map(player => (
            <div key={player.id} className={clsx('p-2 rounded-lg transition-all', { 'bg-neon-blue/20': currentPlayerId === player.id })}>
              <span className="text-slate-400 text-sm">{player.name}</span>
              <div key={`${player.id}-${scoreKey}`} className={clsx('text-2xl font-bold', { 'animate-score-pop': currentPlayerId === player.id })}>
                {player.score}
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={handleRestart}
          className="bg-neon-pink hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/50"
        >
          Restart
        </button>
      </div>

      {/* Spillbrett-container med neon-ramme */}
      <div className="bg-black/30 p-4 sm:p-6 rounded-b-lg shadow-neon-glow-blue">
        <GameBoard />
      </div>
    </div>
  );
}

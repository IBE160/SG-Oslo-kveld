"use client";

import { create } from "zustand";
import { generateDeck, Card, GameMode } from "@/lib/deck";

export type Player = {
  id: number;
  score: number;
};

type GameState = {
  deck: Card[];
  players: Player[];
  currentPlayer: number;
  flippedCards: Card[];
  isBusy: boolean;
  winner: Player | null;
  gameStarted: boolean;
  gameMode: GameMode;

  setGameMode: (mode: GameMode) => void;
  startGame: (playerCount: number, gameMode: GameMode) => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  deck: [],
  players: [],
  currentPlayer: 1,
  flippedCards: [],
  isBusy: false,
  winner: null,
  gameStarted: false,
  gameMode: "numbers",

  setGameMode: (mode) => set({ gameMode: mode }),

  startGame: (playerCount, gameMode) => {
    const players = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      score: 0,
    }));
    set({
      deck: generateDeck(30, gameMode),
      players,
      currentPlayer: 1,
      flippedCards: [],
      isBusy: false,
      winner: null,
      gameStarted: true,
      gameMode,
    });
  },

  flipCard: (cardId) => {
    const { deck, flippedCards, isBusy } = get();
    if (isBusy) return;

    const card = deck.find((c) => c.id === cardId);
    if (!card || card.isFaceUp) return;

    const newDeck = deck.map((c) =>
      c.id === cardId ? { ...c, isFaceUp: true } : c
    );

    set({ deck: newDeck, flippedCards: [...flippedCards, card] });

    if (get().flippedCards.length === 2) {
      set({ isBusy: true });
      setTimeout(() => {
        const { flippedCards, deck, players, currentPlayer } = get();
        const [c1, c2] = flippedCards;

        if (c1.value === c2.value) {
          const newDeck = deck.map((c) =>
            c.id === c1.id || c.id === c2.id ? { ...c, isMatched: true } : c
          );
          const newPlayers = players.map((p) =>
            p.id === currentPlayer ? { ...p, score: p.score + 1 } : p
          );
          set({ deck: newDeck, players: newPlayers });
        } else {
          const newDeck = deck.map((c) =>
            c.id === c1.id || c.id === c2.id ? { ...c, isFaceUp: false } : c
          );
          set({
            deck: newDeck,
            currentPlayer: (currentPlayer % players.length) + 1,
          });
        }

        const allMatched = get().deck.every((c) => c.isMatched);
        if (allMatched) {
          const winner = get().players.reduce((a, b) => (a.score > b.score ? a : b));
          set({ winner });
        }

        set({
          flippedCards: [],
          isBusy: false,
        });
      }, 1000);
    }
  },

  resetGame: () => {
    const { gameMode } = get();
    set({
      deck: generateDeck(30, gameMode),
      players: get().players.map((p) => ({ ...p, score: 0 })),
      currentPlayer: 1,
      flippedCards: [],
      isBusy: false,
      winner: null,
    });
  },
}));

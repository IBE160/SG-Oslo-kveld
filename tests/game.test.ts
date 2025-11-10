import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../src/store/gameStore';
import { generateDeck } from '../src/lib/deck';

// Reset store before each test
beforeEach(() => {
  useGameStore.setState({
    deck: [],
    players: [],
    currentPlayer: 1,
    flippedCards: [],
    isBusy: false,
    winner: null,
    gameStarted: false,
    gameMode: "numbers",
  });
});

describe('gameStore state and actions', () => {
  it('should start the game with correct initial state for numbers', () => {
    useGameStore.getState().startGame(3, 'numbers');

    const state = useGameStore.getState();
    expect(state.gameStarted).toBe(true);
    expect(state.players.length).toBe(3);
    expect(state.deck.length).toBe(30);
    expect(state.currentPlayer).toBe(1);
    expect(state.gameMode).toBe('numbers');
  });

  it('should start the game with correct initial state for letters', () => {
    useGameStore.getState().startGame(2, 'letters');

    const state = useGameStore.getState();
    expect(state.gameStarted).toBe(true);
    expect(state.players.length).toBe(2);
    expect(state.deck.length).toBe(30);
    expect(state.currentPlayer).toBe(1);
    expect(state.gameMode).toBe('letters');
  });

  it('should flip a card', () => {
    useGameStore.getState().startGame(2, 'numbers');
    const cardId = useGameStore.getState().deck[0].id;
    useGameStore.getState().flipCard(cardId);

    const state = useGameStore.getState();
    expect(state.deck[0].isFaceUp).toBe(true);
    expect(state.flippedCards.length).toBe(1);
  });

  it('should handle a non-matching pair', async () => {
    useGameStore.getState().startGame(2, 'numbers');
    
    // Manually set cards for a predictable test
    const deck = generateDeck(10, 'numbers');
    deck[0].value = 1;
    deck[1].value = 2;
    useGameStore.setState({ deck });

    useGameStore.getState().flipCard(deck[0].id);
    useGameStore.getState().flipCard(deck[1].id);

    let state = useGameStore.getState();
    expect(state.flippedCards.length).toBe(2);
    expect(state.currentPlayer).toBe(1);

    // Wait for the timeout
    await new Promise(resolve => setTimeout(resolve, 1100));

    state = useGameStore.getState();
    expect(state.deck[0].isFaceUp).toBe(false);
    expect(state.deck[1].isFaceUp).toBe(false);
    expect(state.currentPlayer).toBe(2);
  });

  it('should handle a matching pair', async () => {
    useGameStore.getState().startGame(2, 'numbers');

    // Manually set cards for a predictable test
    const deck = generateDeck(10, 'numbers');
    deck[0].value = 5;
    deck[1].value = 5;
    useGameStore.setState({ deck });

    const initialScore = useGameStore.getState().players[0].score;

    useGameStore.getState().flipCard(deck[0].id);
    useGameStore.getState().flipCard(deck[1].id);

    // Wait for the timeout
    await new Promise(resolve => setTimeout(resolve, 1100));

    const state = useGameStore.getState();
    expect(state.deck[0].isMatched).toBe(true);
    expect(state.deck[1].isMatched).toBe(true);
    expect(state.players[0].score).toBe(initialScore + 1);
    expect(state.currentPlayer).toBe(1); // Same player's turn
  });

  it('should end the game when all pairs are matched', async () => {
    useGameStore.getState().startGame(2, 'numbers');
    const deck = generateDeck(2, 'numbers');
    useGameStore.setState({ deck });

    useGameStore.getState().flipCard(deck[0].id);
    useGameStore.getState().flipCard(deck[1].id);

    // Wait for the timeout
    await new Promise(resolve => setTimeout(resolve, 1100));

    const state = useGameStore.getState();
    expect(state.winner).not.toBeNull();
  });
});
import { describe, it, expect, beforeEach } from 'vitest';
import { createShuffledCards } from '../src/lib/utils';
import useGameStore from '../src/store/gameStore';

// Reset store before each test
beforeEach(() => {
  useGameStore.setState(useGameStore.getInitialState());
});

describe('createShuffledCards', () => {
  it('should create the correct number of cards', () => {
    const cards = createShuffledCards(30);
    expect(cards.length).toBe(30);
  });

  it('should create pairs of numbers', () => {
    const cards = createShuffledCards(30);
    const values = cards.map(card => card.value);
    const valueCounts = values.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    Object.values(valueCounts).forEach(count => {
      expect(count).toBe(2);
    });
  });

  it('should throw an error for an odd number of tiles', () => {
    expect(() => createShuffledCards(31)).toThrow('Number of tiles must be an even number.');
  });
});

describe('gameStore state and actions', () => {
  it('should start the game with correct initial state', () => {
    const { actions } = useGameStore.getState();
    actions.setSettings({ numPlayers: 3, numTiles: 40 });
    actions.startGame();

    const state = useGameStore.getState();
    expect(state.gameState).toBe('playing');
    expect(state.players.length).toBe(3);
    expect(state.cards.length).toBe(40);
    expect(state.currentPlayerId).toBe(1);
  });

  it('should flip a card', () => {
    const { actions } = useGameStore.getState();
    actions.startGame();
    actions.flipCard(0);

    const state = useGameStore.getState();
    expect(state.cards[0].isFlipped).toBe(true);
    expect(state.flippedCardIds).toEqual([0]);
  });

  it('should handle a non-matching pair', async () => {
    const { actions } = useGameStore.getState();
    actions.startGame();
    
    // Manually set cards for a predictable test
    const cards = createShuffledCards(10);
    cards[0].value = 1;
    cards[1].value = 2;
    useGameStore.setState({ cards });

    actions.flipCard(0);
    actions.flipCard(1);

    let state = useGameStore.getState();
    expect(state.flippedCardIds.length).toBe(2);
    expect(state.currentPlayerId).toBe(1);

    // Wait for the timeout
    await new Promise(resolve => setTimeout(resolve, 750));

    state = useGameStore.getState();
    expect(state.cards[0].isFlipped).toBe(false);
    expect(state.cards[1].isFlipped).toBe(false);
    expect(state.currentPlayerId).toBe(2);
  });

  it('should handle a matching pair', () => {
    const { actions } = useGameStore.getState();
    actions.startGame();

    // Manually set cards for a predictable test
    const cards = createShuffledCards(10);
    cards[0].value = 5;
    cards[1].value = 5;
    useGameStore.setState({ cards });

    const initialScore = useGameStore.getState().players[0].score;

    actions.flipCard(0);
    actions.flipCard(1);

    const state = useGameStore.getState();
    expect(state.cards[0].isMatched).toBe(true);
    expect(state.cards[1].isMatched).toBe(true);
    expect(state.players[0].score).toBe(initialScore + 1);
    expect(state.currentPlayerId).toBe(1); // Same player's turn
  });

  it('should end the game when all pairs are matched', () => {
    const { actions } = useGameStore.getState();
    actions.setSettings({ numTiles: 2 });
    actions.startGame();

    const cards = useGameStore.getState().cards;
    actions.flipCard(cards[0].id);
    actions.flipCard(cards[1].id);

    const state = useGameStore.getState();
    expect(state.gameState).toBe('finished');
  });
});

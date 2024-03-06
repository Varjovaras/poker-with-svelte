import type { Deck } from '$lib/poker/deck';
import { handCalculator } from '$lib/poker/handCalculator';
import { expect, test } from 'vitest';

export function sum(a: number, b: number) {
	return a + b;
}

const straightFlushHand: Deck = [
	{ suit: 'hearts', rank: 8 },
	{ suit: 'hearts', rank: 9 },
	{ suit: 'hearts', rank: 10 },
	{ suit: 'hearts', rank: 11 },
	{ suit: 'hearts', rank: 12 },
	{ suit: 'spades', rank: 0 }
];

test('Hand is straight flush, not a royal flush and not just a flush', () => {
	expect(handCalculator(straightFlushHand)).toBe('straight flush');
});

const royalFlushHand: Deck = [
	{ suit: 'hearts', rank: 9 },
	{ suit: 'hearts', rank: 10 },
	{ suit: 'hearts', rank: 11 },
	{ suit: 'hearts', rank: 12 },
	{ suit: 'hearts', rank: 0 },
	{ suit: 'diamonds', rank: 8 }

	// { suit: 'spades', rank: 8 }
];

test('Hand is royal flush', () => {
	expect(handCalculator(royalFlushHand)).toBe('royal flush');
});

//straight from 10 to A, hand has a flush but the straight isnt the flush
const flushHandWithStraight: Deck = [
	{ suit: 'hearts', rank: 9 },
	{ suit: 'hearts', rank: 10 },
	{ suit: 'hearts', rank: 11 },
	{ suit: 'hearts', rank: 12 },
	{ suit: 'spades', rank: 0 },
	{ suit: 'hearts', rank: 5 }
];

test('Hand is only a flush while containing straight', () => {
	expect(handCalculator(flushHandWithStraight)).toBe('flush');
});

const threeOfKindHand: Deck = [
	{ suit: 'hearts', rank: 2 },
	{ suit: 'diamonds', rank: 2 },
	{ suit: 'clubs', rank: 2 },
	{ suit: 'spades', rank: 8 },
	{ suit: 'hearts', rank: 10 },
	{ suit: 'spades', rank: 0 }
];

test('Hand is three of a kind', () => {
	expect(handCalculator(threeOfKindHand)).toBe('three of kind');
});

const twoPairHand: Deck = [
	{ suit: 'hearts', rank: 2 },
	{ suit: 'diamonds', rank: 2 },
	{ suit: 'clubs', rank: 6 },
	{ suit: 'spades', rank: 6 },
	{ suit: 'hearts', rank: 10 },
	{ suit: 'spades', rank: 0 }
];

test('Hand is two pair', () => {
	expect(handCalculator(twoPairHand)).toBe('two pair');
});

const pairHand: Deck = [
	{ suit: 'hearts', rank: 2 },
	{ suit: 'diamonds', rank: 2 },
	{ suit: 'clubs', rank: 6 },
	{ suit: 'spades', rank: 8 },
	{ suit: 'spades', rank: 11 }
];

test('Hand is pair', () => {
	expect(handCalculator(pairHand)).toBe('pair');
});

const highCardHand: Deck = [
	{ suit: 'hearts', rank: 2 },
	{ suit: 'diamonds', rank: 4 },
	{ suit: 'clubs', rank: 6 },
	{ suit: 'spades', rank: 8 },
	{ suit: 'hearts', rank: 10 },
	{ suit: 'spades', rank: 0 }
];

test('Hand is high card', () => {
	expect(handCalculator(highCardHand)).toBe('high card');
});

const straightHand: Deck = [
	{ suit: 'hearts', rank: 2 },
	{ suit: 'diamonds', rank: 3 },
	{ suit: 'clubs', rank: 4 },
	{ suit: 'spades', rank: 5 },
	{ suit: 'hearts', rank: 6 },
	{ suit: 'spades', rank: 0 }
];

test('Hand is straight', () => {
	expect(handCalculator(straightHand)).toBe('straight');
});

const fullHouseHand: Deck = [
	{ suit: 'hearts', rank: 2 },
	{ suit: 'diamonds', rank: 2 },
	{ suit: 'clubs', rank: 4 },
	{ suit: 'spades', rank: 4 },
	{ suit: 'hearts', rank: 4 },
	{ suit: 'spades', rank: 0 }
];

test('Hand is full house', () => {
	expect(handCalculator(fullHouseHand)).toBe('full house');
});

import type { Deck } from '$lib/deck';
import { handCalculator } from '$lib/handCalculator';
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
	expect(handCalculator(straightFlushHand)).toBe('StraightFlush');
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
	expect(handCalculator(royalFlushHand)).toBe('RoyalFlush');
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
	expect(handCalculator(flushHandWithStraight)).toBe('Flush');
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
	expect(handCalculator(threeOfKindHand)).toBe('ThreeOfKind');
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
	expect(handCalculator(twoPairHand)).toBe('TwoPair');
});

const pairHand: Deck = [
	{ suit: 'hearts', rank: 2 },
	{ suit: 'diamonds', rank: 2 },
	{ suit: 'clubs', rank: 6 },
	{ suit: 'spades', rank: 8 },
	{ suit: 'spades', rank: 11 }
];

test('Hand is pair', () => {
	expect(handCalculator(pairHand)).toBe('Pair');
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
	expect(handCalculator(highCardHand)).toBe('HighCard');
});

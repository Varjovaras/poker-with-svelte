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
	{ suit: 'hearts', rank: 12 }
];

test('Hand is straight flush, not a royal flush and not just a flush', () => {
	expect(handCalculator(straightFlushHand)).toBe('StraightFlush');
});

const royalFlushHand: Deck = [
	{ suit: 'hearts', rank: 9 },
	{ suit: 'hearts', rank: 10 },
	{ suit: 'hearts', rank: 11 },
	{ suit: 'hearts', rank: 12 },
	{ suit: 'hearts', rank: 0 }
];

test('Hand is royal flush', () => {
	expect(handCalculator(royalFlushHand)).toBe('RoyalFlush');
});

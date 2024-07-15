export const suits = ['hearts', 'diamonds', 'spades', 'clubs'] as const;
export const ranks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export type Suit = (typeof suits)[number];
export type Rank = (typeof ranks)[number];
export type Card = { suit: Suit; rank: Rank };

const cardRankStrings = [
	'ace',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'jack',
	'queen',
	'king'
] as const;

export type CardRankString = (typeof cardRankStrings)[number];

export const cardRankToString = (rank: Rank): CardRankString => {
	return cardRankStrings[rank];
};

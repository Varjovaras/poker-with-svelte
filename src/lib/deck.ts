export type CardType = { suit: SuitType; rank: RankType };
export type Deck = CardType[];
export const suits = ['hearts', 'diamonds', 'spades', 'clubs'] as const;
export const ranks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type SuitType = (typeof suits)[number];
export type RankType = (typeof ranks)[number];

export const newDeck = (): Deck => {
	let deck: Deck = [];
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 13; j++) {
			const card = {
				suit: suits[i],
				rank: ranks[j]
			};
			deck.push(card);
		}
	}
	if (deck.length !== 52) {
		throw new Error('deck is not 52 cards');
	}

	return deck;
};

export const shuffleDeck = (deck: Deck): Deck => {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
};

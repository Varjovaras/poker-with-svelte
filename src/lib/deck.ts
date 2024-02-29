export type Card = { suit: string; rank: number };
export type Deck = Card[];
const suits = ['hearts', 'diamonds', 'spades', 'clubs'] as const;
const ranks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
	const newDeck = deck;
	let i = newDeck.length;
	while (--i > 0) {
		const temp = Math.floor(Math.random() * (i + 1));
		[newDeck[temp], newDeck[i]] = [newDeck[i], newDeck[temp]];
	}
	return newDeck;
};

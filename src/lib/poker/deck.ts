import { type CardType, suits, ranks } from './card';

export type Deck = CardType[];

export const newDeck = (): Deck => {
	const deck: Deck = [];
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

	return shuffleDeck(deck);
};

const shuffleDeck = (deck: Deck): Deck => {
	const newDeck = [...deck];
	for (let i = newDeck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
	}
	return newDeck;
};

import { newDeck, type Card, type Deck } from './deck';
import type { HandValue } from './handCalculator';

export type Player = {
	// name: string;
	cards: Card[];
	handValue: HandValue;
	id: number;
};

export type Poker = {
	players: Player[];
	deck: Deck;
};

export const newPlayer = (id: number): Player => {
	return {
		cards: [],
		handValue: 'high card',
		id: id
	};
};

export const newPoker = (): Poker => {
	const player = newPlayer(0);
	const player2 = newPlayer(1);
	// const player3 = newPlayer(2);
	// const player4 = newPlayer(3);

	return {
		players: [player, player2],
		deck: newDeck()
	};
};

export const deal = (poker: Poker) => {
	for (let card = 0; card < 2; card++) {
		for (const player of poker.players) {
			const dealtCard = poker.deck.pop();
			if (dealtCard) {
				player.cards.push(dealtCard);
			} else {
				console.error('No more cards in the deck');
				return;
			}
		}
	}
};

// const royalFlushCalculator = () => {
// 	for (; i < 100000000; i++) {
// 		if (handCalculator(deck.slice(0, 7)) === 'royal flush') {
// 			break;
// 		} else {
// 			deck = newDeck();
// 		}
// 	}
// };

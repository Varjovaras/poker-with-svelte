import { newDeck, type Card, type Deck } from './deck';
import type { HandValue } from './handCalculator';

type Player = {
	// name: string;
	cards: Card[];
	handValue: HandValue;
	id: number;
};

type Poker = {
	players: Player[];
	deck: Deck;
};

const newPlayer = (id: number): Player => {
	return {
		cards: [],
		handValue: 'high card',
		id: id
	};
};

const newPoker = (): Poker => {
	const player = newPlayer(0);
	const player2 = newPlayer(1);

	return {
		players: [player, player2],
		deck: newDeck()
	};
};

const suits = ['hearts', 'diamonds', 'spades', 'clubs'] as const;
const ranks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

type Card = { suit: string; rank: number };

class Deck {
	deck: Card[] = [];
	constructor() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 13; j++) {
				const card = {
					suit: suits[i],
					rank: ranks[j]
				};
				this.deck.push(card);
			}
		}
	}
}

export type Card = { suit: string; rank: number };

export class Deck {
	static readonly suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	static readonly ranks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	deck: Card[] = [];

	constructor() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 13; j++) {
				const card = {
					suit: Deck.suits[i],
					rank: Deck.ranks[j]
				};
				this.deck.push(card);
			}
		}
		if (this.deck.length !== 52) {
			throw new Error('deck is not 52 cards');
		}
		this.shuffle();
	}

	//fisher-yates shuffle algorithm
	shuffle() {
		const array = this.deck;
		let i = array.length;
		while (--i > 0) {
			const temp = Math.floor(Math.random() * (i + 1));
			[array[temp], array[i]] = [array[i], array[temp]];
		}
		this.deck = array;
	}
}

import type { HandValue } from './handCalculator';

const bestHand = (hands: HandValue[]): HandValue[] => {
	const maxHandValue = Math.max(...hands.map(handValueToInt));
	const filteredHands = hands.filter((hand) => handValueToInt(hand) === maxHandValue);
	if (filteredHands.length === 0) {
		return filteredHands;
	}
	return hands.filter((hand) => handValueToInt(hand) === maxHandValue);
};

const handValueToInt = (handValue: HandValue): number => {
	switch (handValue) {
		case 'high card':
			return 0;
		case 'pair':
			return 1;
		case 'two pair':
			return 2;
		case 'three of kind':
			return 3;
		case 'straight':
			return 4;
		case 'flush':
			return 5;
		case 'full house':
			return 6;
		case 'four of kind':
			return 7;
		case 'straight flush':
			return 8;
		case 'royal flush':
			return 9;
	}
};

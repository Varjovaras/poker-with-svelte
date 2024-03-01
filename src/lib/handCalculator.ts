import type { Card } from './deck';

const HandTypes = [
	'RoyalFlush',
	'StraightFlush',
	'FourOfKind',
	'FullHouse',
	'Flush',
	'Straight',
	'ThreeOfKind',
	'TwoPair',
	'Pair',
	'HighCard'
] as const;
type HandValue = (typeof HandTypes)[number];
type FlushAndStraightHandTypes = 'RoyalFlush' | 'StraightFlush' | 'Flush';

//there are 14 elements because Ace can be a 1 or 14 depending on the straight
const handRanksArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
type HandRankArray = typeof handRanksArray;

export const handCalculator = (hand: Card[]): HandValue => {
	if (hand.length < 5) {
		throw new Error('Hand size smaller than 5 is not possible to calculate');
	}
	const handRanksAsNumbers = handRankHelper(hand);
	const handSuitsAsNumbers = handSuitHelper(hand);

	if (isFlush(handSuitsAsNumbers) && isStraight(handRanksAsNumbers)) {
		return isRoyalFlush(hand);
	}

	if (isFourOfKind(handRanksAsNumbers)) {
		return 'FourOfKind';
	}

	if (isFullHouse(handRanksAsNumbers)) {
		return 'FullHouse';
	}

	if (isFlush(handSuitsAsNumbers)) {
		return 'Flush';
	}

	if (isStraight(handRanksAsNumbers)) {
		return 'Straight';
	}

	if (isThreeOfKind(handRanksAsNumbers)) {
		return 'ThreeOfKind';
	}

	if (isTwoPair(handRanksAsNumbers)) {
		return 'TwoPair';
	}

	if (isPair(handRanksAsNumbers)) {
		return 'Pair';
	}

	return 'HighCard';
};

const isStraight = (handRanksAsNumbers: HandRankArray): boolean => {
	//counter used to track how many elements hand has in row
	let counter = 0;
	//array ends at 10 because if handRanksAsArray[9] is not part of the straight
	//it cannot be straight
	for (let i = 0; i < 10; i++) {
		if (handRanksAsNumbers[i] !== 0) {
			counter++;
			if (counter === 5) {
				return true;
			}
		} else {
			counter = 0;
		}
	}
	return false;
};

const isFlush = (suitCounts: Record<string, number>): boolean => {
	for (const count of Object.values(suitCounts)) {
		if (count >= 5) {
			return true;
		}
	}
	return false;
};

//this is only called when your hand has flush and straight at the same time.
//this checks if it's a royal flush, straight flush or only a flush
const isRoyalFlush = (hand: Card[]): FlushAndStraightHandTypes => {
	return 'RoyalFlush';
};

const handRankHelper = (hand: Card[]): number[] => {
	const handRanksAsNumbers = [...handRanksArray];

	for (const card of hand) {
		//ace which has rank of 0 is also added to the 14th element of the array
		if (card.rank === 0) {
			handRanksAsNumbers[0]++;
			handRanksAsNumbers[13]++;
		} else {
			handRanksAsNumbers[card.rank]++;
		}
	}
	return handRanksAsNumbers;
};

const handSuitHelper = (hand: Card[]): Record<string, number> => {
	const suitCounts: Record<string, number> = {
		hearts: 0,
		diamonds: 0,
		clubs: 0,
		spades: 0
	};

	for (const card of hand) {
		suitCounts[card.suit]++;
	}

	return suitCounts;
};

const isFourOfKind = (handRanksAsNumbers: HandRankArray): boolean => {
	return handRanksAsNumbers.some((count) => count >= 4);
};

const isFullHouse = (handRanksAsNumbers: HandRankArray): boolean => {
	return isThreeOfKind(handRanksAsNumbers) && isThreeOfKind(handRanksAsNumbers);
};

function isThreeOfKind(handRanksAsNumbers: number[]) {
	return handRanksAsNumbers.some((count) => count === 3);
}

function isTwoPair(handRanksAsNumbers: number[]) {
	let firstPair = false;

	for (const rank of handRanksAsNumbers) {
		if (rank === 2 && !firstPair) {
			firstPair = true;
		}
		if (rank === 2 && firstPair) {
			return true;
		}
	}
	return false;
}

function isPair(handRanksAsNumbers: number[]) {
	return handRanksAsNumbers.some((count) => count === 2);
}

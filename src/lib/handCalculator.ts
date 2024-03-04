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
type SuitCounts = Record<string, number>;

export const handCalculator = (hand: Card[]): HandValue => {
	if (hand.length < 5) {
		throw new Error('Hand size smaller than 5 is not possible to calculate');
	}
	const handRanksAsNumbers = handRankHelper(hand);
	const handSuitsAsNumbers = handSuitHelper(hand);

	if (isFlush(handSuitsAsNumbers) && isStraight(handRanksAsNumbers)) {
		return straightFlushHelper(hand, handRanksAsNumbers, handSuitsAsNumbers);
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
		console.log('?!?!??!?');
		return 'TwoPair';
	}

	if (isPair(handRanksAsNumbers)) {
		console.log('ali');
		return 'Pair';
	}

	return 'HighCard';
};

const isStraight = (handRanksAsNumbers: HandRankArray): boolean => {
	//counter used to track how many elements hand has in row
	let counter = 0;
	//array ends at 10 because if handRanksAsArray[9] is not part of the straight
	//it cannot be straight
	for (let i = 0; i < 14; i++) {
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

const isFlush = (suitCounts: SuitCounts): boolean => {
	for (const count of Object.values(suitCounts)) {
		if (count >= 5) {
			return true;
		}
	}
	return false;
};

//this is only called when your hand has flush and straight at the same time.
//this checks if it's a royal flush, straight flush or only a flush
const straightFlushHelper = (
	hand: Card[],
	handRanksAsNumbers: HandRankArray,
	handSuitsAsNumbers: SuitCounts
): FlushAndStraightHandTypes => {
	const sortedHand = sortCardsByRank(hand);
	const flushSuit = suitWithFiveOrMore(handSuitsAsNumbers);

	// Check for straight flush with any
	for (let i = 0; i < 10; i++) {
		if (flushIsStraight(sortedHand, i, flushSuit)) {
			if (i === 9) {
				return 'RoyalFlush';
			}
			return 'StraightFlush';
		}
	}

	return 'Flush';
};

const flushIsStraight = (
	sortedHand: Card[],
	straightStartingIndex: number,
	flushSuit: string
): boolean => {
	for (let i = straightStartingIndex; i < straightStartingIndex + 5; i++) {
		if (i === 13) {
			if (!sortedHand.some((card) => card.suit === flushSuit && card.rank === 0)) {
				return false;
			}
		} else if (!sortedHand.some((card) => card.suit === flushSuit && card.rank === i)) {
			return false;
		}
	}
	return true;
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
	return isThreeOfKind(handRanksAsNumbers) && isTwoPair(handRanksAsNumbers);
};

function isThreeOfKind(handRanksAsNumbers: number[]): boolean {
	return handRanksAsNumbers.some((count) => count === 3);
}

const isTwoPair = (handRanksAsNumbers: number[]): boolean => {
	let pairCount = 0;

	for (const rank of handRanksAsNumbers) {
		if (rank === 2) {
			pairCount++;
		}
	}

	return pairCount >= 2;
};

function isPair(handRanksAsNumbers: number[]): boolean {
	return handRanksAsNumbers.some((count) => count === 2);
}

//this shouldnt be called if the hand is not a straight
//only called when hand is both straight and flush
const straightStartingIndex = (handRanksAsNumbers: HandRankArray): number => {
	//counter used to track how many elements hand has in row
	let counter = 0;
	for (let i = 0; i < 14; i++) {
		if (handRanksAsNumbers[i] !== 0) {
			counter++;
			if (counter === 5) {
				return i - 4;
			}
		} else {
			counter = 0;
		}
	}
	throw new Error('Hand is not a straight');
};

//creates new array
const sortCardsByRank = (hand: Card[]): Card[] => {
	return [...hand].sort((a, b) => a.rank - b.rank);
};

//only called when checking for straight flush
const suitWithFiveOrMore = (handSuitsAsNumbers: SuitCounts): string => {
	for (const suit in handSuitsAsNumbers) {
		if (handSuitsAsNumbers[suit] >= 5) {
			return suit;
		}
	}
	throw new Error(
		"This shouldn't be called because hand should always be flush, when checking for straight flush"
	);
};

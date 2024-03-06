import { newDeck, type Card, type Deck } from './deck';

const HandTypes = [
	'royal flush',
	'straight flush',
	'four of kind',
	'full house',
	'flush',
	'straight',
	'three of kind',
	'two pair',
	'pair',
	'high card'
] as const;
export type HandValue = (typeof HandTypes)[number];
type FlushAndStraightHandTypes = 'royal flush' | 'straight flush' | 'flush';

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
		return straightFlushHelper(hand, handSuitsAsNumbers);
	}

	if (isFourOfKind(handRanksAsNumbers)) {
		return 'four of kind';
	}

	if (isFullHouse(handRanksAsNumbers)) {
		return 'full house';
	}

	if (isFlush(handSuitsAsNumbers)) {
		return 'flush';
	}

	if (isStraight(handRanksAsNumbers)) {
		return 'straight';
	}

	if (isThreeOfKind(handRanksAsNumbers)) {
		return 'three of kind';
	}

	if (isTwoPair(handRanksAsNumbers)) {
		return 'two pair';
	}

	if (isPair(handRanksAsNumbers)) {
		return 'pair';
	}

	return 'high card';
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
	handSuitsAsNumbers: SuitCounts
): FlushAndStraightHandTypes => {
	const sortedHand = sortCardsByRank(hand);
	const flushSuit = suitWithFiveOrMore(handSuitsAsNumbers);

	// Check for straight flush starting from any possible index
	//straight might start from a different index than the containing straight flush so check all to make sure
	for (let i = 0; i < 10; i++) {
		if (flushIsStraight(sortedHand, i, flushSuit)) {
			if (i === 9) {
				return 'royal flush';
			}
			return 'straight flush';
		}
	}

	return 'flush';
};

const flushIsStraight = (
	sortedHand: Card[],
	straightStartingIndex: number,
	flushSuit: string
): boolean => {
	const straightFlushCards = sortedHand.filter((card) => card.suit === flushSuit);

	for (let i = 0; i < 5; i++) {
		const expectedRank = (straightStartingIndex + i) % 13;
		if (!straightFlushCards.some((card) => card.rank === expectedRank)) {
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
	return isThreeOfKind(handRanksAsNumbers) && isPair(handRanksAsNumbers);
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

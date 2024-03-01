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

export const handCalculator = (hand: Card[]): HandValue => {
	if (hand.length < 5) {
		throw new Error('Hand size smaller than 5 is not possible to calculate');
	}

	if (isFlush(hand) && isStraight(hand)) {
		return isRoyalFlush(hand);
	}
	return 'RoyalFlush';
};

//there are 14 elements because Ace can be a 1 or 14 depending on the straight
//this gets copied for isStraight() function
const straightHelper = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const isStraight = (hand: Card[]): boolean => {
	const handRanksAsArray = [...straightHelper];
	for (let i = 0; i < hand.length; i++) {
		//ace which has rank of 0 is also added to the 14th element of the array
		if (hand[i].rank === 0) {
			handRanksAsArray[0]++;
			handRanksAsArray[13]++;
		} else {
			handRanksAsArray[hand[i].rank]++;
		}
	}

	//counter used to track how many elements hand has in row
	let counter = 0;
	//array ends at 10 because if handRanksAsArray[9] is not part of the straight
	//it cannot be straight
	for (let i = 0; i < 10; i++) {
		if (handRanksAsArray[i] !== 0) {
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

const isFlush = (hand: Card[]): boolean => {
	const flushHelper = [0, 0, 0, 0];
	for (let i = 0; i < hand.length; i++) {
		switch (hand[i].suit) {
			case 'hearts':
				flushHelper[0]++;
				break;
			case 'diamonds':
				flushHelper[1]++;
				break;
			case 'clubs':
				flushHelper[2]++;
				break;
			case 'spades':
				flushHelper[3]++;
				break;
		}
	}
	return flushHelper.some((count) => count >= 5);
};

//this is only called when your hand has flush and straight at the same time.
//this checks if it's a royal flush, straight flush or only a flush
const isRoyalFlush = (hand: Card[]): FlushAndStraightHandTypes => {
	return 'RoyalFlush';
};

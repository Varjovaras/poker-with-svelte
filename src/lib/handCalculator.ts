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
		if (hand[i].rank === 0) {
			handRanksAsArray[0]++;
			handRanksAsArray[13]++;
		} else {
			handRanksAsArray[hand[i].rank];
		}
	}
	return true;
};

const isFlush = (hand: Card[]): boolean => {
	return true;
};

//this is only called when your hand has flush and straight at the same time.
//this checks if it's a royal flush, straight flush or only a flush'
const isRoyalFlush = (hand: Card[]): FlushAndStraightHandTypes => {
	return 'RoyalFlush';
};

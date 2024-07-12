<script lang="ts">
	import type { CardType, RankType } from '$lib/poker/card';

	const cardRanks = [
		'ace',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'jack',
		'queen',
		'king'
	] as const;

	type SingleCardRank = (typeof cardRanks)[number];

	export let card: CardType;

	const cardRankConverter = (rank: RankType): SingleCardRank => {
		return cardRanks[rank];
	};

	console.log(`../assets/cards/${cardRankConverter(card.rank)}_of_${card.suit}.svg`);
</script>

<img
	src={`../assets/cards/${cardRankConverter(card.rank)}_of_${card.suit}.svg`}
	alt="An alt text"
/>

<!-- <p class=" mr-0.5">{cardRankConverter(card.rank)}</p> -->

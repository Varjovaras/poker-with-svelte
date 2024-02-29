<script lang="ts">
	import type { CardType, RankType, SuitType } from './deck';

	const cardRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
	type SingleCardRank = (typeof cardRanks)[number];

	const cardSuitCharacters = ['H', 'D', 'C', 'S'] as const;
	type SingleSuitCharacter = (typeof cardSuitCharacters)[number];

	export let card: CardType;

	const cardSuitConverter = (suit: SuitType): SingleSuitCharacter => {
		switch (suit) {
			case 'hearts':
				return 'H';
			case 'diamonds':
				return 'D';
			case 'clubs':
				return 'C';
			case 'spades':
				return 'S';
			default:
				throw new Error(`Invalid suit: ${suit}`);
		}
	};

	const cardRankConverter = (rank: RankType): SingleCardRank => {
		return cardRanks[rank];
	};
</script>

{#if card.suit === 'diamonds' || card.suit === 'hearts'}
	<p class="text-red-500 mr-0.5">{cardSuitConverter(card.suit)}</p>
{:else}
	<p class="text-gray-400 mr-0.5">{cardSuitConverter(card.suit)}</p>
{/if}
<p class="mr-0.5">{cardRankConverter(card.rank)}</p>

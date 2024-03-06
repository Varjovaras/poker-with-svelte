<script lang="ts">
	import type { Card } from '$lib/poker/deck';
	import { handCalculator } from '$lib/poker/handCalculator';
	import { type Player } from '$lib/poker/poker';

	export let player: Player;
	export let cardsOnTable: Card[];
	$: handValue = handCalculator(cardsOnTable.concat(player.cards));
</script>

<p>
	{#each player.cards as card}
		{card.suit} | {card.rank}
	{/each}
</p>
<p>{handValue}</p>

<script lang="ts">
	import { type CardType } from '$lib/poker/card';
	import Card from '$lib/components/Card.svelte';
	import { type Player } from '$lib/poker/poker';
	import { handCalculator } from '$lib/poker/handCalculator';

	export let cardsOnTable: CardType[];
	export let players: Player[];
</script>

<div class="mt-4 grid grid-cols-5 items-center">
	{#each cardsOnTable as card}
		<div class="mx-4 my-0.5 flex justify-between">
			<Card {card} />
		</div>
	{/each}
</div>

<div class="mx-6 grid grid-cols-2">
	{#each players as player (player.id)}
		<div class="mx-4 my-0.5 flex justify-between">
			{#each player.cards as card}
				<Card {card} />
			{/each}
		</div>
		{#if cardsOnTable.length >= 5}
			<p>
				{handCalculator(cardsOnTable.concat(player.cards))}
			</p>
		{/if}
	{/each}
</div>

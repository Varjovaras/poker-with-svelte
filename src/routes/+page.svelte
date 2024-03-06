<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import { handCalculator } from '$lib/poker/handCalculator';

	import { newDeck } from '$lib/poker/deck';
	import { deal } from '$lib/poker/poker';

	export let data: PageData;
	let poker = data.post.poker;

	$: cardsOnBoard = poker.deck.slice(0, 5);

	const shuffle = () => {
		poker.deck = newDeck();
		for (const player of poker.players) {
			player.cards = [];
		}
		deal(poker);
		// royalFlushCalculator();
	};

	// const royalFlushCalculator = () => {
	// 	for (; i < 100000000; i++) {
	// 		if (handCalculator(deck.slice(0, 7)) === 'royal flush') {
	// 			break;
	// 		} else {
	// 			deck = newDeck();
	// 		}
	// 	}
	// };
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="h1">Welcome to <span class="text-red-500">Poker Simulator</span></h1>

	<div class="mt-4 grid grid-cols-5 items-center">
		{#each cardsOnBoard as card}
			<div class="mx-4 my-0.5 flex justify-between">
				<Card {card} />
			</div>
		{/each}
	</div>

	<div class="mx-6 grid grid-cols-2">
		{#each poker.players as player (player.id)}
			<div class="mx-4 my-0.5 flex justify-between">
				{#each player.cards as card}
					<Card {card} />
				{/each}
			</div>
			<p>
				{handCalculator(cardsOnBoard.concat(player.cards))}
			</p>
		{/each}
	</div>

	<!-- <div class="grid">
		<p class="text-red-500">
			{handValue}
		</p>
	</div> -->

	<button type="button" class="variant-ghost-primary btn mt-4" on:click={shuffle}>shuffle</button>
</div>

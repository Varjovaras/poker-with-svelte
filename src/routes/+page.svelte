<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import { handCalculator } from '$lib/poker/handCalculator';

	import { newDeck } from '$lib/poker/deck';

	export let data: PageData;
	let deck = data.post.deck;

	$: cardsOnBoard = deck.slice(0, 5);
	$: handValue = handCalculator(cardsOnBoard);

	let i = 0;

	const shuffle = () => {
		deck = newDeck();
		i = 0;
		royalFlushCalculator();
	};

	const royalFlushCalculator = () => {
		for (; i < 100000000; i++) {
			if (handCalculator(deck.slice(0, 7)) === 'royal flush') {
				break;
			} else {
				deck = newDeck();
			}
		}
	};
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

	<div class="grid">
		<p class="text-red-500">
			{handValue}
		</p>
	</div>

	<button on:click={shuffle}>shuffle</button>
	<p>{i}</p>
</div>

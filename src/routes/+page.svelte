<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import { handCalculator } from '$lib/poker/handCalculator';
	import { newDeck } from '$lib/poker/deck';

	export let data: PageData;
	let deck = data.post.deck;
	$: deckToFront = deck.slice(0, 7);
	$: hand = handCalculator(deckToFront);
	$: i = 0;
	const shuffle = () => {
		deck = newDeck();
		for (; i < 100000000; i++) {
			if (handCalculator(deck.slice(0, 7)) === 'straight flush') {
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
		{#each deckToFront as card}
			<div class="mx-4 my-0.5 flex justify-between">
				<Card {card} />
			</div>
		{/each}
	</div>
	<p class="text-red-500">
		{hand}
	</p>
	<button on:click={shuffle}>shuffle</button>
	<p>{i}</p>
</div>

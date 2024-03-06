<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/Card.svelte';
	import { handCalculator } from '$lib/handCalculator';
	import { newDeck } from '$lib/deck';

	export let data: PageData;
	let deck = data.post.deck;
	$: hand = handCalculator(deck.slice(0, 7));

	const shuffle = () => {
		deck = newDeck();
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="h1">Welcome to <span class="">Poker Simulator</span></h1>

	<div class="mt-4 grid grid-cols-5 items-center">
		{#each deck.slice(0, 7) as card}
			<div class="mx-4 my-0.5 flex justify-between">
				<Card {card} />
			</div>
		{/each}
	</div>
	<p class="text-red-400">
		{hand}
	</p>
	<button on:click={shuffle}>shuffle</button>
</div>

<script lang="ts">
	// import { newDeck, shuffleDeck } from '$lib/deck';
	import type { PageData } from './$types';
	import Card from '$lib/Card.svelte';
	export let data: PageData;
	const deck = data.post.deck;
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
</div>

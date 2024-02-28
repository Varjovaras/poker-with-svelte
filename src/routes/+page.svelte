<script lang="ts">
	import { Deck } from '$lib/deck';
	let deck = new Deck().deck;
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
	<h1 class="h1">Welcome to <span class="">Poker Simulator</span></h1>

	<div class="grid grid-cols-4 items-center mt-4">
		{#each deck as card}
			<div class="flex justify-between mx-2">
				<p>{card.suit}</p>
				<p>{card.rank}</p>
			</div>
		{/each}
	</div>
</div>

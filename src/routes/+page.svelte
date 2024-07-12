<script lang="ts">
	import type { PageData } from './$types';
	import Table from '$lib/components/Table.svelte';
	import ShuffleButton from '$lib/components/ShuffleButton.svelte';
	import { newDeck } from '$lib/poker/deck';
	import { deal } from '$lib/poker/poker';

	export let data: PageData;
	const poker = data.post.poker;

	$: cardsOnTable = poker.deck.slice(0, 5);

	const shuffle = () => {
		poker.deck = newDeck();
		for (const player of poker.players) {
			player.cards = [];
		}
		deal(poker);
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="h1">Welcome to <span class="text-red-500">Poker Simulator</span></h1>
	<Table {cardsOnTable} players={poker.players} />
	<ShuffleButton {shuffle} />
</div>

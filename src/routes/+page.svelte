<script lang="ts">
	import type { PageData } from './$types';
	import Table from '$lib/components/Table.svelte';
	// import ShuffleButton from '$lib/components/ShuffleButton.svelte';
	import { newDeck } from '$lib/poker/deck';
	import { deal, type Poker } from '$lib/poker/poker';
	import DealButton from '$lib/components/DealButton.svelte';
	import NewHand from '$lib/components/newHand.svelte';

	export let data: PageData;
	const poker: Poker = data.post.poker;

	let numberOfCardsOnTable = 0;
	$: cardsOnTable = poker.deck.slice(0, numberOfCardsOnTable);

	// const shuffle = () => {
	// 	poker.deck = newDeck();
	// 	for (const player of poker.players) {
	// 		player.cards = [];
	// 	}
	// 	deal(poker);
	// };

	const dealOnTable = () => {
		if (numberOfCardsOnTable === 0) {
			numberOfCardsOnTable = 3;
		} else numberOfCardsOnTable += 1;
	};

	const newHand = () => {
		numberOfCardsOnTable = 0;
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
	<div class="flex">
		<!-- <ShuffleButton {shuffle} /> -->
		<DealButton {dealOnTable} />
		<NewHand {newHand} />
	</div>
</div>

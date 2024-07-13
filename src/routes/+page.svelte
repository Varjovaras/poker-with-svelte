<script lang="ts">
import type { PageData } from "./$types";
import Table from "$lib/components/Table.svelte";
import ShuffleButton from "$lib/components/ShuffleButton.svelte";
import { newDeck } from "$lib/poker/deck";
import { deal, type Poker } from "$lib/poker/poker";

export let data: PageData;
const poker: Poker = data.post.poker;

let numberOfCardsOnTable = 0;
$: cardsOnTable = poker.deck.slice(0, numberOfCardsOnTable);

const shuffle = () => {
	poker.deck = newDeck();
	for (const player of poker.players) {
		player.cards = [];
	}
	deal(poker);
};

const dealOnTable = () => {
	numberOfCardsOnTable += 1;
};
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="h1">Welcome to <span class="text-red-500">Poker Simulator</span></h1>
	<Table {cardsOnTable} players={poker.players} />
	<ShuffleButton {shuffle} />
	<button type="button" on:click={dealOnTable}>
123
	</button>
</div>

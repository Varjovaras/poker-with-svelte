<script lang="ts">
	import type { Card } from '$lib/poker/card';
	import { handCalculator } from '$lib/poker/handCalculator';
	import { type Player } from '$lib/poker/poker';

	export let player: Player;
</script>

<p>
	{#each player.cards as card}
		{card.suit} | {card.rank}
	{/each}
</p>

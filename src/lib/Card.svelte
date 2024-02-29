<script lang="ts">
	import type { Card } from './deck';

	export let card: Card;
</script>

{#if card.suit === 'diamonds' || card.suit === 'hearts'}
	<p class="text-red-500">{card.suit}</p>
	<p>{card.rank}</p>
{:else}
	<p class="text-gray-400">{card.suit}</p>
	<p>{card.rank}</p>
{/if}

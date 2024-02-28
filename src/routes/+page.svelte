<script lang="ts">
	import { Deck } from '$lib/deck';
	let deck = new Deck().deck;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each deck as card}
	<p>{card.suit} . {card.rank}</p>
{/each}

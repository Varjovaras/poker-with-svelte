<script lang="ts">
	import { cardRankToString, type Card } from '$lib/poker/card';

	export let card: Card;
</script>

<div class="m-0.5">
	<img
		src={`../assets/cards/${cardRankToString(card.rank)}_of_${card.suit}.svg`}
		alt="An alt text"
		width="70px"
	/>
</div>

<!-- <p class=" mr-0.5">{cardRankCRank(card.rank)}</p> -->

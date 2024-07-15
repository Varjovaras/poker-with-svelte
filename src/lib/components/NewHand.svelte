<script lang="ts">
	export let newHand: () => void;
</script>

<button type="button" class="variant-ghost-primary btn mx-2 my-4" on:click={newHand}
	>new hand</button
>

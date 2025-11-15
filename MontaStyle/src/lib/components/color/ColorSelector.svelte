<script lang="ts">
	import ColorSelectorControls from './ColorSelectorControls.svelte';
	import ColorDisplay from './ColorDisplay.svelte';
</script>

<div class="selector-container">
	<div class="controls-wrapper">
		<ColorSelectorControls />
	</div>
	<div class="display-wrapper">
		<ColorDisplay />
	</div>
</div>

<style>
	.selector-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}
	
	@media (min-width: 768px) {
		.selector-container {
			grid-template-columns: 2.5fr 1fr;
			align-items: start;
		}
		.display-wrapper {
			position: sticky;
			top: 2rem;
		}
	}
</style>


<script lang="ts">
	import PaletteGeneratorControls from './PaletteGeneratorControls.svelte';
	import PaletteDisplay from './PaletteDisplay.svelte';
	import { paletteAlgorithms } from './paletteAlgorithms';
</script>

<div class="generator-container">
	<div class="controls-wrapper">
		<PaletteGeneratorControls />
	</div>

	<div class="palette-list">
		{#each paletteAlgorithms as algorithm (algorithm.id)}
			<PaletteDisplay {algorithm} />
		{/each}
	</div>
</div>

<style>
	.generator-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	.palette-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.generator-container {
			grid-template-columns: 280px 1fr;
			align-items: start;
		}
		.controls-wrapper {
			position: sticky;
			top: 2rem;
		}
		.palette-list {
			max-height: 80vh;
			overflow-y: auto;
			padding-right: 1rem;
		}
	}
</style>
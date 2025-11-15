<script lang="ts">
	import { colorState } from '$lib/state/colorState.svelte.ts';
	import { paletteState, paletteActions } from '$lib/state/paletteState.svelte.ts';
	import type { PaletteAlgorithm } from './types';
	import ColorSwatch from './ColorSwatch.svelte';

	interface Props {
		algorithm: PaletteAlgorithm;
	}
	let { algorithm }: Props = $props();

	const colors = $derived.by(() => {
		return algorithm.generate(colorState.hex, paletteState.colorCount);
	});

	const isSelected = $derived(paletteState.selectedAlgorithmId === algorithm.id);
</script>

<div
	class="palette-card"
	class:selected={isSelected}
	role="button"
	tabindex="0"
	onclick={() => paletteActions.selectAlgorithm(algorithm.id)}
	onkeydown={(e) =>
		e.key === 'Enter' && paletteActions.selectAlgorithm(algorithm.id)}
>
	<h4 class="palette-name">{algorithm.name}</h4>
	<div class="colors-grid">
		{#each colors as colorHex (colorHex)}
			<ColorSwatch {colorHex} />
		{/each}
	</div>
</div>

<style>
	.palette-card {
		padding: 1.5rem;
		background-color: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.palette-card:hover {
		border-color: #d1d5db;
	}

	.palette-card.selected {
		border-color: #3b82f6;
		box-shadow: 0 0 0 2px #3b82f6;
	}

	.palette-name {
		font-size: 1rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 1rem 0;
	}

	.colors-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
		gap: 0.75rem;
	}
</style>
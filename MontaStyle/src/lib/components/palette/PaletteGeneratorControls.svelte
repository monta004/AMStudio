<script lang="ts">
	import { paletteState } from '$lib/state/paletteState.svelte.ts';
	import Slider from '$lib/components/shared/Slider.svelte';
</script>

<div class="controls-container">
	<h3 class="title">Controlli Palette</h3>
	<div class="slider-padding">
		<Slider
			label="Numero Colori"
			min={3}
			max={12}
			step={1}
			bind:value={paletteState.colorCount}
		/>
	</div>
</div>

<style>
	.controls-container {
		background-color: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	.title {
		font-size: 0.875rem;
		font-weight: 600;
		color: #4b5563;
		padding: 0.75rem 1.25rem;
		border-bottom: 1px solid #e5e7eb;
		margin: 0;
	}
	.slider-padding {
		padding: 1.5rem 1.25rem;
	}
</style>
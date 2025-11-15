<!-- src/lib/components/css/ColorStopControls.svelte -->
<script lang="ts">
	import type { ColorStop, ColorSource } from './types.ts';
	import Slider from '$lib/components/shared/Slider.svelte';
	import SharedColorControls from '$lib/components/shared/SharedColorControls.svelte';

	interface Props {
		colorStop: ColorStop;
		onRemove: (id : string) => void;
		canRemove: boolean;
	}

	let { colorStop = $bindable(), onRemove, canRemove }: Props = $props();

	function updateColor(source: ColorSource, palette: string, custom: string) {
		colorStop.source = source;
		colorStop.paletteColor = palette;
		colorStop.customColor = custom;
	}
</script>

<div class="color-stop">
	<div class="stop-header">

		<SharedColorControls
			source={colorStop.source}
			paletteColor={colorStop.paletteColor}
			customColor={colorStop.customColor}
			{updateColor}
		/>

		<button class="remove-btn" onclick={()=>onRemove(colorStop.id)} disabled={!canRemove} title="Rimuovi colore">
			🗑️
		</button>
	</div>

	<!-- Slider per la posizione-->
	<div class="slider-wrapper">
		<Slider
			label="Posizione"
			bind:value={colorStop.stop}
			min={0}
			max={100}
			step={1}
			unit="%"
		/>
	</div>
</div>

<style>
	.color-stop {
		background: #f8fafc;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		padding: 1rem;
	}

	.stop-header {
		display: grid;
		grid-template-columns: 1fr 40px;
		gap: 0.75rem;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.remove-btn {
		font: inherit;
		background: transparent;
		border: none;
		font-size: 1.1rem;
		cursor: pointer;
		color: #94a3b8;
		transition: color 0.2s ease;
	}
	.remove-btn:hover {
		color: #ef4444;
	}
	.remove-btn:disabled {
		color: #e2e8f0;
		cursor: not-allowed;
	}

	.slider-wrapper {
		padding-top: 1rem;
	}
</style>
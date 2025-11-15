<!-- src/lib/components/css-generator/GlassmorphismGenerator.svelte -->
<script lang="ts">
	import type { GlassState } from './types.ts';
	import Slider from '$lib/components/shared/Slider.svelte';
	import SharedColorControls from '$lib/components/shared/SharedColorControls.svelte';


	interface Props {
		state: GlassState;
	}

	let { state = $bindable() }: Props = $props();

	// Funzione per legare i valori di SharedColorControls
	function updateColor(source: 'palette' | 'custom', palette: string, custom: string) {
		state.source = source;
		state.paletteColor = palette;
		state.customColor = custom;
	}
</script>

<div class="glass-controls">
	<div class="control-group">
		<span class="group-label">Proprietà</span>
		<div class="sliders-wrapper">
			<Slider
				label="Sfuocatura (Blur)"
				bind:value={state.blur}
				min={0}
				max={40}
				step={0.5}
				unit="px"
			/>
			<Slider
				label="Saturazione"
				bind:value={state.saturation}
				min={0}
				max={200}
				step={1}
				unit="%"
			/>
			<Slider
				label="Luminosità"
				bind:value={state.brightness}
				min={0}
				max={150}
				step={1}
				unit="%"
			/>
			<Slider
				label="Opacità Sfondo"
				bind:value={state.opacity}
				min={0.05}
				max={0.5}
				step={0.01}
				unit=""
			/>
		</div>
	</div>

	<div class="control-group">
		<span class="group-label">Colore Sfondo</span>
		<SharedColorControls
			source={state.source}
			paletteColor={state.paletteColor}
			customColor={state.customColor}
			{updateColor}
		/>
	</div>
</div>

<style>
	.glass-controls {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.control-group {
		display: grid;
		grid-template-columns: 80px 1fr;
		align-items: flex-start;
		gap: 1rem;
	}
	.group-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #475569;
		padding-top: 1rem;
	}
	.sliders-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 1rem;
	}
</style>
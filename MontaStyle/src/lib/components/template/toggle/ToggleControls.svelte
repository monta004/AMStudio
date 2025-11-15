<script lang="ts">
	import type { ToggleControlsProps, ColorSource } from './types.ts';

	import Slider from '$lib/components/shared/Slider.svelte';
	import SharedColorControls from '$lib/components/shared/SharedColorControls.svelte';

	let { state = $bindable() }: ToggleControlsProps = $props();

	function updateTrackOff(source: ColorSource, palette: string, custom: string) {
		state.sourceTrackOff = source;
		state.paletteColorTrackOff = palette;
		state.customColorTrackOff = custom;
	}
	function updateTrackOn(source: ColorSource, palette: string, custom: string) {
		state.sourceTrackOn = source;
		state.paletteColorTrackOn = palette;
		state.customColorTrackOn = custom;
	}
	function updateThumb(source: ColorSource, palette: string, custom: string) {
		state.sourceThumb = source;
		state.paletteColorThumb = palette;
		state.customColorThumb = custom;
	}
</script>

<div class="toggle-controls">
	<!-- Gruppo Colori -->
	<div class="control-group">
		<span class="group-label">Colori</span>
		<div class="colors-wrapper">
            <label class="group-label">Sfondo (Spento)
			<SharedColorControls
				source={state.sourceTrackOff}
				paletteColor={state.paletteColorTrackOff}
				customColor={state.customColorTrackOff}
				updateColor={updateTrackOff}
			/></label>
            <label class="group-label">Sfondo (Acceso)
			<SharedColorControls
				
				source={state.sourceTrackOn}
				paletteColor={state.paletteColorTrackOn}
				customColor={state.customColorTrackOn}
				updateColor={updateTrackOn}
			/></label>
            <label class="group-label">Pollice
			<SharedColorControls
				source={state.sourceThumb}
				paletteColor={state.paletteColorThumb}
				customColor={state.customColorThumb}
				updateColor={updateThumb}
			/></label>
		</div>
	</div>

	<!-- Gruppo Dimensioni -->
	<div class="control-group">
		<span class="group-label">Dimensioni</span>
		<div class="sliders-wrapper">
			<Slider label="Larghezza" bind:value={state.width} min={30} max={100} step={1} unit="px" />
			<Slider label="Altezza" bind:value={state.height} min={16} max={50} step={1} unit="px" />
			<Slider
				label="Dim. Pollice"
				bind:value={state.thumbSize}
				min={12}
				max={46}
				step={1}
				unit="px"
			/>
			<Slider
				label="Bordo Sfondo"
				bind:value={state.borderRadius}
				min={0}
				max={50}
				step={1}
				unit="px"
			/>
			<Slider
				label="Bordo Pollice"
				bind:value={state.thumbBorderRadius}
				min={0}
				max={50}
				step={1}
				unit="px"
			/>
		</div>
	</div>

	<!-- Gruppo Animazione -->
	<div class="control-group">
		<span class="group-label">Animazione</span>
		<div class="sliders-wrapper">
			<Slider
				label="Durata Transizione"
				bind:value={state.transitionDuration}
				min={0.1}
				max={1}
				step={0.05}
				unit="s"
			/>
		</div>
	</div>
</div>

<style>
	.toggle-controls {
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
	.colors-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
</style>
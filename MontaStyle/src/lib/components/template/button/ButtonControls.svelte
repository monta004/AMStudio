<script lang="ts">
	import type { ButtonControlsProps, ColorSource } from './typesButton.ts';
	import Slider from '$lib/components/shared/Slider.svelte';
	import SharedColorControls from '$lib/components/shared/SharedColorControls.svelte';

	let { state = $bindable() }: ButtonControlsProps = $props();

	// --- Funzioni per SharedColorControls ---
	function updateBg(source: ColorSource, palette: string, custom: string) {
		state.sourceBg = source;
		state.paletteColorBg = palette;
		state.customColorBg = custom;
	}
	function updateText(source: ColorSource, palette: string, custom: string) {
		state.sourceText = source;
		state.paletteColorText = palette;
		state.customColorText = custom;
	}
	function updateBorder(source: ColorSource, palette: string, custom: string) {
		state.sourceBorder = source;
		state.paletteColorBorder = palette;
		state.customColorBorder = custom;
	}
	function updateShadow(source: ColorSource, palette: string, custom: string) {
		state.sourceShadow = source;
		state.paletteColorShadow = palette;
		state.customColorShadow = custom;
	}
</script>

<div class="button-controls">
	<!-- Gruppo Contenuto -->
	<div class="control-group">
		<span class="group-label">Contenuto</span>
		<div class="text-input-wrapper">
			<label for="btn-text">Testo</label>
			<input id="btn-text" type="text" bind:value={state.text} />
		</div>
	</div>

	<!-- Gruppo Colori -->
	<div class="control-group">
		<span class="group-label">Colori</span>
		<div class="colors-wrapper">
            <label class="group-label">Sfondo
            <SharedColorControls
				source={state.sourceBg}
				paletteColor={state.paletteColorBg}
				customColor={state.customColorBg}
				updateColor={updateBg}
			/>
            </label>
            <label class="group-label">Testo
            <SharedColorControls
				source={state.sourceText}
				paletteColor={state.paletteColorText}
				customColor={state.customColorText}
				updateColor={updateText}
			/>
            </label>

            <label class="group-label">Bordo
            <SharedColorControls
				source={state.sourceBorder}
				paletteColor={state.paletteColorBorder}
				customColor={state.customColorBorder}
				updateColor={updateBorder}
			/>
            </label>

            <label class="group-label">Ombra
			<SharedColorControls
				source={state.sourceShadow}
				paletteColor={state.paletteColorShadow}
				customColor={state.customColorShadow}
				updateColor={updateShadow}
			/>
            </label>
		</div>
	</div>

	<!-- Gruppo Stile -->
	<div class="control-group">
		<span class="group-label">Stile</span>
		<div class="sliders-wrapper">
			<Slider
				label="Dimensione Font"
				bind:value={state.fontSize}
				min={12}
				max={32}
				step={1}
				unit="px"
			/>
			<Slider
				label="Peso Font"
				bind:value={state.fontWeight}
				min={100}
				max={900}
				step={100}
				unit=""
			/>
			<Slider
				label="Padding Orizz."
				bind:value={state.paddingX}
				min={0}
				max={60}
				step={1}
				unit="px"
			/>
			<Slider
				label="Padding Vert."
				bind:value={state.paddingY}
				min={0}
				max={40}
				step={1}
				unit="px"
			/>
			<Slider
				label="Bordo Arrotondato"
				bind:value={state.borderRadius}
				min={0}
				max={50}
				step={1}
				unit="px"
			/>
			<Slider
				label="Spessore Bordo"
				bind:value={state.borderWidth}
				min={0}
				max={10}
				step={1}
				unit="px"
			/>
		</div>
	</div>

	<!-- Gruppo Ombra -->
	<div class="control-group">
		<span class="group-label">Ombra</span>
		<div class="sliders-wrapper">
			<Slider
				label="Offset X"
				bind:value={state.shadowOffsetX}
				min={-20}
				max={20}
				step={1}
				unit="px"
			/>
			<Slider
				label="Offset Y"
				bind:value={state.shadowOffsetY}
				min={-20}
				max={20}
				step={1}
				unit="px"
			/>
			<Slider
				label="Sfuocatura (Blur)"
				bind:value={state.shadowBlur}
				min={0}
				max={50}
				step={1}
				unit="px"
			/>
			<Slider
				label="Diffusione (Spread)"
				bind:value={state.shadowSpread}
				min={-20}
				max={20}
				step={1}
				unit="px"
			/>
			<Slider
				label="Opacità Ombra"
				bind:value={state.shadowOpacity}
				min={0.01}
				max={1}
				step={0.01}
				unit=""
			/>
		</div>
	</div>
</div>

<style>
	/* Stili copiati da ToggleControls per coerenza */
	.button-controls {
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
	.text-input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 1rem;
	}
	.text-input-wrapper label {
		font-size: 0.875rem;
		color: #4b5563;
	}
	.text-input-wrapper input {
		font: inherit;
		font-size: 1rem;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		border: 1px solid #d1d5db;
	}
</style>
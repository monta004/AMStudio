<script lang="ts">
	import type { ToggleState } from './types.ts';
	import { derivedPalette } from '$lib/state/paletteState.svelte.ts';
	import CodeOutput from '$lib/components/shared/CodeOutput.svelte';
	import ToggleView from './ToggleView.svelte';
	import ToggleControls from './ToggleControls.svelte';

	// Colori dalla palette
	const defaultColors = derivedPalette.generatedColors;

	// Stato iniziale per il toggle
	const initialState: ToggleState = {
		width: 60,
		height: 32,
		thumbSize: 26,
		borderRadius: 30,
		thumbBorderRadius: 26, // Aggiunto
		transitionDuration: 0.3,

		sourceTrackOff: 'custom',
		paletteColorTrackOff: '#E5E7EB',
		customColorTrackOff: '#E5E7EB',

		sourceTrackOn: 'palette',
		paletteColorTrackOn: defaultColors[0] || '#3B82F6',
		customColorTrackOn: '#3B82F6',

		sourceThumb: 'custom',
		paletteColorThumb:'#FFFFFF',
		customColorThumb: '#FFFFFF'
	};

	// STATO PRINCIPALE
	let toggleState = $state(initialState);

	// Calcola i colori finali
	const trackOffColor = $derived.by(() => {
		return toggleState.sourceTrackOff === 'palette'
			? toggleState.paletteColorTrackOff
			: toggleState.customColorTrackOff;
	});
	const trackOnColor = $derived.by(() => {
		return toggleState.sourceTrackOn === 'palette'
			? toggleState.paletteColorTrackOn
			: toggleState.customColorTrackOn;
	});
	const thumbColor = $derived.by(() => {
		return toggleState.sourceThumb === 'palette'
			? toggleState.paletteColorThumb
			: toggleState.customColorThumb;
	});

	// Calcola lo scostamento del pollice
	const thumbOffset = $derived.by(() => {
		return (toggleState.height - toggleState.thumbSize) / 2;
	});
	const thumbTranslateX = $derived.by(() => {
		return toggleState.width - toggleState.thumbSize - thumbOffset * 2;
	});

	// Derivato per le variabili CSS Preview
	const cssVariables = $derived.by(() => {
		return [
			`--toggle-width: ${toggleState.width}px;`,
			`--toggle-height: ${toggleState.height}px;`,
			`--toggle-radius: ${toggleState.borderRadius}px;`,
			`--toggle-transition: ${toggleState.transitionDuration}s;`,
			`--track-color-off: ${trackOffColor};`,
			`--track-color-on: ${trackOnColor};`,
			`--thumb-color: ${thumbColor};`,
			`--thumb-size: ${toggleState.thumbSize}px;`,
			`--thumb-border-radius: ${toggleState.thumbBorderRadius}px;`, // Aggiunto
			`--thumb-offset: ${thumbOffset.toFixed(2)}px;`,
			`--thumb-translate-x: ${thumbTranslateX.toFixed(2)}px;`
		].join(' ');
	});

	// Derivato per il codice HTML CodeOutput
	const htmlCode = $derived.by(() => {
		return `<label class="toggle-switch">
  <input type="checkbox">
  <span class="slider"></span>
</label>`;
	});

	// Derivato per il codice CSS CodeOutput
	const cssCode = $derived.by(() => {
		return `:root {
  /* Dimensioni */
  --toggle-width: ${toggleState.width}px;
  --toggle-height: ${toggleState.height}px;
  --toggle-radius: ${toggleState.borderRadius}px;
  --toggle-transition: ${toggleState.transitionDuration}s;
  
  /* Colori */
  --track-color-off: ${trackOffColor};
  --track-color-on: ${trackOnColor};
  --thumb-color: ${thumbColor};

  /* Calcoli interni */
  --thumb-size: ${toggleState.thumbSize}px;
  --thumb-border-radius: ${toggleState.thumbBorderRadius}px; /* Aggiunto */
  --thumb-offset: ${thumbOffset.toFixed(2)}px;
  --thumb-translate-x: ${thumbTranslateX.toFixed(2)}px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: var(--toggle-width);
  height: var(--toggle-height);
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--track-color-off);
  border-radius: var(--toggle-radius);
  transition: background-color var(--toggle-transition) ease;
}

.slider::before {
  position: absolute;
  content: "";
  height: var(--thumb-size);
  width: var(--thumb-size);
  left: var(--thumb-offset);
  bottom: var(--thumb-offset);
  background-color: var(--thumb-color);
  border-radius: var(--thumb-border-radius); /* Modificato */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all var(--toggle-transition) ease;
}

input:checked + .slider {
  background-color: var(--track-color-on);
}

input:checked + .slider::before {
  transform: translateX(var(--thumb-translate-x));
}`;
	});
</script>

<div class="generator-wrapper">

	<div class="generator-header">
		<h2 class="generator-title">Generatore Toggle Button</h2>
	</div>

	<!-- Layout Principale (Preview + Controlli) -->
	<div class="generator-layout">
		<!-- Colonna Sinistra (Preview + Output) -->
		<div class="column-left">
			<!-- Preview Box -->
			<div class="preview-wrapper">
				<div class="preview-background">
					<ToggleView {cssVariables} />
				</div>
			</div>

			<!-- Output Codice -->
			<CodeOutput {htmlCode} {cssCode} />
		</div>

		<!-- Colonna Destra (Controlli) -->
		<div class="column-right">
			<ToggleControls bind:state={toggleState} />
		</div>
	</div>
</div>

<style>
	.generator-wrapper {
		background: #ffffff;
		border-radius: 16px;
		border: 1px solid #e5e7eb;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}

	.generator-header {
		padding: 1.5rem 1.75rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.generator-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #1e293b;
		margin: 0;
	}

	.generator-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		padding: 1.5rem;
	}

	@media (min-width: 1024px) {
		.generator-layout {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
			gap: 2rem;
			padding: 1.75rem;
		}
	}

	.column-left {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		min-height: 0;
	}

	.preview-wrapper {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffffff;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
		padding: 1.5rem;
		min-height: 300px;
	}

	.preview-background {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		background-image: linear-gradient(45deg, #f3f4f6 25%, transparent 25%),
			linear-gradient(-45deg, #f3f4f6 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #f3f4f6 75%),
			linear-gradient(-45deg, transparent 75%, #f3f4f6 75%);
		background-size: 20px 20px;
		background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.column-right {
		background: #ffffff;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		max-height: 550px;
		overflow-y: auto;
	}

	@media (min-width: 1024px) {
		.column-right {
			padding: 1.75rem;
		}
	}
</style>
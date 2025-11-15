<script lang="ts">
	import { colorState, colorActions } from '$lib/state/colorState.svelte.ts';
	import Slider from '$lib/components/shared/Slider.svelte';
	import type { SliderProps } from '$lib/components/shared/types';

	// Configurazione dinamica per gli slider
	const sliderConfig : SliderProps[] = $derived.by(() => {
		if (colorState.mode === 'rgb') {
			return [
				{
					label: 'R',
					value: colorState.rgb.r,
					min: 0,
					max: 255,
					step: 1,
                    unit:'',
					onchange: (v: number) =>
						colorActions.updateFromRgb(v, colorState.rgb.g, colorState.rgb.b)
				},
				{
					label: 'G',
					value: colorState.rgb.g,
					min: 0,
					max: 255,
					step: 1,
                    unit:'',
					onchange: (v: number) =>
						colorActions.updateFromRgb(colorState.rgb.r, v, colorState.rgb.b)
				},
				{
					label: 'B',
					value: colorState.rgb.b,
					min: 0,
					max: 255,
					step: 1,
                    unit:'',
					onchange: (v: number) =>
						colorActions.updateFromRgb(colorState.rgb.r, colorState.rgb.g, v)
				}
			];
		} else {// HSL
			return [
				{
					label: 'H',
					value: colorState.hsl.h,
					min: 0,
					max: 360,
					step: 1,
					unit: '°',
					onchange: (v: number) =>
						colorActions.updateFromHsl(v, colorState.hsl.s, colorState.hsl.l)
				},
				{
					label: 'S',
					value: colorState.hsl.s,
					min: 0,
					max: 100,
					step: 1,
					unit: '%',
					onchange: (v: number) =>
						colorActions.updateFromHsl(colorState.hsl.h, v, colorState.hsl.l)
				},
				{
					label: 'L',
					value: colorState.hsl.l,
					min: 0,
					max: 100,
					step: 1,
					unit: '%',
					onchange: (v: number) =>
						colorActions.updateFromHsl(colorState.hsl.h, colorState.hsl.s, v)
				}
			];
		}
	});
</script>

<div class="controls-container">
	<!-- Tab per RGB/HSL -->
	<div class="source-tabs">
		<button
			class="tab"
			class:active={colorState.mode === 'rgb'}
			onclick={() => (colorState.mode = 'rgb')}
		>
			RGB
		</button>
		<button
			class="tab"
			class:active={colorState.mode === 'hsl'}
			onclick={() => (colorState.mode = 'hsl')}
		>
			HSL
		</button>
	</div>

	<!-- Layout a 2 colonne (Input Colore e Sliders) -->
	<div class="color-grid">
		<div class="color-input-wrapper">
			<input
				type="color"
				class="color-input-large"
				value={colorState.hex}
				oninput={(e) => colorActions.updateFromHex(e.currentTarget.value)}
			/>
		</div>

		<div class="sliders-wrapper">
			{#each sliderConfig as config}
				<Slider
					label={config.label}
					value={config.value}
					min={config.min}
					max={config.max}
					step={config.step}
					unit={config.unit || ''}
					onchange={config.onchange}
				/>
			{/each}
		</div>
	</div>

	<!-- Controllo Alpha -->
	<div class="alpha-control">
		<label class="alpha-label">
			<input
				type="checkbox"
				class="alpha-checkbox"
				bind:checked={colorState.hasAlpha}
			/>
			Canale Alpha
		</label>
		{#if colorState.hasAlpha}
			<div class="alpha-slider">
				<Slider
					label="Trasparenza"
					bind:value={colorState.alpha}
					min={0}
					max={1}
					step={0.01}
				/>
			</div>
		{/if}
	</div>
</div>

<style>
	.controls-container {
		background-color: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.source-tabs {
		display: flex;
		background-color: #f9fafb;
		padding: 0.5rem;
		border-top-left-radius: 0.75rem;
		border-top-right-radius: 0.75rem;
		border-bottom: 1px solid #e5e7eb;
	}
	.tab {
		flex: 1;
		padding: 0.5rem 1rem;
		border: none;
		background-color: transparent;
		color: #6b7280;
		font-weight: 600;
		font-size: 0.875rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.tab.active {
		background-color: #ffffff;
		color: #3b82f6;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.color-grid {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.5rem;
		padding: 1.5rem;
		align-items: center;
	}

	.color-input-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.color-input-large {
		width: 120px;
		height: 120px;
		border: none;
		border-radius: 0.75rem;
		cursor: pointer;
		background-color: transparent;
		overflow: hidden;
	}
	.color-input-large::-webkit-color-swatch {
		border-radius: 0.75rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	.color-input-large::-moz-color-swatch {
		border-radius: 0.75rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.sliders-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		min-width: 0;
	}

	.alpha-control {
		padding: 1rem 1.5rem 1.5rem;
		border-top: 1px solid #f3f4f6;
	}
	.alpha-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
		cursor: pointer;
	}
	.alpha-checkbox {
		width: 16px;
		height: 16px;
		border-radius: 0.25rem;
		accent-color: #3b82f6;
	}
	.alpha-slider {
		margin-top: 1rem;
		padding-left: 0.25rem;
	}

	@media (max-width: 640px) {
		.color-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.color-input-large {
			width: 100%;
			height: 100px;
		}
	}
</style>
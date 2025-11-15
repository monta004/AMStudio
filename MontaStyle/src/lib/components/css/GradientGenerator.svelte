<!--GradientGenerator.svelte -->
<script lang="ts">
	import type { GradientState} from './types.ts';
	import Slider from '$lib/components/shared/Slider.svelte';
	import ColorStopControls from './ColorStopControl.svelte';

	import type {TabOption } from '$lib/components/shared/types.ts';
	import Tabs from '$lib/components/shared/Tabs.svelte';

	interface Props {
		state: GradientState;
	}

	let { state = $bindable() }: Props = $props();

	// Definizioni per Tabs
	const typeTabs: TabOption[] = [
		{ label: 'Lineare', value: 'linear' },
		{ label: 'Radiale', value: 'radial' },
		{ label: 'Conico', value: 'conic' }
	];

	const shapeTabs: TabOption[] = [
		{ label: 'Cerchio', value: 'circle' },
		{ label: 'Ellisse', value: 'ellipse' }
	];


	function addColor() {
		const lastColor = state.colors[state.colors.length - 1];
		state.colors.push({
			id: crypto.randomUUID(),
			source: lastColor.source,
			paletteColor: lastColor.paletteColor,
			customColor: lastColor.customColor,
			stop: 100
		});
	}

	function removeColor(id: string) {
		state.colors = state.colors.filter((c) => c.id !== id);
	}
</script>

<div class="gradient-controls">
	<!-- Tabs per tipo di gradiente -->
	<div class="control-group">
		<span class="group-label">Tipo</span>
		<Tabs options={typeTabs} bind:activeTab={state.type} />
	</div>

	<!-- Slider per Angolo (solo per lineare/conico) -->
	{#if state.type !== 'radial'}
		<div class="control-group">
			<span class="group-label">Angolo</span>
			<div class="slider-wrapper">
				<Slider
					label="Angolo"
					bind:value={state.angle}
					min={0}
					max={360}
					step={1}
					unit="°"
				/>
			</div>
		</div>
	{/if}

	<!-- Tabs per Forma (solo per radiale) -->
	{#if state.type === 'radial'}
		<div class="control-group">
			<span class="group-label">Forma</span>
			<Tabs options={shapeTabs} bind:activeTab={state.shape} />
		</div>
	{/if}

	<!-- Lista di Color Stop -->
	<div class="color-stops-list">
		{#each state.colors as color, i (color.id)}
			<ColorStopControls
				bind:colorStop={state.colors[i]}
				onRemove={() => removeColor(color.id)}
				canRemove={state.colors.length > 2}
			/>
		{/each}
	</div>

	<!-- Pulsante Aggiungi Colore -->
	<button class="add-color-btn" onclick={addColor}>+ Aggiungi Colore</button>
</div>

<style>
	.gradient-controls {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.control-group {
		display: grid;
		grid-template-columns: 80px 1fr;
		align-items: center;
		gap: 1rem;
	}
	.group-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #475569;
	}

	.slider-wrapper {
		padding-top: 1rem;
	}

	.color-stops-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1rem;
	}

	.add-color-btn {
		font: inherit;
		font-weight: 500;
		color: #3b82f6;
		background: #eff6ff;
		border: 1px dashed #bde0fe;
		padding: 0.75rem;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.add-color-btn:hover {
		background: #dbeafe;
		border-color: #3b82f6;
	}
</style>
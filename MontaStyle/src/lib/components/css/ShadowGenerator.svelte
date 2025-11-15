<!-- src/lib/components/css/ShadowGenerator.svelte -->
<script lang="ts">
	import type { ShadowState } from './types.ts';
	import Slider from '$lib/components/shared/Slider.svelte';
	import SharedColorControls from '$lib/components/shared/SharedColorControls.svelte';

	/*import type {TabOption } from '$lib/components/shared/types.ts';
	import Tabs from '$lib/components/shared/Tabs.svelte';*/
	
	interface Props {
		state: ShadowState;
	}

	let { state = $bindable() }: Props = $props();

	// Funzione helper per legare i valori di SharedColorControls
	function updateColor(source: 'palette' | 'custom', palette: string, custom: string) {
		state.source = source;
		state.paletteColor = palette;
		state.customColor = custom;
	}

	//lo stato state.inset è un boolean come usare Tabs?????? line:91
	/*const typeTabs: TabOption[] = [
		{ label: 'Esterna (Outset)', value: 'outset' },
		{ label: 'Interna (Inset)', value: 'inset' },
	];*/
</script>

<div class="shadow-controls">
	<div class="control-group">
		<span class="group-label">Proprietà</span>
		<div class="sliders-wrapper">
			<Slider
				label="Offset X"
				bind:value={state.offsetX}
				min={-20}
				max={20}
				step={1}
				unit="px"
			/>
			<Slider
				label="Offset Y"
				bind:value={state.offsetY} 
				min={-20}
				max={20}
				step={1}
				unit="px"
			/>
			<Slider
				label="Sfuocatura (Blur)"
				bind:value={state.blur}
				min={0}
				max={50}
				step={1}
				unit="px"
			/>
			<Slider
				label="Diffusione (Spread)"
				bind:value={state.spread}
				min={-20}
				max={20}
				step={1}
				unit="px"
			/>
			<Slider
				label="Opacità Colore"
				bind:value={state.opacity}
				min={0.05}
				max={1}
				step={0.01}
				unit=""
			/>
		</div>
	</div>

	<!-- Sezione Colore -->
	<div class="control-group">
		<span class="group-label">Colore Ombra</span>
		<SharedColorControls
			source={state.source}
			paletteColor={state.paletteColor}
			customColor={state.customColor}
			{updateColor}
		/>
	</div>

	<!-- Sezione Opzioni (Inset) -->
	<div class="control-group">
		<span class="group-label">Opzioni</span>
		<div class="source-tabs">
			<button class:active={!state.inset} onclick={() => (state.inset = false)}>
				Esterna (Outset)
			</button>
			<button class:active={state.inset} onclick={() => (state.inset = true)}>
				Interna (Inset)
			</button>
		</div>
	</div>
</div>

<style>
	.shadow-controls {
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

	.source-tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}
	.source-tabs button {
		font: inherit;
		font-size: 0.875rem;
		padding: 0.6rem;
		border-radius: 8px;
		border: 2px solid #e5e7eb;
		background-color: #f8fafc;
		color: #475569;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
	}
	.source-tabs button.active {
		background-color: #3b82f6;
		border-color: #3b82f6;
		color: white;
		box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
	}
	.source-tabs button:hover:not(.active) {
		border-color: #d1d5db;
		background-color: #ffffff;
	}
</style>
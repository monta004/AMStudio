<!-- src/lib/components/css-generator/SharedColorControls.svelte -->
<script lang="ts">
	import type { SharedColorControlsProps } from './types';
	import { derivedPalette } from '$lib/state/paletteState.svelte.ts';

	let { source, paletteColor, customColor, updateColor }: SharedColorControlsProps = $props();

	// Deriva il colore corrente per l'input custom
	const currentColor = $derived.by(() => {
		return source === 'palette' ? paletteColor : customColor;
	});

	// Aggiorna il colore custom quando si cambia la palette
	$effect(() => {
		if (source === 'palette') {
			updateColor(source, paletteColor, paletteColor);
		}
	});
</script>

<div class="shared-controls-grid">
	<div class="source-tabs">
		<button
			class:active={source === 'palette'}
			onclick={() => updateColor('palette', paletteColor, customColor)}
		>
			🎨
		</button>
		<button
			class:active={source === 'custom'}
			onclick={() => updateColor('custom', paletteColor, customColor)}
		>
			🖌️
		</button>
	</div>

	<!-- Input Colore -->
	<div class="color-input-wrapper">
		{#if source === 'palette'}
			<div class="palette-grid">
				{#each derivedPalette.generatedColors as color}
					<button
						class="color-swatch-btn"
						class:active={paletteColor === color}
						style="background-color: {color}"
						onclick={() => updateColor(source, color, customColor)}
						title={color}
					></button>
				{/each}
			</div>
		{:else}
			<input
				type="color"
				class="custom-color-input"
				value={customColor}
				oninput={(e) => updateColor(source, paletteColor, e.currentTarget.value)}
			/>
		{/if}
	</div>

	<!-- Input Colore Testuale -->
	<div class="color-text-input-wrapper">
		<input type="text" class="color-text-input" value={currentColor} readonly />
	</div>
</div>

<style>

	.shared-controls-grid {
		display: grid;
		grid-template-columns: 68px 1fr auto;
		gap: 0.75rem;
		align-items: center;
		width: 100%;
	}

	.source-tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px;
	}
	.source-tabs button {
		font: inherit;
		font-size: 0.8rem;
		padding: 0.4rem;
		border-radius: 6px;
		border: 2px solid #e5e7eb;
		background-color: #fff;
		color: #475569;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
	}
	.source-tabs button.active {
		background-color: #3b82f6;
		border-color: #3b82f6;
		color: white;
	}

	.color-input-wrapper {
		max-width: 200px;
		min-width: 0;
	}

	.palette-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}
	.color-swatch-btn {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		border: 2px solid #e5e7eb;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.color-swatch-btn:hover {
		transform: scale(1.1);
	}
	.color-swatch-btn.active {
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
	}

	.custom-color-input {
		width: 100%;
		height: 32px;
		padding: 0;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		overflow: hidden;
		cursor: pointer;
	}

	.color-text-input {
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.8rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		width: 100px;
		background: #fff;
	}
</style>
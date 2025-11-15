<!-- src/routes/palette/+page.svelte -->
<script lang="ts">
	import ColorSelector from '$lib/components/color/ColorSelector.svelte';
	import PaletteGenerator from '$lib/components/palette/PaletteGenerator.svelte';

	import type {TabOption } from '$lib/components/shared/types.ts';
	import Tabs from '$lib/components/shared/Tabs.svelte';

	// Stato locale per le tab
	type Tab = 'selector' | 'generator';
	let activeTab: Tab = $state('selector');

	const typeTabs: TabOption[] = [
		{ label: '🖌️ Selettore Colore', value: 'selector' },
		{ label: '🎨 Generatore Palette', value: 'generator' }
	];
</script>

<div class="generator-wrapper">
	<!-- Intestazione e Tabs -->
	<div class="generator-header">
		<h2 class="generator-title">Color Studio</h2>
		<Tabs options={typeTabs} bind:activeTab />
	</div>
	<div class="generator-layout">
		{#if activeTab === 'selector'}
			<ColorSelector />
		{:else}
			<PaletteGenerator />
		{/if}
	</div>
</div>

<style>
	.generator-wrapper {
		max-width: 1400px;
		margin: 0 auto;
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
		margin: 0 0 1.5rem;
	}

	.generator-layout {
		padding: 1.5rem;
	}

	@media (min-width: 1024px) {
		.generator-layout {
			padding: 1.75rem;
		}
	}
</style>
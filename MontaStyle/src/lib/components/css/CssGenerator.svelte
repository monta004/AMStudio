<!-- src/lib/components/css/CssGenerator.svelte -->
<script lang="ts">

	import type { CssGeneratorState } from './types.ts';
	import { derivedPalette } from '$lib/state/paletteState.svelte.ts';
	import { colorUtils } from '$lib/components/color/colorUtils.ts';

	import GradientGenerator from './GradientGenerator.svelte';
	import GlassmorphismGenerator from './GlassmorphismGenerator.svelte';
	import ShadowGenerator from './ShadowGenerator.svelte';

	import CssCodeOutput from './CssCodeOutput.svelte';

	import type {TabOption } from '$lib/components/shared/types.ts';
	import Tabs from '$lib/components/shared/Tabs.svelte';

	// Stato per le tab
	type Tab = 'gradient' | 'glass' | 'shadow';

	let activeTab : Tab = $state('gradient');

	const typeTabs: TabOption[] = [
		{ label: '✨ Sfumature', value: 'gradient' },
		{ label: '🧊 Effetto Vetro', value: 'glass' },
		{ label: 'boxShadow', value: 'shadow' }
	];

	//inizializzo lo stato principale
	const currentColors = derivedPalette.generatedColors;
	const initialState: CssGeneratorState = {
		gradient: {
			type: 'linear',
			angle: 90,
			shape: 'circle',
			colors: [
				{
					id: crypto.randomUUID(),
					source: 'palette',
					paletteColor: currentColors[0] || '#60A5FA',
					customColor: '#60A5FA',
					stop: 0
				},
				{
					id: crypto.randomUUID(),
					source: 'palette',
					paletteColor: currentColors[3] || '#E0F2FE',
					customColor: '#E0F2FE',
					stop: 100
				}
			]
		},
		glass: {
			blur: 10,
			saturation: 150,
			brightness: 110,
			opacity: 0.2,
			source: 'palette',
			paletteColor: '#FFFFFF',
			customColor: '#FFFFFF'
		},
		shadow: {
			offsetX: 0,
			offsetY: 10,
			blur: 15,
			spread: -3,
			opacity: 0.1,
			inset: false,
			source: 'custom',
			paletteColor: '#000000',
			customColor: '#000000'
		}
	};

	//STATO PRINCIPALE
	let cssGenState = $state(initialState);
	$inspect(cssGenState.gradient.colors);

	//Derivato per il Gradiente
	const gradientCss = $derived.by(() => {
		const { type, angle, shape, colors } = cssGenState.gradient;
		const colorStops = colors
			.map((c) => {
				const color = c.source === 'palette' ? c.paletteColor : c.customColor;
				return `${color} ${c.stop}%`;
			})
			.join(', ');

		switch (type) {
			case 'linear':
				return `background: linear-gradient(${angle}deg, ${colorStops});`;
			case 'radial':
				return `background: radial-gradient(${shape}, ${colorStops});`;
			case 'conic':
				return `background: conic-gradient(from ${angle}deg, ${colorStops});`;
			default:
				return 'background: #fff;';
		}
	});

	//Derivato per l'Ombra
	const shadowColorRgb = $derived.by(() => {
		const { source, paletteColor, customColor } = cssGenState.shadow;
		const hex = source === 'palette' ? paletteColor : customColor;
		const { r, g, b } = colorUtils.hexToRgb(hex);
		return `${r}, ${g}, ${b}`;
	});

	const shadowCss = $derived.by(() => {
		const { offsetX, offsetY, blur, spread, opacity, inset } = cssGenState.shadow;
		const insetStr = inset ? 'inset ' : '';
		return `box-shadow: ${insetStr}${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(${shadowColorRgb}, ${opacity});`;
	});

	//Derivato per l'Effetto Vetro
	const glassColorRgb = $derived.by(() => {
		const { source, paletteColor, customColor } = cssGenState.glass;
		const hex = source === 'palette' ? paletteColor : customColor;
		const { r, g, b } = colorUtils.hexToRgb(hex);
		return `${r}, ${g}, ${b}`;
	});

	const glassCss = $derived.by(() => {
		const { blur, saturation, brightness, opacity } = cssGenState.glass;
		return [
			`background: rgba(${glassColorRgb}, ${opacity});`,
			`backdrop-filter: blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%);`,
			`-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%);`
		].join(' ');
	});

	const currentCss = $derived.by(() => {
		switch (activeTab) {
			case 'gradient':
				return gradientCss;
			case 'glass':
				return glassCss;
			case 'shadow':
				return shadowCss;
			default:
				return '';
		}
	});

	const previewBoxStyle = $derived.by(() => {
		switch (activeTab) {
			case 'gradient':
				return gradientCss;
			case 'glass':
				return `${glassCss} box-shadow: 0 4px 12px rgba(0,0,0,0.1);`;
			case 'shadow':
				return `${shadowCss} background-color: #f8fafc;`;
			default:
				return '';
		}
	});

</script>



<div class="generator-wrapper">
	<!-- Intestazione e Tabs -->
	<div class="generator-header">
		<h2 class="generator-title">Generatore CSS</h2>
		<Tabs options={typeTabs} bind:activeTab />
	</div>

	<!-- Layout Principale (Preview + Controlli) -->
	<div class="generator-layout">
		<!-- Colonna Sinistra (Preview + Output) -->
		<div class="column-left">
			<!-- Preview Box -->
			<div class="preview-wrapper">
				<div class="preview-background">
					<div class="preview-box" style={previewBoxStyle}>
						{#if activeTab === 'glass'}
							<span>Glassmorphism</span>
						{/if}
					</div>
				</div>
			</div>
			<!-- Output CSS -->
			<CssCodeOutput css={currentCss} />
		</div>

		<!-- Colonna Destra (Controlli) -->
		<div class="column-right">
			{#if activeTab === 'gradient'}
				<GradientGenerator bind:state={cssGenState.gradient} />
			{:else if activeTab === 'glass'}
				<GlassmorphismGenerator bind:state={cssGenState.glass} />
			{:else if activeTab === 'shadow'}
				<ShadowGenerator bind:state={cssGenState.shadow} />
			{/if}
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
		margin: 0 0 1.5rem;
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

	.preview-box {
		width: 100%;
		height: 200px;
		border-radius: 10px;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		color: #334155;
	}

	.column-right {
		background: #ffffff;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		max-height: 700px; /* Aggiunge scroll se i controlli sono troppi */
		overflow-y: auto;
	}

	@media (min-width: 1024px) {
		.column-right {
			padding: 1.75rem;
		}
	}
</style>
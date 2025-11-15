<script lang="ts">
	import { colorState } from '$lib/state/colorState.svelte.ts';
	import { colorUtils } from '../color/colorUtils.ts';
	import type { ColorSwatchProps } from './types.ts';

	let { colorHex }: ColorSwatchProps = $props();

	let isCopied = $state(false);
	let timeoutId: any = null;

	const formattedColor = $derived.by(() => {
		const rgb = colorUtils.hexToRgb(colorHex);
		if (!rgb) return 'Invalid';

		if (colorState.mode === 'rgb') {
			return colorState.hasAlpha? 
				`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${colorState.alpha})`:
				`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
		}
		
		const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
		return colorState.hasAlpha? 
			`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`:
			`hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${colorState.alpha})`;
	});

	async function copyToClipboard() {
		if (isCopied) return;

		let textToCopy = '';
		if (colorState.mode === 'rgb') {
			textToCopy = formattedColor;
		} else if (colorState.mode === 'hsl') {
			textToCopy = formattedColor;
		} else {
			textToCopy = colorHex.toUpperCase();
		}

		try {
			await navigator.clipboard.writeText(textToCopy);
			isCopied = true;
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => (isCopied = false), 1500);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<button
	class="color-swatch"
	style="background-color: {colorHex}"
	onclick={copyToClipboard}
	title="Copia {formattedColor}"
>
	<div class="color-info">
		<span class="format">{isCopied ? 'Copiato!' : formattedColor}</span>
		<span class="hex">{colorHex.toUpperCase()}</span>
	</div>
</button>

<style>
	.color-swatch {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 0.75rem;
		border: 2px solid rgba(0, 0, 0, 0.05);
		cursor: pointer;
		overflow: hidden;
		transition: transform 0.2s ease;
	}
	.color-swatch:hover {
		transform: scale(1.05);
		z-index: 10;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.color-info {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.5rem;
		background-color: rgba(0, 0, 0, 0.6);
		color: white;
		backdrop-filter: blur(4px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 0.75rem;
		opacity: 0;
		transform: translateY(100%);
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}
	.color-swatch:hover .color-info {
		opacity: 1;
		transform: translateY(0);
	}
	.format {
		font-weight: 600;
	}
	.hex {
		font-size: 0.65rem;
		opacity: 0.8;
	}
</style>
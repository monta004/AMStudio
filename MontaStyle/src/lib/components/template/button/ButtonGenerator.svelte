<script lang="ts">
	import type { ButtonState } from './typesButton.ts';
	import { derivedPalette } from '$lib/state/paletteState.svelte.ts';
	import { colorUtils } from '$lib/components/color/colorUtils.ts';

	// Componenti condivisi
	import CodeOutput from '$lib/components/shared/CodeOutput.svelte';

	// Componenti locali
	import ButtonView from './ButtonView.svelte';
	import ButtonControls from './ButtonControls.svelte';

	// Colori di default dalla palette
	const defaultColors = derivedPalette.generatedColors;

	// Stato iniziale per il bottone
	const initialState: ButtonState = {
		text: 'Clicca qui',
		fontSize: 16,
		fontWeight: 600,
		paddingX: 24,
		paddingY: 12,
		borderRadius: 8,
		borderWidth: 0,

		sourceBg: 'palette',
		paletteColorBg: defaultColors[0] || '#3B82F6',
		customColorBg: '#3B82F6',

		sourceText: 'custom',
		paletteColorText: '#FFFFFF',
		customColorText: '#FFFFFF',

		sourceBorder: 'custom',
		paletteColorBorder: '#000000',
		customColorBorder: '#000000',

		shadowOffsetX: 0,
		shadowOffsetY: 4,
		shadowBlur: 10,
		shadowSpread: -2,
		shadowOpacity: 0.15,
		sourceShadow: 'custom',
		paletteColorShadow: '#000000',
		customColorShadow: '#000000'
	};

	// STATO PRINCIPALE
	let buttonState = $state(initialState);

	// --- FUNZIONI DERIVATE ---

	// Calcola i colori finali
	const bgColor = $derived.by(() => {
		return buttonState.sourceBg === 'palette'
			? buttonState.paletteColorBg
			: buttonState.customColorBg;
	});
	const textColor = $derived.by(() => {
		return buttonState.sourceText === 'palette'
			? buttonState.paletteColorText
			: buttonState.customColorText;
	});
	const borderColor = $derived.by(() => {
		return buttonState.sourceBorder === 'palette'
			? buttonState.paletteColorBorder
			: buttonState.customColorBorder;
	});
	const shadowColorHex = $derived.by(() => {
		return buttonState.sourceShadow === 'palette'
			? buttonState.paletteColorShadow
			: buttonState.customColorShadow;
	});

	// Calcola il colore ombra in RGB per la trasparenza
	const shadowColorRgb = $derived.by(() => {
		const { r , g , b } = colorUtils.hexToRgb(shadowColorHex);
		return `${r}, ${g}, ${b}`;
	});

	// Derivato per le variabili CSS (usato dalla Preview)
	const cssVariables = $derived.by(() => {
		return [
			`--btn-bg-color: ${bgColor};`,
			`--btn-text-color: ${textColor};`,
			`--btn-border-color: ${borderColor};`,
			`--btn-font-size: ${buttonState.fontSize}px;`,
			`--btn-font-weight: ${buttonState.fontWeight};`,
			`--btn-padding-x: ${buttonState.paddingX}px;`,
			`--btn-padding-y: ${buttonState.paddingY}px;`,
			`--btn-radius: ${buttonState.borderRadius}px;`,
			`--btn-border-width: ${buttonState.borderWidth}px;`,
			`--btn-shadow: ${buttonState.shadowOffsetX}px ${buttonState.shadowOffsetY}px ${buttonState.shadowBlur}px ${buttonState.shadowSpread}px rgba(${shadowColorRgb}, ${buttonState.shadowOpacity});`
		].join(' ');
	});

	// Derivato per il codice HTML (usato da CodeOutput)
	const htmlCode = $derived.by(() => {
		return `<button class="monta-style-btn">
  ${buttonState.text}
</button>`;
	});

	// Derivato per il codice CSS (usato da CodeOutput)
	const cssCode = $derived.by(() => {
		return `.monta-style-btn {
  /* Contenuto e Font */
  font-size: ${buttonState.fontSize}px;
  font-weight: ${buttonState.fontWeight};
  line-height: 1.5;
  
  /* Colori */
  background-color: ${bgColor};
  color: ${textColor};
  border-color: ${borderColor};

  /* Spaziatura e Stile */
  padding: ${buttonState.paddingY}px ${buttonState.paddingX}px;
  border-width: ${buttonState.borderWidth}px;
  border-radius: ${buttonState.borderRadius}px;
  border-style: solid;
  
  /* Ombra */
  box-shadow: ${buttonState.shadowOffsetX}px ${buttonState.shadowOffsetY}px ${buttonState.shadowBlur}px ${buttonState.shadowSpread}px rgba(${shadowColorRgb}, ${buttonState.shadowOpacity});

  /* Effetti */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.monta-style-btn:hover {
  filter: brightness(0.95);
}

.monta-style-btn:active {
  filter: brightness(0.9);
  transform: translateY(1px);
}`;
	});
</script>

<div class="generator-wrapper">
	<!-- Intestazione (come CssGenerator) -->
	<div class="generator-header">
		<h2 class="generator-title">Generatore Bottone</h2>
	</div>

	<!-- Layout Principale (Preview + Controlli) -->
	<div class="generator-layout">
		<!-- Colonna Sinistra (Preview + Output) -->
		<div class="column-left">
			<!-- Preview Box -->
			<div class="preview-wrapper">
				<div class="preview-background">
					<ButtonView {cssVariables} text={buttonState.text} />
				</div>
			</div>

			<!-- Output Codice (Riusato) -->
			<CodeOutput {htmlCode} {cssCode} />
		</div>

		<!-- Colonna Destra (Controlli) -->
		<div class="column-right">
			<ButtonControls bind:state={buttonState} />
		</div>
	</div>
</div>

<style>
	/* Stili copiati da ToggleButtonGenerator per coerenza */
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
		max-height: 550px; /* Aggiunge scroll se i controlli sono troppi */
		overflow-y: auto;
	}

	@media (min-width: 1024px) {
		.column-right {
			padding: 1.75rem;
		}
	}
</style>
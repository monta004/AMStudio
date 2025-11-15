import { colorState } from './colorState.svelte.ts';
import { paletteAlgorithms } from '../components/palette/paletteAlgorithms.ts';
import type { PaletteState, PaletteAlgorithm } from '../components/palette/types.ts';

// Stato globale delle palette
export let paletteState : PaletteState = $state({
	colorCount: 6,
	selectedAlgorithmId: 'analogous'
});

// Valori derivati
export const derivedPalette = {
	get selectedAlgorithm() {
		return (
			paletteAlgorithms.find((alg) => alg.id === paletteState.selectedAlgorithmId) ||
			paletteAlgorithms[0]
		);
	},
	
	get generatedColors() {
		return this.selectedAlgorithm.generate(
			colorState.hex,
			paletteState.colorCount
		);
	}
};

// Azioni
export const paletteActions = {
	setColorCount(count: number) {
		paletteState.colorCount = count;
	},
	selectAlgorithm(id: string) {
		paletteState.selectedAlgorithmId = id;
	}
};
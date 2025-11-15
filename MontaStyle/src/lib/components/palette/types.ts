// Tipi per lo Stato
export interface ColorState {
	mode: 'rgb' | 'hsl';
	hasAlpha: boolean;
	alpha: number;
	rgb: { r: number; g: number; b: number };
	hsl: { h: number; s: number; l: number };
	hex: string;
}

export interface PaletteState {
	colorCount: number;
	selectedAlgorithmId: string;
}

// Tipi per gli Algoritmi
export interface PaletteAlgorithm {
	id: string;
	name: string;
	generate: (baseHex: string, count: number) => string[];
}

// Tipi per le Props dei Componenti
export interface SliderProps {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	unit?: string;
	onchange?: (value: number) => void;
}

export interface ColorSwatchProps {
	colorHex: string;
}
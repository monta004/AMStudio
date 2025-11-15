import type { ColorSource } from '$lib/template/types';

// Un singolo "stop" di colore per il gradiente
export interface ColorStop {
	id: string;
	source: ColorSource;
	paletteColor: string;
	customColor: string;
	stop: number; // Percentuale (0-100)
}

// Stato per il generatore di gradienti
export interface GradientState {
	type: 'linear' | 'radial' | 'conic';
	angle: number; // Per 'linear'
	shape: 'circle' | 'ellipse'; // Per 'radial'
	colors: ColorStop[];
}

// Stato per il generatore effetto vetro
export interface GlassState {
	blur: number;
	saturation: number;
	brightness: number;
	opacity: number;
	source: ColorSource;
	paletteColor: string;
	customColor: string;
}

// Stato per il generatore di ombre (aggiunto per completezza)
export interface ShadowState {
	offsetX: number;
	offsetY: number;
	blur: number;
	spread: number;
	opacity: number;
	inset: boolean;
	source: ColorSource;
	paletteColor: string;
	customColor: string;
}

// Oggetto di stato principale
export interface CssGeneratorState {
	gradient: GradientState;
	glass: GlassState;
	shadow: ShadowState;
}
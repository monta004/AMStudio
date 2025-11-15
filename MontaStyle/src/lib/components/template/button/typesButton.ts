export type ColorSource = 'palette' | 'custom';

export interface ButtonState {
	// Contenuto
	text: string;

	// Font
	fontSize: number;
	fontWeight: number;

	// Spaziatura
	paddingX: number;
	paddingY: number;

	// Stile
	borderRadius: number;
	borderWidth: number;

	// Colori
	sourceBg: ColorSource;
	paletteColorBg: string;
	customColorBg: string;

	sourceText: ColorSource;
	paletteColorText: string;
	customColorText: string;

	sourceBorder: ColorSource;
	paletteColorBorder: string;
	customColorBorder: string;

	// Ombra
	shadowOffsetX: number;
	shadowOffsetY: number;
	shadowBlur: number;
	shadowSpread: number;
	shadowOpacity: number;
	sourceShadow: ColorSource;
	paletteColorShadow: string;
	customColorShadow: string;
}

// Props per i controlli del Bottone
export interface ButtonControlsProps {
	state: ButtonState;
}

// Props per la vista del Bottone
export interface ButtonViewProps {
	cssVariables: string;
	text: string;
}
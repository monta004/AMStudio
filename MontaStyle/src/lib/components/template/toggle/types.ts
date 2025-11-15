//TIPI PER SLIDER
export interface SliderProps {
	label: string;
	value: number;
	min?: number;
	max?: number;
	step?: number;
	unit?: string;
	onchange?: (value: number) => void;
}

//TIPI PER SHAREDCOLORCONTROLS
export type ColorSource = 'palette' | 'custom';

export interface SharedColorControlsProps {
	source: ColorSource;
	paletteColor: string;
	customColor: string;
	updateColor: (source: ColorSource, palette: string, custom: string) => void;
	label?: string;
}

//TIPI PER TABS
export interface TabOption {
	label: string;
	value: string;
}

export interface TabsProps {
	options: TabOption[];
	activeTab: string;
}

// Stato Toggle
export interface ToggleState {
	// Dimensioni
	width: number;
	height: number;
	thumbSize: number;
	borderRadius: number;
	thumbBorderRadius: number;
	transitionDuration: number;

	//Track (Spento)
	sourceTrackOff: ColorSource;
	paletteColorTrackOff: string;
	customColorTrackOff: string;

	//Track (Acceso)
	sourceTrackOn: ColorSource;
	paletteColorTrackOn: string;
	customColorTrackOn: string;

	//Pollice (Thumb)
	sourceThumb: ColorSource;
	paletteColorThumb: string;
	customColorThumb: string;
}

// Props per i controlli del Toggle
export interface ToggleControlsProps {
	state: ToggleState;
}

// Props per la vista del Toggle
export interface ToggleViewProps {
	cssVariables: string;
}
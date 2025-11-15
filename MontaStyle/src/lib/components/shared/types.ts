// --- TIPI PER SLIDER ---
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
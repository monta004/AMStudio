import { colorUtils, type RGBColor, type HSLColor } from '$lib/components/color/colorUtils';

type ColorMode = 'rgb' | 'hsl';

// Stato globale del colore
export let colorState = $state({
	mode: 'rgb' as ColorMode,
	hasAlpha: false,
	alpha: 1,
	rgb: { r: 255, g: 128, b: 0 },
	hsl: { h: 30, s: 100, l: 50 },
	hex: '#ff8000'
});

// Valori derivati per i formati colore
export const derivedColors = {
	get _rgb() { return colorState.rgb; },
	get _hsl() { return colorState.hsl; },
	get _alpha() { return colorState.alpha; },
	
	get hex() {
		const hex = colorUtils.rgbToHex(this._rgb.r, this._rgb.g, this._rgb.b);
		if (colorState.hasAlpha) {
			const alphaHex = Math.round(this._alpha * 255)
				.toString(16)
				.padStart(2, '0');
			return `#${alphaHex}${hex.substring(1)}`;
		}
		return hex;
	},
	
	get rgb() {
		return `rgb(${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b})`;
	},
	
	get rgba() {
		return `rgba(${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b}, ${this._alpha})`;
	},
	
	get hsl() {
		return `hsl(${this._hsl.h}, ${this._hsl.s}%, ${this._hsl.l}%)`;
	},
	
	get hsla() {
		return `hsla(${this._hsl.h}, ${this._hsl.s}%, ${this._hsl.l}%, ${this._alpha})`;
	},

	get displayHex() {
		return this.hex.toUpperCase();
	},
	
	get displayRgb() {
		return colorState.hasAlpha ? this.rgba : this.rgb;
	},
	
	get displayHsl() {
		return colorState.hasAlpha ? this.hsla : this.hsl;
	}
};

// Azioni per aggiornare lo stato
export const colorActions = {
	updateFromHex(hex: string) {
		const rgb = colorUtils.hexToRgb(hex);
		if (!rgb) return;
		const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);

		colorState.rgb = rgb;
		colorState.hsl = hsl;
		colorState.hex = colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
	},

	updateFromRgb(r: number, g: number, b: number) {
		const hsl = colorUtils.rgbToHsl(r, g, b);
		const hex = colorUtils.rgbToHex(r, g, b);

		colorState.rgb = { r, g, b };
		colorState.hsl = hsl;
		colorState.hex = hex;
	},

	updateFromHsl(h: number, s: number, l: number) {
		const rgb = colorUtils.hslToRgb(h, s, l);
		const hex = colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);

		colorState.hsl = { h, s, l };
		colorState.rgb = rgb;
		colorState.hex = hex;
	}
};
export interface RGBColor { r: number; g: number; b: number }
export interface HSLColor { h: number; s: number; l: number }

export const colorUtils = {
	rgbToHsl(r: number, g: number, b: number): HSLColor {
		(r /= 255), (g /= 255), (b /= 255);
		const max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		let h = 0, s = 0, l = (max + min) / 2;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		return {
			h: Math.round(h * 360),
			s: Math.round(s * 100),
			l: Math.round(l * 100)
		};
	},

	hslToRgb(h: number, s: number, l: number): RGBColor {
		s /= 100;
		l /= 100;
		const k = (n: number) => (n + h / 30) % 12;
		const a = s * Math.min(l, 1 - l);
		const f = (n: number) =>
			l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
		return {
			r: Math.round(255 * f(0)),
			g: Math.round(255 * f(8)),
			b: Math.round(255 * f(4))
		};
	},

	rgbToHex(r: number, g: number, b: number): string {
		return (
			'#' +
			((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
		);
	},

	hexToRgb(hex: string): RGBColor {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
			hex.replace(
				/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
				(m, r, g, b) => r + r + g + g + b + b
			)
		);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				}
			: {
					r: 0,
					g: 0,
					b: 0
				};
	},
	
	hslToHex(h: number, s: number, l: number): string {
		const { r, g, b } = this.hslToRgb(h, s, l);
		return this.rgbToHex(r, g, b);
	},
	
	getAlphaHex(alpha: number): string {
		return Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
	}
};
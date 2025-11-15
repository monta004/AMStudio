import { colorUtils } from '$lib/components/color/colorUtils';
import type { PaletteAlgorithm } from './types';

const algorithms: PaletteAlgorithm[] = [
	{
		id: 'monochromatic',
		name: 'Monocromatico',
		generate: (baseHex, count) => {
			const baseRgb = colorUtils.hexToRgb(baseHex);
			if (!baseRgb) return [];
			const baseHsl = colorUtils.rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
			const colors: string[] = [];
			const step = 90 / (count + 1);
			for (let i = 0; i < count; i++) {
				const l = 5 + (i + 1) * step;
				colors.push(colorUtils.hslToHex(baseHsl.h, baseHsl.s, l));
			}
			return colors;
		}
	},
	{
		id: 'analogous',
		name: 'Analoghi',
		generate: (baseHex, count) => {
			const baseRgb = colorUtils.hexToRgb(baseHex);
			if (!baseRgb) return [];
			const baseHsl = colorUtils.rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
			const colors: string[] = [];
			const step = 30;
			const startH = baseHsl.h - (step * (count - 1)) / 2;
			for (let i = 0; i < count; i++) {
				const h = (startH + i * step + 360) % 360;
				colors.push(colorUtils.hslToHex(h, baseHsl.s, baseHsl.l));
			}
			return colors;
		}
	},
	{
		id: 'complementary',
		name: 'Complementare',
		generate: (baseHex, count) => {
			const baseRgb = colorUtils.hexToRgb(baseHex);
			if (!baseRgb) return [];
			const baseHsl = colorUtils.rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
			const colors: string[] = [];
			const complementaryH = (baseHsl.h + 180) % 360;
			for (let i = 0; i < count; i++) {
				const ratio = i / (count - 1);
				const l = 10 + ratio * 80;
				const h = i % 2 === 0 ? baseHsl.h : complementaryH;
				colors.push(colorUtils.hslToHex(h, baseHsl.s, l));
			}
			return colors;
		}
	},
	{
		id: 'triadic',
		name: 'Triade',
		generate: (baseHex, count) => {
			const baseRgb = colorUtils.hexToRgb(baseHex);
			if (!baseRgb) return [];
			const baseHsl = colorUtils.rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
			const colors: string[] = [];
			const h1 = baseHsl.h;
			const h2 = (h1 + 120) % 360;
			const h3 = (h1 + 240) % 360;
			const hues = [h1, h2, h3];
			for (let i = 0; i < count; i++) {
				const h = hues[i % 3];
				const l = 20 + (i / count) * 60;
				colors.push(colorUtils.hslToHex(h, baseHsl.s, l));
			}
			return colors;
		}
	},
	{
		id: 'tetradic',
		name: 'Tetrade',
		generate: (baseHex, count) => {
			const baseRgb = colorUtils.hexToRgb(baseHex);
			if (!baseRgb) return [];
			const baseHsl = colorUtils.rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
			const colors: string[] = [];
			const h1 = baseHsl.h;
			const h2 = (h1 + 90) % 360;
			const h3 = (h1 + 180) % 360;
			const h4 = (h1 + 270) % 360;
			const hues = [h1, h2, h3, h4];
			for (let i = 0; i < count; i++) {
				const h = hues[i % 4];
				const l = 20 + (i / count) * 60;
				colors.push(colorUtils.hslToHex(h, baseHsl.s, l));
			}
			return colors;
		}
	}
];

export const paletteAlgorithms = algorithms;
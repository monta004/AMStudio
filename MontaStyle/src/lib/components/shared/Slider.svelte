<script lang="ts">
	import type { SliderProps } from './types.ts';

	let {
		label,
		value = $bindable(),
		min = 0,
		max = 100,
		step = 1,
		unit = '',
		onchange
	}: SliderProps = $props();

	const inputId = `slider-${Math.random().toString(36).substr(2, 9)}`;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = Number(target.value);		
		if (onchange) {
			onchange(newValue);
		}else{
			value = newValue;
		}
	}
</script>

<div class="slider-container">
	<label for={inputId} class="slider-label">
		<span>{label}</span>
		<span class="value">{value.toFixed(step < 1 ? 2 : 0)}{unit}</span>
	</label>
	<div class="slider-wrapper">
		<input
			id={inputId}
			type="range"
			{min}
			{max}
			{step}
			value={value}
			oninput={handleInput}
			class="slider"
		/>
		<div class="slider-track">
			<div
				class="slider-progress"
				style="width: {((value - min) / (max - min)) * 100}%"
			></div>
		</div>
	</div>
</div>

<style>
	.slider-container {
		width: 100%;
	}
	.slider-label {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		color: #4b5563;
	}
	.value {
		font-weight: 600;
		color: #1f2937;
	}
	.slider-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		height: 20px;
	}
	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 4px;
		background: transparent;
		outline: none;
		margin: 0;
		padding: 0;
		position: relative;
		z-index: 2;
	}
	.slider-track {
		position: absolute;
		width: 100%;
		height: 4px;
		background-color: #e5e7eb;
		border-radius: 2px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 0;
		pointer-events: none;
	}
	.slider-progress {
		height: 100%;
		background-color: #3b82f6;
		border-radius: 2px;
	}
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		background-color: white;
		border-radius: 50%;
		border: 2px solid #3b82f6;
		cursor: pointer;
		z-index: 3;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
	.slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		background-color: white;
		border-radius: 50%;
		border: 2px solid #3b82f6;
		cursor: pointer;
		z-index: 3;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
</style>
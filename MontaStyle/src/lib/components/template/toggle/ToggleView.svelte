<script lang="ts">
	import type { ToggleViewProps } from './types.ts';
	let { cssVariables }: ToggleViewProps = $props();
</script>

<div class="toggle-view-wrapper" style={cssVariables}>
	<label class="toggle-switch">
		<input type="checkbox" />
		<span class="slider"></span>
	</label>
</div>

<style>

	.toggle-switch {
		position: relative;
		display: inline-block;
		width: var(--toggle-width);
		height: var(--toggle-height);
	}

	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--track-color-off);
		border-radius: var(--toggle-radius);
		transition: all var(--toggle-transition) ease;
	}

	.slider::before {
		position: absolute;
		content: '';
		height: var(--thumb-size);
		width: var(--thumb-size);
		left: var(--thumb-offset);
		bottom: var(--thumb-offset);
		background-color: var(--thumb-color);
		border-radius: var(--thumb-border-radius); /* Modificato */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: all var(--toggle-transition) ease;
	}

	input:checked + .slider {
		background-color: var(--track-color-on);
	}

	input:checked + .slider::before {
		transform: translateX(var(--thumb-translate-x));
	}
</style>
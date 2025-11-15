<script lang="ts">
	import { derivedColors } from '$lib/state/colorState.svelte.ts';

	let copiedIndex = $state(-1);
	let timeoutId: any = null;

	async function copyToClipboard(text: string, index: number) {
		if (copiedIndex === index) return;

		try {
			await navigator.clipboard.writeText(text);
			copiedIndex = index;
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => (copiedIndex = -1), 1500);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<div class="display-container">
	<h3 class="title">Formati Colore</h3>
	<div class="formats-list">

		<div class="format-item">
			<span class="label">HEX</span>
			<button
				class="value-btn"
				onclick={() => copyToClipboard(derivedColors.displayHex, 0)}
			>
				{copiedIndex === 0 ? 'Copiato!' : derivedColors.displayHex}
			</button>
		</div>

		<div class="format-item">
			<span class="label">RGB(A)</span>
			<button
				class="value-btn"
				onclick={() => copyToClipboard(derivedColors.displayRgb, 1)}
			>
				{copiedIndex === 1 ? 'Copiato!' : derivedColors.displayRgb}
			</button>
		</div>

		<div class="format-item">
			<span class="label">HSL(A)</span>
			<button
				class="value-btn"
				onclick={() => copyToClipboard(derivedColors.displayHsl, 2)}
			>
				{copiedIndex === 2 ? 'Copiato!' : derivedColors.displayHsl}
			</button>
		</div>

	</div>
</div>

<style>
	.display-container {
		background-color: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	.title {
		font-size: 0.875rem;
		font-weight: 600;
		color: #4b5563;
		padding: 0.75rem 1.25rem;
		border-bottom: 1px solid #e5e7eb;
		margin: 0;
	}
	.formats-list {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.format-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}
	.label {
		font-size: 0.875rem;
		color: #6b7280;
		flex-shrink: 0;
	}
	.value-btn {
		font-family: 'SF Mono', 'Menlo', 'Consolas', monospace;
		font-size: 0.875rem;
		font-weight: 600;
		color: #1f2937;
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		padding: 0.375rem 0.625rem;
		cursor: pointer;
		text-align: right;
		width: 100%;
		word-break: break-all;
		transition: all 0.2s ease;
	}
	.value-btn:hover {
		background-color: #f3f4f6;
		border-color: #d1d5db;
	}
</style>
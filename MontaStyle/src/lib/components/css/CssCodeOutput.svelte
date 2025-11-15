<!-- src/lib/components/css/CssCodeOutput.svelte -->
<script lang="ts">

	interface Props {
		css: string;
	}
	let { css }: Props = $props();

	let copied = $state(false);
	let timeout: number;

	async function copy(text: string) {
		if (copied) return;
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			if (timeout) clearTimeout(timeout);
			timeout = window.setTimeout(() => {
				copied = false;
			}, 1500);
		} catch (e) {
			console.error('Failed to copy', e);
		}
	}

	$effect(() => {
		return () => {
			if (timeout) clearTimeout(timeout);
		};
	});
</script>

	<button class="code-button" onclick={()=>copy(css)} title="Clicca per copiare">
		<span class="code-text">{css}</span>
		<span class="copy-status">
			{#if copied}
				Copiato!
			{:else}
				📋
			{/if}
		</span>
	</button>

<style>
	.code-button {
		font: inherit;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.75rem 1rem;
		background: #0f172a;
		color: #c7d2fe;
		border: 1px solid #334155;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
	}
	.code-button:hover {
		background: #1e293b;
		border-color: #475569;
	}
	.code-text {
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.875rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-grow: 1;
		margin-right: 1rem;
	}
	.copy-status {
		font-size: 0.8rem;
		font-weight: 500;
		color: #4ade80;
		flex-shrink: 0;
	}
	.copy-status:not(:empty) {
		animation: pulse 0.3s ease;
	}
	@keyframes pulse {
		0% {
			transform: scale(0.9);
			opacity: 0.5;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
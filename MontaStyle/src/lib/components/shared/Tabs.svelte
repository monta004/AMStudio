<script lang="ts">
    import type { TabsProps } from "./types.ts";
	let { options, activeTab =$bindable() } : TabsProps = $props();
</script>

<div class="tabs-container" style="--tab-count: {options.length}">
	{#each options as option (option.value)}
		<button
			class:active={activeTab === option.value}
			onclick={() => activeTab = option.value}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.tabs-container {
		display: grid;
		grid-template-columns: repeat(var(--tab-count, 3), 1fr);
		gap: 0.5rem;
	}
	.tabs-container button {
		font: inherit;
		font-size: 0.875rem;
		padding: 0.75rem;
		border-radius: 8px;
		border: 2px solid #e5e7eb;
		background-color: #f8fafc;
		color: #475569;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
		white-space: nowrap;
	}
	.tabs-container button.active {
		background-color: #3b82f6;
		border-color: #3b82f6;
		color: white;
		box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
	}
	.tabs-container button:hover:not(.active) {
		border-color: #d1d5db;
		background-color: #ffffff;
	}
</style>
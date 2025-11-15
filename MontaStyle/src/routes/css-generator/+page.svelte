<!-- src/routes/css-generator/+page.svelte -->
<script lang="ts">
	import CssGenerator from '$lib/components/css/CssGenerator.svelte';
</script>

<div class="page-container">
		<CssGenerator />
</div>

<style>
	.page-container {
		max-width: 1200px;
		margin: 2rem auto;
		padding: 0 1rem;
	}
</style>
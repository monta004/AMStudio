<script lang="ts">
	import type { ButtonViewProps } from './typesButton.ts';
	let { cssVariables, text }: ButtonViewProps = $props();
</script>

<!-- 
  Questo contenitore riceve le variabili CSS dal genitore 
  e le applica ai componenti figli (il bottone) 
-->
<div class="button-view-wrapper" style={cssVariables}>
	<button class="generated-btn">
		{text}
	</button>
</div>

<style>
	/* Questo CSS è una copia di quello generato.
    Usa le variabili CSS fornite dal genitore.
  */
	.generated-btn {
		/* Contenuto e Font */
		font-size: var(--btn-font-size);
		font-weight: var(--btn-font-weight);
		line-height: 1.5;

		/* Colori */
		background-color: var(--btn-bg-color);
		color: var(--btn-text-color);
		border-color: var(--btn-border-color);

		/* Spaziatura e Stile */
		padding: var(--btn-padding-y) var(--btn-padding-x);
		border-width: var(--btn-border-width);
		border-radius: var(--btn-radius);
		border-style: solid;

		/* Ombra */
		box-shadow: var(--btn-shadow);

		/* Effetti */
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.generated-btn:hover {
		filter: brightness(0.95);
	}

	.generated-btn:active {
		filter: brightness(0.9);
		transform: translateY(1px);
	}
</style>
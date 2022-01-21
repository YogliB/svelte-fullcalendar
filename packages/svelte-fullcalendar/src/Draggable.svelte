<script>
	import { onMount } from 'svelte';
	import { filterNullProps } from './helpers.js';

	let Draggable;

	// general props
	/** @type {string} */
	let classes = null;
	export { classes as class };
	/** @type {string} */
	export let style = null;

	/** @type {string} */
	export let appendTo = null;
	/** @type {import('../typings/draggable-event.d').DraggableEvent} */
	export let eventData;
	/** @type {string} */
	export let itemSelector = null;
	/** @type {number} */
	export let longPressDelay = null;
	/** @type {number} */
	export let minDistance = null;

	let elementRef = null;
	/** @type {import('@fullcalendar/interaction').Draggable} */
	let draggable = null;

	onMount(async () => {
		await import('@fullcalendar/core/vdom');
		Draggable = (await import('@fullcalendar/interaction')).Draggable;

		if (Draggable && !draggable && elementRef) initDraggable();

		return () => {
			draggable && draggable.destroy();
		};
	});

	$: () => {
		draggable && draggable.destroy();
		Draggable && elementRef && initDraggable();
	};

	function getFilledProps() {
		const props = {
			appendTo,
			eventData,
			itemSelector,
			longPressDelay,
			minDistance,
		};

		return filterNullProps(props);
	}

	async function initDraggable() {
		draggable = new Draggable(elementRef, {
			...getFilledProps(),
		});
	}
</script>

<div bind:this={elementRef} class={classes} {style}>
	<slot />
</div>

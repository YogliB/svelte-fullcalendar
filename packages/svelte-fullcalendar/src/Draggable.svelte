<script>
	import { Draggable } from '@fullcalendar/interaction';
	import { onMount, onDestroy } from 'svelte';
	import { filterNullProps } from './helpers.js';

	// general props
	/** @type {string} */
	let classes;
	export { classes as class };
	/** @type {string} */
	export let style;

	/** @type {string} */
	export let appendTo;
	/** @type {import('../typings/draggable-event.d').DraggableEvent} */
	export let eventData;
	/** @type {string} */
	export let itemSelector;
	/** @type {number} */
	export let longPressDelay;
	/** @type {number} */
	export let minDistance;

	let elementRef = null;
	let draggable = null;

	onMount(() => {
		if (!draggable && elementRef) {
			const filledProps = getFilledProps();

			draggable = new Draggable(elementRef, {
				...filledProps,
			});
		}
	});

	onDestroy(() => {
		if (draggable) draggable.destroy();
	});

	$: {
		if (draggable) draggable.destroy();

		if (elementRef) {
			const filledProps = getFilledProps();

			draggable = new Draggable(elementRef, {
				...filledProps,
			});
		}
	}

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
</script>

<div bind:this={elementRef} class={classes} {style}>
	<slot />
</div>

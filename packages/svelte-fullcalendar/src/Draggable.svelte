<script>
	import { onMount, onDestroy } from 'svelte';
	import { filterNullProps } from './helpers.js';

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
	let draggable = null;

	onMount(async () => {
		if (!draggable && elementRef) {
			const filledProps = getFilledProps();

			draggable = new (
				await import('@fullcalendar/interaction')
			).Draggable(elementRef, {
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

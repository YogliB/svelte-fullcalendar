<script>
	import { Draggable } from '@fullcalendar/interaction';
	import { onMount, onDestroy } from 'svelte';
	import { filterNullProps } from './helpers.js';

	// General props
	let clazz = null;
	export { clazz as class };
	export let style = null;

	export let appendTo = null;
	export let eventData = null;
	export let itemSelector = null;
	export let longPressDelay = null;
	export let minDistance = null;

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

<div bind:this="{elementRef}" class="{clazz}" {style}>
	<slot></slot>
</div>

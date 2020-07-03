<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import deepEqual from 'fast-deep-equal';

	// General Props
	let classes = null;
	export { classes as class };
	export let style = null;
	export let options = {};

	const dispatch = createEventDispatcher();
	let calendarEl;
	let calendar;
	let calendarProps = {};
	let oldProps = {};
	let updates = {};
	let removals = [];

	onMount(() => {
		oldProps = { ...options };

		calendar = new Calendar(calendarEl, {
			...options,
			dateClick: (event) => dispatch('dateClick', event),
			datesDestroy: (event) => dispatch('datesDestroy', event),
			datesRender: (event) => dispatch('datesRender', event),
			dayRender: (event) => dispatch('dayRender', event),
			drop: (event) => dispatch('drop', event),
			eventClick: (event) => dispatch('eventClick', event),
			eventDestroy: (event) => dispatch('eventDestroy', event),
			eventDragStart: (event) => dispatch('eventDragStart', event),
			eventDragStop: (event) => dispatch('eventDragStop', event),
			eventDrop: (event) => dispatch('eventDrop', event),
			eventLeave: (event) => dispatch('eventLeave', event),
			eventMouseEnter: (event) => dispatch('eventMouseEnter', event),
			eventMouseLeave: (event) => dispatch('eventMouseLeave', event),
			eventPositioned: (event) => dispatch('eventPositioned', event),
			eventReceive: (event) => dispatch('eventReceive', event),
			eventRender: (event) => dispatch('eventRender', event),
			eventResize: (event) => dispatch('eventResize', event),
			eventResizeStart: (event) => dispatch('eventResizeStart', event),
			eventResizeStop: (event) => dispatch('eventResizeStop', event),
			loading: (event) => dispatch('loading', event),
			select: (event) => dispatch('select', event),
			unselect: (event) => dispatch('unselect', event),
			resourceRender: (event) => dispatch('resourceRender', event),
			viewSkeletonRender: (event) =>
				dispatch('viewSkeletonRender', event),
			viewSkeletonDestroy: (event) =>
				dispatch('viewSkeletonDestroy', event),
			windowResize: (event) => dispatch('windowResize', event),
		});

		calendar.render();
	});

	onDestroy(() => {
		if (calendar) {
			calendar.destroy();
		}
	});

	export function getAPI() {
		return calendar;
	}

	$: {
		if (calendar) {
			calendarProps = { ...options };
			updates = {};
			removals = [];

			for (const propName in oldProps) {
				if (!(propName in calendarProps)) {
					removals.push(propName);
				}
			}

			for (const propName in calendarProps) {
				if (!deepEqual(calendarProps[propName], oldProps[propName])) {
					updates[propName] = calendarProps[propName];
				}
			}

			calendar.mutateOptions(updates, removals, false, deepEqual);

			oldProps = { ...calendarProps };
		}
	}
</script>

<div bind:this="{calendarEl}" class="{classes}" {style}></div>

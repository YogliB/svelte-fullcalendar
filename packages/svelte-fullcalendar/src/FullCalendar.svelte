<script>
	import { onMount, onDestroy } from 'svelte';
	import { Calendar } from '@fullcalendar/core';

	// General Props
	/** @type {string} */
	let classes = null;
	export { classes as class };
	/** @type {string} */
	export let style = null;

	/** @type {import('@fullcalendar/core').CalendarOptions}  */
	export let options;

	export function getAPI() {
		return calendar;
	}

	let calendarEl;
	let calendar;

	onMount(() => {
		if (!canBeInitiated) return;

		initCalendar();
	});

	onDestroy(() => {
		if (calendar) calendar.destroy();
	});

	$: canBeInitiated =
		options &&
		options.plugins &&
		options.plugins.length &&
		calendarEl &&
		!calendar;

	$: {
		if (calendar && options && options.plugins && options.plugins.length)
			updateCalendarOptions();

		if (canBeInitiated) {
			initCalendar();
		}
	}

	function initCalendar() {
		calendar = new Calendar(calendarEl, options);
		calendar.render();
	}

	function updateCalendarOptions() {
		calendar.pauseRendering();
		calendar.resetOptions(options);
		calendar.resumeRendering();
	}
</script>

<div bind:this={calendarEl} class={classes} {style} />

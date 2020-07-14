<script>
	import { onMount, onDestroy } from 'svelte';
	import { Calendar } from '@fullcalendar/core';

	// Props
	let classes = null;
	export { classes as class };
	export let style = null;
	export let options = null;

	export function getAPI() {
		return calendar;
	}

	let calendarEl;
	let calendar;

	onMount(() => {
		if (!options || !calendarEl) return;

		initCalendar();
	});

	onDestroy(() => {
		if (calendar) calendar.destroy();
	});

	$: {
		if (options && calendarEl && !calendar) initCalendar();

		if (options && calendar) updateCalendarOptions();
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

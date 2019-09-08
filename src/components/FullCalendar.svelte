<script>
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';

	onMount(() => {
		const calendarEl = document.getElementById('calendar');

		const calendar = new Calendar(calendarEl, {
			plugins: [],
		});

		calendar.render();
	});
</script>

<style>

</style>

<div id="calendar" />

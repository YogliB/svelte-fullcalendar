<script>
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';

	onMount(() => {
		const calendarEl = document.getElementById('calendar');

		const calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin],
		});

		calendar.render();
	});
</script>

<style>
	@import './global.scss';
</style>

<div id="calendar" />

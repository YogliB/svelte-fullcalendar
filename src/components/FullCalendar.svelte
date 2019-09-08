<script>
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';

	onMount(() => {
		const calendarEl = document.getElementById('calendar');

		new Calendar(calendarEl, {
			plugins: [],
		});
	});
</script>

<style>

</style>

<div id="calendar" />

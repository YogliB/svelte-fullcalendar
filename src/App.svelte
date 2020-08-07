<script>
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';

	document.addEventListener('DOMContentLoaded', function () {
		var calendarEl = document.getElementById('calendar');

		var calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin],
		});

		calendar.render();
	});
</script>

<div id="calendar" />

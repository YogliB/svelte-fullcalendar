<script>
	import FullCalendar from './components/FullCalendar.svelte';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

	let plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
	let calendarComponentRef;

	let calendarWeekends = true;
	let calendarEvents = [
		// initial event data
		{ title: 'Event Now', start: new Date() },
	];

	function toggleWeekends() {
		calendarWeekends = !calendarWeekends;
	}

	function gotoPast() {
		let calendarApi = calendarComponentRef.getAPI();
		calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
	}

	function handleDateClick(arg) {
		if (
			confirm('Would you like to add an event to ' + arg.dateStr + ' ?')
		) {
			calendarEvents = [
				...calendarEvents,
				{
					title: 'New Event',
					start: arg.date,
					allDay: arg.allDay,
				},
			];
		}
	}
</script>

<style>
	@import url('https://unpkg.com/@fullcalendar/core/main.css');
	@import url('https://unpkg.com/@fullcalendar/daygrid/main.css');
	@import url('https://unpkg.com/@fullcalendar/timegrid/main.css');

	.demo-app {
		font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
		font-size: 14px;
	}

	.demo-app-top {
		margin: 0 0 3em;
	}

	.demo-app-calendar {
		margin: 0 auto;
		max-width: 900px;
	}
</style>

<div class="demo-app">
	<div class="demo-app-top">
		<button on:click={toggleWeekends}>toggle weekends</button>
		&nbsp;
		<button on:click={gotoPast}>go to a date in the past</button>
		&nbsp; (also, click a date/time to add an event)
	</div>
	<div class="demo-app-calendar">
		<FullCalendar
			bind:this={calendarComponentRef}
			defaultView="dayGridMonth"
			events={calendarEvents}
			header={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' }}
			height={800}
			on:dateClick={(event) => handleDateClick(event.detail)}
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			weekends={calendarWeekends} />
	</div>
</div>

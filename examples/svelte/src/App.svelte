<script>
	import FullCalendar, { Draggable } from 'svelte-fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

	import './fullcalendar.scss';

	let plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
	let calendarComponentRef;
	let calendarWeekends = true;
	let calendarEvents = [
		// initial event data
		{ title: 'Event Now', start: new Date() },
	];
	let eventData = { title: 'my event', duration: '02:00' };

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
	.demo-app {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
		font-size: 14px;
	}

	.demo-app-top {
		margin: 0 0 3em;
	}

	.demo-app-calendar {
		max-width: 900px;
		margin: 0 auto;
		flex-grow: 1;
	}

	:global(.draggable) {
		color: white;
		background: #3788d8;
		width: fit-content;
		padding: 1rem;
		margin: 1rem;
		cursor: pointer;
	}
</style>

<div class="demo-app">
	<div class="demo-app-top">
		<button on:click={toggleWeekends}>toggle weekends</button>
		&nbsp;
		<button on:click={gotoPast}>go to a date in the past</button>
		&nbsp; (also, click a date/time to add an event)
	</div>

	<div>
		<Draggable {eventData} class="draggable">
			Drag me in Week or Day view!
		</Draggable>
	</div>

	<div class="demo-app-calendar">
		<FullCalendar
			height="parent"
			bind:this={calendarComponentRef}
			defaultView="dayGridMonth"
			droppable={true}
			editable={true}
			events={calendarEvents}
			header={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' }}
			weekends={calendarWeekends}
			{plugins}
			on:dateClick={(event) => handleDateClick(event.detail)} />
	</div>
</div>

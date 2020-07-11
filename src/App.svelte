<script>
	import FullCalendar, { Draggable } from './components/components.module.js';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction'; // needed for dateClick

	let options = {
		dateClick: handleDateClick,
		droppable: true,
		editable: true,
		events: [
			// initial event data
			{ title: 'Event Now', start: new Date() },
		],
		initialView: 'dayGridMonth',
		plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay',
		},
		height: 'auto',
		weekends: true,
	};
	let calendarComponentRef;
	let eventData = { title: 'my event', duration: '02:00' };

	function toggleWeekends() {
		options.weekends = !options.weekends;
		options = { ...options };
	}

	function gotoPast() {
		let calendarApi = calendarComponentRef.getAPI();
		calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
	}

	function handleDateClick(event) {
		if (
			confirm('Would you like to add an event to ' + event.dateStr + ' ?')
		) {
			const { events } = options;
			const calendarEvents = [
				...events,
				{
					title: 'New Event',
					start: event.date,
					allDay: event.allDay,
				},
			];
			options = {
				...options,
				events: calendarEvents,
			};
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
		<FullCalendar bind:this={calendarComponentRef} {options} />
	</div>
</div>

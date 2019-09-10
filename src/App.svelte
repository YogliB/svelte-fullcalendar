<script>
	import { FullCalendar } from './components/components.module.js';
	import dayGridPlugin from '@fullcalendar/daygrid';

	let plugins = [dayGridPlugin];
	let component;

	function datesRender(event) {
		console.log(event);

		console.log(component.getAPI().getOption('locale'));
	}
</script>

<style>

</style>

<FullCalendar
	bind:this={component}
	{plugins}
	locale="fr"
	on:datesRender={datesRender} />

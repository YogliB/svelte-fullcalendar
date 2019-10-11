import { render, fireEvent } from '@testing-library/svelte';
import FullCalendar from '../src/components/FullCalendar.svelte';
import daygridPlugin from '@fullcalendar/daygrid';
// import '@testing-library/jest-dom/extend-expect';

const PLUGINS = [daygridPlugin];
const NOW_DATE = new Date();

it('should render without crashing', () => {
	const { container } = render(FullCalendar, { props: { plugins: PLUGINS } });
	expect(getHeaderToolbarEl(container)).toBeTruthy();
});

it('should have updatable props', () => {
	const { container, rerender } = render(FullCalendar, {
		props: { plugins: PLUGINS },
	});
	expect(isWeekendsRendered(container)).toBe(true);

	rerender({
		props: { plugins: PLUGINS, weekends: false },
	});
	expect(isWeekendsRendered(container)).toBe(false);
});

it('should accept a callback', () => {
	let called = false;
	const callback = () => {
		called = true;
	};
	const { container } = render(FullCalendar, { props: { plugins: PLUGINS } });
	const { component } = container;

	component.$on('viewSkeletonRender', callback);

	expect(called).toBe(true);
});

it('should expose an API', function() {
	const { container } = render(FullCalendar, { props: { plugins: PLUGINS } });
	const { component } = container;
	let calendarApi = component.getAPI();
	expect(calendarApi).toBeTruthy();

	let newDate = new Date(Date.UTC(2000, 0, 1));
	calendarApi.gotoDate(newDate);
	expect(calendarApi.getDate().valueOf()).toBe(newDate.valueOf());
});

it("won't rerender toolbar if didn't change", function() {
	const { container } = render(FullCalendar, {
		props: { plugins: PLUGINS, header: buildToolbar() },
	});

	let headerEl = getHeaderToolbarEl(container);

	const { component } = container;

	component.$set({ header: buildToolbar() });
	expect(getHeaderToolbarEl(container)).toBe(headerEl);
});

it("won't rerender events if didn't change", function() {
	const { container } = render(FullCalendar, {
		props: {
			plugins: PLUGINS,
			events: [buildEvent()],
		},
	});
	const { component } = container;

	let eventEl = getFirstEventEl(container);

	component.$set({ events: [buildEvent()] });
	expect(getFirstEventEl(container)).toBe(eventEl);
});

// FullCalendar data utils

function buildToolbar() {
	return {
		left: 'prev,next today',
		center: 'title',
		right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
	};
}

function buildEvent() {
	return { title: 'event', start: new Date(NOW_DATE.valueOf()) }; // consistent datetime
}

// DOM utils

function getHeaderToolbarEl(container) {
	return container.querySelector('.fc-header-toolbar');
}

function isWeekendsRendered(container) {
	return Boolean(container.querySelector('.fc-sat'));
}

function getFirstEventEl(container) {
	return container.querySelector('.fc-event');
}

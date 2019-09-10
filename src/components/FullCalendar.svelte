<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';

	export let buttonText = null;
	export let views = null;
	export let plugins = null;
	export let header = null;
	export let footer = null;
	export let customButtons = null;
	export let buttonIcons = null;
	export let themeSystem = null;
	export let bootstrapFontAwesome = null;
	export let firstDay = null;
	export let dir = null;
	export let weekends = null;
	export let hiddenDays = null;
	export let fixedWeekCount = null;
	export let weekNumbers = null;
	export let weekNumbersWithinDays = null;
	export let weekNumberCalculation = null;
	export let businessHours = null;
	export let showNonCurrentDates = null;
	export let height = null;
	export let contentHeight = null;
	export let aspectRatio = null;
	export let handleWindowResize = null;
	export let windowResizeDelay = null;
	export let eventLimit = null;
	export let eventLimitClick = null;
	export let timeZone = null;
	export let now = null;
	export let defaultView = null;
	export let allDaySlot = null;
	export let allDayText = null;
	export let slotDuration = null;
	export let slotLabelFormat = null;
	export let slotLabelInterval = null;
	export let snapDuration = null;
	export let scrollTime = null;
	export let minTime = null;
	export let maxTime = null;
	export let slotEventOverlap = null;
	export let listDayFormat = null;
	export let listDayAltFormat = null;
	export let noEventsMessage = null;
	export let defaultDate = null;
	export let nowIndicator = null;
	export let visibleRange = null;
	export let validRange = null;
	export let dateIncrement = null;
	export let dateAlignment = null;
	export let duration = null;
	export let dayCount = null;
	export let locales = null;
	export let locale = null;
	export let eventTimeFormat = null;
	export let columnHeader = null;
	export let columnHeaderFormat = null;
	export let columnHeaderText = null;
	export let columnHeaderHtml = null;
	export let titleFormat = null;
	export let weekLabel = null;
	export let displayEventTime = null;
	export let displayEventEnd = null;
	export let eventLimitText = null;
	export let dayPopoverFormat = null;
	export let navLinks = null;
	export let navLinkDayClick = null;
	export let navLinkWeekClick = null;
	export let selectable = null;
	export let selectMirror = null;
	export let unselectAuto = null;
	export let unselectCancel = null;
	export let defaultAllDayEventDuration = null;
	export let defaultTimedEventDuration = null;
	export let cmdFormatter = null;
	export let defaultRangeSeparator = null;
	export let selectConstraint = null;
	export let selectOverlap = null;
	export let selectAllow = null;
	export let editable = null;
	export let eventStartEditable = null;
	export let eventDurationEditable = null;
	export let eventConstraint = null;
	export let eventOverlap = null;
	export let eventAllow = null;
	export let eventClassName = null;
	export let eventClassNames = null;
	export let eventBackgroundColor = null;
	export let eventBorderColor = null;
	export let eventTextColor = null;
	export let eventColor = null;
	export let events = null;
	export let eventSources = null;
	export let allDayDefault = null;
	export let startParam = null;
	export let endParam = null;
	export let lazyFetching = null;
	export let nextDayThreshold = null;
	export let eventOrder = null;
	export let rerenderDelay = null;
	export let dragRevertDuration = null;
	export let dragScroll = null;
	export let longPressDelay = null;
	export let eventLongPressDelay = null;
	export let droppable = null;
	export let dropAccept = null;
	export let eventDataTransform = null;
	export let allDayMaintainDuration = null;
	export let eventResizableFromStart = null;
	export let timeGridEventMinHeight = null;
	export let allDayHtml = null;
	export let eventDragMinDistance = null;
	export let eventSourceFailure = null;
	export let eventSourceSuccess = null;
	export let forceEventDuration = null;
	export let progressiveEventRendering = null;
	export let selectLongPressDelay = null;
	export let selectMinDistance = null;
	export let timeZoneParam = null;
	export let titleRangeSeparator = null;

	const dispatch = createEventDispatcher();
	let calendar;

	onMount(() => {
		const calendarEl = document.getElementById('calendar');

		calendar = new Calendar(calendarEl, {
			...$$props,
			datesRender: (event) => dispatch('datesRender', event),
			datesDestroy: (event) => dispatch('datesDestroy', event),
			dayRender: (event) => dispatch('dayRender', event),
			windowResize: (event) => dispatch('windowResize', event),
			dateClick: (event) => dispatch('dateClick', event),
			eventClick: (event) => dispatch('eventClick', event),
			eventMouseEnter: (event) => dispatch('eventMouseEnter', event),
			eventMouseLeave: (event) => dispatch('eventMouseLeave', event),
			select: (event) => dispatch('select', event),
			unselect: (event) => dispatch('unselect', event),
			loading: (event) => dispatch('loading', event),
			eventRender: (event) => dispatch('eventRender', event),
			eventPositioned: (event) => dispatch('eventPositioned', event),
			eventDestroy: (event) => dispatch('eventDestroy', event),
			eventDragStart: (event) => dispatch('eventDragStart', event),
			eventDragStop: (event) => dispatch('eventDragStop', event),
			eventDrop: (event) => dispatch('eventDrop', event),
			eventResizeStart: (event) => dispatch('eventResizeStart', event),
			eventResizeStop: (event) => dispatch('eventResizeStop', event),
			eventResize: (event) => dispatch('eventResize', event),
			drop: (event) => dispatch('drop', event),
			eventReceive: (event) => dispatch('eventReceive', event),
			eventLeave: (event) => dispatch('eventLeave', event),
			viewSkeletonRender: (event) =>
				dispatch('viewSkeletonRender', event),
			viewSkeletonDestroy: (event) =>
				dispatch('viewSkeletonDestroy', event),
			resourceRender: (event) => dispatch('resourceRender', event),
		});

		calendar.render();
	});

	onDestroy(() => {
		calendar.destroy();
	});

	export function getAPI() {
		return calendar;
	}
</script>

<div id="calendar" />

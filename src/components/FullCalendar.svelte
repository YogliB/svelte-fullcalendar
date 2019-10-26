<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import deepEqual from 'fast-deep-equal';
	import { getCalendarProps } from './helpers';

	// General Props
	let classes = null;
	export { classes as class };
	export let style = null;

	// FullCalendar Props
	export let allDayDefault = null;
	export let allDayHtml = null;
	export let allDayMaintainDuration = null;
	export let allDaySlot = null;
	export let allDayText = null;
	export let aspectRatio = null;
	export let bootstrapFontAwesome = null;
	export let businessHours = null;
	export let buttonIcons = null;
	export let buttonText = null;
	export let cmdFormatter = null;
	export let columnHeader = null;
	export let columnHeaderFormat = null;
	export let columnHeaderHtml = null;
	export let columnHeaderText = null;
	export let contentHeight = null;
	export let customButtons = null;
	export let dateAlignment = null;
	export let dateIncrement = null;
	export let dayCount = null;
	export let dayPopoverFormat = null;
	export let defaultAllDayEventDuration = null;
	export let defaultDate = null;
	export let defaultRangeSeparator = null;
	export let defaultTimedEventDuration = null;
	export let defaultView = null;
	export let dir = null;
	export let displayEventEnd = null;
	export let displayEventTime = null;
	export let dragRevertDuration = null;
	export let dragScroll = null;
	export let dropAccept = null;
	export let droppable = null;
	export let duration = null;
	export let editable = null;
	export let endParam = null;
	export let eventAllow = null;
	export let eventBackgroundColor = null;
	export let eventBorderColor = null;
	export let eventClassName = null;
	export let eventClassNames = null;
	export let eventColor = null;
	export let eventConstraint = null;
	export let eventDataTransform = null;
	export let eventDragMinDistance = null;
	export let eventDurationEditable = null;
	export let eventLimit = null;
	export let eventLimitClick = null;
	export let eventLimitText = null;
	export let eventLongPressDelay = null;
	export let eventOrder = null;
	export let eventOverlap = null;
	export let eventResizableFromStart = null;
	export let events = null;
	export let eventSourceFailure = null;
	export let eventSources = null;
	export let eventSourceSuccess = null;
	export let eventStartEditable = null;
	export let eventTextColor = null;
	export let eventTimeFormat = null;
	export let firstDay = null;
	export let fixedWeekCount = null;
	export let footer = null;
	export let forceEventDuration = null;
	export let handleWindowResize = null;
	export let header = null;
	export let height = null;
	export let hiddenDays = null;
	export let lazyFetching = null;
	export let listDayAltFormat = null;
	export let listDayFormat = null;
	export let locale = null;
	export let locales = null;
	export let longPressDelay = null;
	export let maxTime = null;
	export let minTime = null;
	export let navLinkDayClick = null;
	export let navLinks = null;
	export let navLinkWeekClick = null;
	export let nextDayThreshold = null;
	export let noEventsMessage = null;
	export let now = null;
	export let nowIndicator = null;
	export let plugins = null;
	export let progressiveEventRendering = null;
	export let rerenderDelay = null;
	export let schedulerLicenseKey = null;
	export let scrollTime = null;
	export let selectable = null;
	export let selectAllow = null;
	export let selectConstraint = null;
	export let selectLongPressDelay = null;
	export let selectMinDistance = null;
	export let selectMirror = null;
	export let selectOverlap = null;
	export let showNonCurrentDates = null;
	export let slotDuration = null;
	export let slotEventOverlap = null;
	export let slotLabelFormat = null;
	export let slotLabelInterval = null;
	export let snapDuration = null;
	export let startParam = null;
	export let themeSystem = null;
	export let timeGridEventMinHeight = null;
	export let timeZone = null;
	export let timeZoneParam = null;
	export let titleFormat = null;
	export let titleRangeSeparator = null;
	export let unselectAuto = null;
	export let unselectCancel = null;
	export let validRange = null;
	export let views = null;
	export let visibleRange = null;
	export let weekends = null;
	export let weekLabel = null;
	export let weekNumberCalculation = null;
	export let weekNumbers = null;
	export let weekNumbersWithinDays = null;
	export let windowResizeDelay = null;

	const dispatch = createEventDispatcher();
	let calendarEl;
	let calendar;
	let calendarProps = {};
	let oldProps = {};
	let updates = {};
	let removals = [];

	onMount(() => {
		calendarProps = getCalendarProps($$props);
		oldProps = { ...calendarProps };

		calendar = new Calendar(calendarEl, {
			...calendarProps,
			dateClick: (event) => dispatch('dateClick', event),
			datesDestroy: (event) => dispatch('datesDestroy', event),
			datesRender: (event) => dispatch('datesRender', event),
			dayRender: (event) => dispatch('dayRender', event),
			drop: (event) => dispatch('drop', event),
			eventClick: (event) => dispatch('eventClick', event),
			eventDestroy: (event) => dispatch('eventDestroy', event),
			eventDragStart: (event) => dispatch('eventDragStart', event),
			eventDragStop: (event) => dispatch('eventDragStop', event),
			eventDrop: (event) => dispatch('eventDrop', event),
			eventLeave: (event) => dispatch('eventLeave', event),
			eventMouseEnter: (event) => dispatch('eventMouseEnter', event),
			eventMouseLeave: (event) => dispatch('eventMouseLeave', event),
			eventPositioned: (event) => dispatch('eventPositioned', event),
			eventReceive: (event) => dispatch('eventReceive', event),
			eventRender: (event) => dispatch('eventRender', event),
			eventResize: (event) => dispatch('eventResize', event),
			eventResizeStart: (event) => dispatch('eventResizeStart', event),
			eventResizeStop: (event) => dispatch('eventResizeStop', event),
			loading: (event) => dispatch('loading', event),
			select: (event) => dispatch('select', event),
			unselect: (event) => dispatch('unselect', event),
			resourceRender: (event) => dispatch('resourceRender', event),
			viewSkeletonRender: (event) =>
				dispatch('viewSkeletonRender', event),
			viewSkeletonDestroy: (event) =>
				dispatch('viewSkeletonDestroy', event),
			windowResize: (event) => dispatch('windowResize', event),
		});

		calendar.render();
	});

	onDestroy(() => {
		calendar.destroy();
	});

	export function getAPI() {
		return calendar;
	}

	$: {
		if (calendar) {
			calendarProps = getCalendarProps($$props);
			updates = {};
			removals = [];

			for (let propName in oldProps) {
				if (!(propName in calendarProps)) {
					removals.push(propName);
				}
			}

			for (let propName in calendarProps) {
				if (!deepEqual(calendarProps[propName], oldProps[propName])) {
					updates[propName] = calendarProps[propName];
				}
			}

			calendar.mutateOptions(updates, removals, false, deepEqual);

			oldProps = { ...calendarProps };
		}
	}
</script>

<div id="calendar" bind:this={calendarEl} class={classes} {style} />

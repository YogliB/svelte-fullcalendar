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
	export let buttonText = null,
		views = null,
		plugins = null,
		header = null,
		footer = null,
		customButtons = null,
		buttonIcons = null,
		themeSystem = null,
		bootstrapFontAwesome = null,
		firstDay = null,
		dir = null,
		weekends = null,
		hiddenDays = null,
		fixedWeekCount = null,
		weekNumbers = null,
		weekNumbersWithinDays = null,
		weekNumberCalculation = null,
		businessHours = null,
		showNonCurrentDates = null,
		height = null,
		contentHeight = null,
		aspectRatio = null,
		handleWindowResize = null,
		windowResizeDelay = null,
		eventLimit = null,
		eventLimitClick = null,
		timeZone = null,
		now = null,
		defaultView = null,
		allDaySlot = null,
		allDayText = null,
		slotDuration = null,
		slotLabelFormat = null,
		slotLabelInterval = null,
		snapDuration = null,
		scrollTime = null,
		minTime = null,
		maxTime = null,
		slotEventOverlap = null,
		listDayFormat = null,
		listDayAltFormat = null,
		noEventsMessage = null,
		defaultDate = null,
		nowIndicator = null,
		visibleRange = null,
		validRange = null,
		dateIncrement = null,
		dateAlignment = null,
		duration = null,
		dayCount = null,
		locales = null,
		locale = null,
		eventTimeFormat = null,
		columnHeader = null,
		columnHeaderFormat = null,
		columnHeaderText = null,
		columnHeaderHtml = null,
		titleFormat = null,
		weekLabel = null,
		displayEventTime = null,
		displayEventEnd = null,
		eventLimitText = null,
		dayPopoverFormat = null,
		navLinks = null,
		navLinkDayClick = null,
		navLinkWeekClick = null,
		selectable = null,
		selectMirror = null,
		unselectAuto = null,
		unselectCancel = null,
		defaultAllDayEventDuration = null,
		defaultTimedEventDuration = null,
		cmdFormatter = null,
		defaultRangeSeparator = null,
		selectConstraint = null,
		selectOverlap = null,
		selectAllow = null,
		editable = null,
		eventStartEditable = null,
		eventDurationEditable = null,
		eventConstraint = null,
		eventOverlap = null,
		eventAllow = null,
		eventClassName = null,
		eventClassNames = null,
		eventBackgroundColor = null,
		eventBorderColor = null,
		eventTextColor = null,
		eventColor = null,
		events = null,
		eventSources = null,
		allDayDefault = null,
		startParam = null,
		endParam = null,
		lazyFetching = null,
		nextDayThreshold = null,
		eventOrder = null,
		rerenderDelay = null,
		dragRevertDuration = null,
		dragScroll = null,
		longPressDelay = null,
		eventLongPressDelay = null,
		droppable = null,
		dropAccept = null,
		eventDataTransform = null,
		allDayMaintainDuration = null,
		eventResizableFromStart = null,
		timeGridEventMinHeight = null,
		allDayHtml = null,
		eventDragMinDistance = null,
		eventSourceFailure = null,
		eventSourceSuccess = null,
		forceEventDuration = null,
		progressiveEventRendering = null,
		selectLongPressDelay = null,
		selectMinDistance = null,
		timeZoneParam = null,
		titleRangeSeparator = null,
		schedulerLicenseKey = null;

	const dispatch = createEventDispatcher();
	let calendarEl;
	let calendar;
	let oldProps = {};
	let updates = {};
	let removals = [];

	onMount(() => {
		const calendarProps = getCalendarProps($$props);
		oldProps = getCalendarProps($$props);

		calendar = new Calendar(calendarEl, {
			...calendarProps,
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

	$: {
		if (calendar) {
			let calendarProps = getCalendarProps($$props);
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

			oldProps = getCalendarProps($$props);
		}
	}
</script>

<div bind:this={calendarEl} class={classes} {style} />

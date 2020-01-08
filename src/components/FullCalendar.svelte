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
	export const allDayDefault = null;
	export const allDayHtml = null;
	export const allDayMaintainDuration = null;
	export const allDaySlot = null;
	export const allDayText = null;
	export const aspectRatio = null;
	export const bootstrapFontAwesome = null;
	export const businessHours = null;
	export const buttonIcons = null;
	export const buttonText = null;
	export const cmdFormatter = null;
	export const columnHeader = null;
	export const columnHeaderFormat = null;
	export const columnHeaderHtml = null;
	export const columnHeaderText = null;
	export const contentHeight = null;
	export const customButtons = null;
	export const dateAlignment = null;
	export const dateIncrement = null;
	export const dayCount = null;
	export const dayPopoverFormat = null;
	export const defaultAllDayEventDuration = null;
	export const defaultDate = null;
	export const defaultRangeSeparator = null;
	export const defaultTimedEventDuration = null;
	export const defaultView = null;
	export const dir = null;
	export const displayEventEnd = null;
	export const displayEventTime = null;
	export const dragRevertDuration = null;
	export const dragScroll = null;
	export const dropAccept = null;
	export const droppable = null;
	export const duration = null;
	export const editable = null;
	export const endParam = null;
	export const eventAllow = null;
	export const eventBackgroundColor = null;
	export const eventBorderColor = null;
	export const eventClassName = null;
	export const eventClassNames = null;
	export const eventColor = null;
	export const eventConstraint = null;
	export const eventDataTransform = null;
	export const eventDragMinDistance = null;
	export const eventDurationEditable = null;
	export const eventLimit = null;
	export const eventLimitClick = null;
	export const eventLimitText = null;
	export const eventLongPressDelay = null;
	export const eventOrder = null;
	export const eventOverlap = null;
	export const eventResizableFromStart = null;
	export const events = null;
	export const eventSourceFailure = null;
	export const eventSources = null;
	export const eventSourceSuccess = null;
	export const eventStartEditable = null;
	export const eventTextColor = null;
	export const eventTimeFormat = null;
	export const firstDay = null;
	export const fixedWeekCount = null;
	export const footer = null;
	export const forceEventDuration = null;
	export const handleWindowResize = null;
	export const header = null;
	export const height = null;
	export const hiddenDays = null;
	export const lazyFetching = null;
	export const listDayAltFormat = null;
	export const listDayFormat = null;
	export const locale = null;
	export const locales = null;
	export const longPressDelay = null;
	export const maxTime = null;
	export const minTime = null;
	export const navLinkDayClick = null;
	export const navLinks = null;
	export const navLinkWeekClick = null;
	export const nextDayThreshold = null;
	export const noEventsMessage = null;
	export const now = null;
	export const nowIndicator = null;
	export const plugins = null;
	export const progressiveEventRendering = null;
	export const rerenderDelay = null;
	export const schedulerLicenseKey = null;
	export const scrollTime = null;
	export const selectable = null;
	export const selectAllow = null;
	export const selectConstraint = null;
	export const selectLongPressDelay = null;
	export const selectMinDistance = null;
	export const selectMirror = null;
	export const selectOverlap = null;
	export const showNonCurrentDates = null;
	export const slotDuration = null;
	export const slotEventOverlap = null;
	export const slotLabelFormat = null;
	export const slotLabelInterval = null;
	export const snapDuration = null;
	export const startParam = null;
	export const themeSystem = null;
	export const timeGridEventMinHeight = null;
	export const timeZone = null;
	export const timeZoneParam = null;
	export const titleFormat = null;
	export const titleRangeSeparator = null;
	export const unselectAuto = null;
	export const unselectCancel = null;
	export const validRange = null;
	export const views = null;
	export const visibleRange = null;
	export const weekends = null;
	export const weekLabel = null;
	export const weekNumberCalculation = null;
	export const weekNumbers = null;
	export const weekNumbersWithinDays = null;
	export const windowResizeDelay = null;

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

			for (const propName in oldProps) {
				if (!(propName in calendarProps)) {
					removals.push(propName);
				}
			}

			for (const propName in calendarProps) {
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

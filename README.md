[![Node CI](https://github.com/YogliB/svelte-fullcalendar/workflows/Node%20CI/badge.svg)](https://github.com/YogliB/svelte-fullcalendar/actions?query=workflow%3A%22Node+CI%22)
[![Known Vulnerabilities](https://snyk.io/test/github/YogliB/svelte-fullcalendar/badge.svg)](https://snyk.io/test/github/YogliB/svelte-fullcalendar)
[![install size](https://badgen.net/packagephobia/install/svelte-fullcalendar)](https://packagephobia.now.sh/result?p=svelte-fullcalendar)
[![npm package version](https://badgen.net/npm/v/svelte-fullcalendar)](https://npm.im/svelte-fullcalendar)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](code-of-conduct.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# svelte-fullcalendar

## A Svelte 3 component-wrapper for [FullCalendar](https://fullcalendar.io)

FullCalendar seamlessly integrates with the [Svelte](https://svelte.dev) JavaScript compiler and the [Sapper](https://sapper.svelte.dev) JavaScript framework. It provides a component that exactly matches the functionality of FullCalendar's standard API.

This component is released under a MIT license, the same license the standard version of FullCalendar uses.

Useful links:

-   [Example project](https://github.com/YogliB/svelte-fullcalendar/tree/master/examples/svelte) (the code in this guide loosely follows it)
-   [Runnable project](https://svelte.dev/repl/afa33232d6914c5f9fd25e332e167a7c?version=3.12.1) in a code playground

This guide does not go into depth about initializing a Svelte project. Please consult the aforementioned example/runnable projects for that.

The first step is to install the FullCalendar-related dependencies. You'll need the Svelte adapter, the core package, and any additional plugins you plan to use:

```bash
npm install --save svelte-fullcalendar @fullcalendar/daygrid
```

You may then begin to write a parent component that leverages the `<FullCalendar>` component ([App.svelte](https://github.com/YogliB/svelte-fullcalendar/blob/master/examples/svelte/src/App.svelte)):

```html
<script>
	import FullCalendar from 'svelte-fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';

	import './fullcalendar.scss'; // rollup must be configured to do this
</script>

<FullCalendar defaultView="dayGridMonth" plugins="{[" dayGridPlugin ]} />
```

You must initialized your calendar with at least one plugin that provides a view!

## CSS

The above example includes a `.scss` file from _JavaScript_. To get this to work with Rollup, you need to install `rollup-plugin-postcss` and `node-sass`, and set the `postcss` plugin in your `rollup.config.js` file (See an example [here](https://github.com/YogliB/svelte-fullcalendar/blob/master/examples/svelte/rollup.config.js)).

You must then manually include the stylesheets for FullCalendar's core and plugins. In `fullcalendar.scss`:

```scss
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
```

The prefixed `~` tells Sass to look in the `node_modules` directory.

## Props

The `<FullCalendar>` component is equipped with [all of FullCalendar's options](https://fullcalendar.io/docs#toc)! Just pass them in as props. Example:

```html
<FullCalendar defaultView="dayGridMonth" plugins={calendarPlugins}
weekends={false} events={[ { title: 'event 1', date: '2019-04-01' }, { title:
'event 2', date: '2019-04-02' }, ]} />
```

## Callbacks

A callback function can be passed into a Svelte component and it will be called when something happens. For example, the [dateClick](https://fullcalendar.io/docs/dateClick) handler is called whenever the user clicks on a date:

```html
<script>
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

	function handleDateClick(arg) {
		alert(arg.dateStr);
	}
</script>

<FullCalendar
	on:dateClick="{handleDateClick}"
	plugins="{[dayGridPlugin,"
	interactionPlugin]}
/>
```

## Accessing FullCalendar's API

Hopefully you won't need to do it often, but sometimes it's useful to access the underlying `Calendar` object for raw data and methods.

This is especially useful for controlling the current date. The [defaultDate](defaultDate) prop will set the _initial_ date of the calendar, but to change it after that, you'll need to rely on the [date navigation methods](date-navigation).

To do something like this, you'll need to get ahold of the component's ref (short for "reference"). Once you do that, you call the `getApi` method of the "current" component instance:

```html
<script>
	let componentRef = null;

	function someMethod() {
		const calendarAPI = calendarRef.getAPI();
		calendarAPI.next();
	}
</script>

<FullCalendar bind:this="{calendarRef}" plugins="{[dayGridPlugin]}" />
```

## Scheduler

How do you use [FullCalendar Scheduler's](https://fullcalendar.io/docs/premium) premium plugins with Svelte? They are no different than any other plugin. Just follow the same instructions as you did `dayGridPlugin` in the above example. Also, make sure to include your `schedulerLicenseKey`:

```html
<script>
	import FullCalendar from 'svelte-fullcalendar';
	import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
</script>

<FullCalendar schedulerLicenseKey="XXX" plugins="{[resourceTimelinePlugin]}" />
```

Also, make sure all the correct stylesheets are being included.

## Draggable external events

You'll need to install the `interactionPlugin`:

```bash
npm install @fullcalendar/interaction
```

See the [official docs](https://fullcalendar.io/docs/external-dragging) for all available props.

Here is a simple usage example:

```html
<script>
	import FullCalendar, { Draggable } from 'svelte-fullcalendar';
	import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
	import interactionPlugin from '@fullcalendar/interaction';
</script>

<Draggable eventData={{ title: 'my event', duration: '02:00' }}>
	Drag me!
</Draggable>

<FullCalendar
	schedulerLicenseKey="XXX"
	plugins="{[resourceTimelinePlugin, interactionPlugin]}"
	droppable="{true}"
/>
```

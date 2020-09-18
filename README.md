[![Node CI](https://github.com/YogliB/svelte-fullcalendar/workflows/Node%20CI/badge.svg)](https://github.com/YogliB/svelte-fullcalendar/actions?query=workflow%3A%22Node+CI%22)
[![Known Vulnerabilities](https://snyk.io/test/github/YogliB/svelte-fullcalendar/badge.svg)](https://snyk.io/test/github/YogliB/svelte-fullcalendar)
[![install size](https://badgen.net/packagephobia/install/svelte-fullcalendar)](https://packagephobia.now.sh/result?p=svelte-fullcalendar)
[![npm package version](https://badgen.net/npm/v/svelte-fullcalendar)](https://npm.im/svelte-fullcalendar)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](code-of-conduct.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/YogliB/svelte-fullcalendar)

# svelte-fullcalendar

## A Svelte 3 component-wrapper for [FullCalendar](https://fullcalendar.io)

FullCalendar (almost) seamlessly integrates with the [Svelte](https://svelte.dev) JavaScript compiler and the [Sapper](https://sapper.svelte.dev) JavaScript framework. It provides a component that exactly matches the functionality of FullCalendar's standard API.

This component is released under a MIT license, the same license the standard version of FullCalendar uses.

Examples: (the code in this guide loosely follows them)

-   [Svelte example project](https://github.com/YogliB/svelte-fullcalendar/tree/master/examples/svelte)
-   [Sapper example project](https://github.com/YogliB/svelte-fullcalendar/tree/master/examples/sapper)

This guide does not go into depth about initializing a Svelte project. Please consult the aforementioned example/runnable projects for that.

The first step is to install the FullCalendar-related dependencies. You'll need the Svelte adapter and Rollup's PostCSS plugin for handling the styles (Not necessary in a Sapper project):

```bash
npm install --save-dev svelte-fullcalendar rollup-plugin-postcss
```

Then install any additional plugins you plan to use:

```bash
npm install --save-dev  @fullcalendar/daygrid
```

You may then begin to write a parent component that leverages the `<FullCalendar>` component ([App.svelte](https://github.com/YogliB/svelte-fullcalendar/blob/master/examples/svelte/src/App.svelte)):

```html
<script>
	import FullCalendar from 'svelte-fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';

	let options = { initialView: 'dayGridMonth', plugins: [dayGridPlugin] };
</script>

<FullCalendar {options} />
```

You must initialized your calendar with at least one plugin that provides a view!

## CSS

All of FullCalendar’s CSS will be automatically loaded as long as your build system is able to process .css file imports. See [Initializing with an ES6 Build System](https://fullcalendar.io/docs/initialize-es6) for more information on configuring your build system.

Note that non-Sapper users will also need to install `postcss` and configure `Rollup` to use it:

Run:

```bash
npm install --save-dev rollup-plugin-postcss
```

Edit `rollup.config.js`

```javascript
+ import postcss from 'rollup-plugin-postcss';

...
svelte({
	// enable run-time checks when not in production
	dev: !production,
	// we'll extract any component CSS out into
	// a separate file - better for performance
	css: (css) => {
		css.write('bundle.css');
	},
	}),

+ // for FullCalendar
+ postcss(),
...
```

## Props and Emitted Events

For the FullCalendar connector, there is no distinction between props and events. Everything is passed into the master `options` object as key-value pairs. Here is an example that demonstrates passing in an `events` array and a `dateClick` handler:

```html
<script>
	let options = {
		dateClick: (event) => alert('date click! ' + event.dateStr),
		events: [
			{ title: 'event 1', date: '2019-04-01' },
			{ title: 'event 2', date: '2019-04-02' },
		],
		initialView: dayGridMonth,
		plugins: [dayGridPlugin],
	};
</script>

<FullCalendar {options} />
```

## Modifying Options

You can modify your calendar’s options after initialization by reassigning them within the options object and reassign the `options` object. This is an example of changing the `weekends` options:

```html
<script>
	import FullCalendar from 'svelte-fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';

	let options = {
		initialView: dayGridMonth,
		plugins: [dayGridPlugin],
		weekends: false,
	};

	function toggleWeekends() {
		options.weekends = !options.weekends;
		options = { ...options };
	}
</script>

<button on:click="{toggleWeekends}">toggle weekends</button>
<FullCalendar {options} />
```

## Calendar API

Hopefully you won’t need to do it often, but sometimes it’s useful to access the underlying `Calendar` object for raw data and methods.

This is especially useful for controlling the current date. The [initialDate](https://fullcalendar.io/docs/initialDate) prop will set the initial date of the calendar, but to change it after that, you’ll need to rely on the [date navigation methods](https://fullcalendar.io/docs/date-navigation).

To do something like this, you’ll need to get ahold of the component’s ref (short for “reference”). In the template:

```html
<FullCalendar bind:this="{calendarRef}" {options} />
```

Once you have the ref, you can get the underlying Calendar object via the getApi method:

```html
<script>
	let calendarRef;

	function next() {
		let calendarApi = calendarRef.getAPI();
		calendarApi.next();
	}
</script>
```

## Scheduler

How do you use [FullCalendar Scheduler's](https://fullcalendar.io/docs/premium) premium plugins with Svelte? They are no different than any other plugin. Just follow the same instructions as you did `dayGridPlugin` in the above example. Also, make sure to include your `schedulerLicenseKey`:

```html
<script>
	import FullCalendar from 'svelte-fullcalendar';
	import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

	let options = {
		plugins: [resourceTimelinePlugin],
		schedulerLicenseKey: 'XXX',
	};
</script>

<FullCalendar {options} />
```

## SSR

When using server side rendering, it is necessary to load all plugins asynchronously.

```html
<script>
	import { onMount } from 'svelte';
	import FullCalendar from 'svelte-fullcalendar';

	let options = { initialView: 'dayGridMonth', plugins: [] };

	onMount(async () => {
		options.plugins = [
			(await import('@fullcalendar/daygrid')).default,
			(await import('@fullcalendar/resource-timeline')).default,
		];
	});
</script>

<FullCalendar {options} />
```

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

	let options = {
		schedulerLicenseKey: "XXX",
		plugins: [resourceTimelinePlugin, interactionPlugin],
		droppable: true},
		};
</script>

<Draggable eventData={{ title: 'my event', duration: '02:00' }}>
	Drag me!
</Draggable>

<FullCalendar {options}/>
```

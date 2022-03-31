[![Known Vulnerabilities](https://snyk.io/test/github/YogliB/svelte-fullcalendar/badge.svg)](https://snyk.io/test/github/YogliB/svelte-fullcalendar)
[![install size](https://badgen.net/packagephobia/install/svelte-fullcalendar)](https://packagephobia.now.sh/result?p=svelte-fullcalendar)
[![npm package version](https://badgen.net/npm/v/svelte-fullcalendar)](https://npm.im/svelte-fullcalendar)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE-OF-CONDUCT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/YogliB/svelte-fullcalendar)

# svelte-fullcalendar

## A Svelte 3 component-wrapper for [FullCalendar](https://fullcalendar.io)

### Please @mention me for any issue (I'm unwatching for [renovate](https://renovatebot.com) reasons)

FullCalendar (almost) seamlessly integrates with the [Svelte](https://svelte.dev) JavaScript compiler and the [SvelteKit](https://kit.svelte.dev/) JavaScript framework. It provides a component that matches the functionality of FullCalendar's standard API.

This guide does not go into depth about initializing a Svelte/SvelteKit project. Please consult [the example](https://github.com/YogliB/svelte-fullcalendar/tree/main/examples/kit) for that.

## First steps

The first step is to install the FullCalendar-related dependencies. You'll need the Svelte adapter and some plugins to handle the styles.

```bash
npm install @fullcalendar/core @fullcalendar/common
npm install --save-dev svelte-preprocess svelte-fullcalendar
```

Then install any additional plugins you plan to use:

```bash
npm install @fullcalendar/daygrid
```

After that you should update your `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
+++		vite: {
+++			resolve: {
+++				dedupe: ['@fullcalendar/common'],
+++			},
+++			optimizeDeps: {
+++				include: ['@fullcalendar/common'],
+++			},
		},
	},
};

export default config;
```

-   This is crutial for the component to work with SvelteKit.

You may then begin to write a parent component that leverages the `<FullCalendar>` component:

```html
<script lang="ts">
	import type { CalendarOptions } from 'svelte-fullcalendar';
	import FullCalendar from 'svelte-fullcalendar';
	import daygridPlugin from '@fullcalendar/daygrid';

	let options: CalendarOptions = {
		initialView: 'dayGridMonth',
		plugins: [daygridPlugin],
	};
</script>

<FullCalendar {options} />
```

-   You must initialized your calendar with at least one plugin that provides a view!

## Example

[Here you can find a working example](https://github.com/YogliB/svelte-fullcalendar/tree/master/examples/kit).

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
		plugins: [...],
	};
</script>

<FullCalendar {options} />
```

## Modifying Options

You can modify your calendar’s options after initialization by reassigning them within the options object and reassign the `options` object. This is an example of changing the `weekends` options:

```html
<script>
	import FullCalendar from 'svelte-fullcalendar';

	let options = {
		initialView: dayGridMonth,
		plugins: [...],
		weekends: false,
	};

	function toggleWeekends() {
		options = {
				...options,
				weekends: !options.weekends
		};
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
		const calendarApi = calendarRef.getAPI();
		calendarApi.next();
	}
</script>
```

## Scheduler

How do you use [FullCalendar Scheduler's](https://fullcalendar.io/docs/premium) premium plugins with Svelte? They are no different than any other plugin. Just follow the same instructions as you did `dayGridPlugin` in the above example. Also, make sure to include your `schedulerLicenseKey`:

```html
<script>
	import FullCalendar from 'svelte-fullcalendar';

	let options = {
		plugins: [(await import('@fullcalendar/resource-timeline')).default],
		schedulerLicenseKey: 'your-license-key',
	};
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
		droppable: true
	};
</script>

<Draggable eventData={{ title: 'my event', duration: '02:00' }}>
	Drag me!
</Draggable>

<FullCalendar {options}/>
```

## License

This component is released under the MIT license, same as the FullCalendar library.

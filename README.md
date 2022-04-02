[![Known Vulnerabilities](https://snyk.io/test/github/YogliB/svelte-fullcalendar/badge.svg)](https://snyk.io/test/github/YogliB/svelte-fullcalendar)
[![install size](https://badgen.net/packagephobia/install/svelte-fullcalendar)](https://packagephobia.now.sh/result?p=svelte-fullcalendar)
[![npm package version](https://badgen.net/npm/v/svelte-fullcalendar)](https://npm.im/svelte-fullcalendar)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE-OF-CONDUCT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/YogliB/svelte-fullcalendar)

# svelte-fullcalendar

A Svelte 3 component-wrapper for [FullCalendar](https://fullcalendar.io).

> Please @mention me for any issue (I'm unwatching for [renovate](https://renovatebot.com) reasons)

FullCalendar (almost) seamlessly integrates with the [Svelte](https://svelte.dev) JavaScript compiler and the [SvelteKit](https://kit.svelte.dev/) JavaScript framework. This wrapper provides a component that matches the functionality of FullCalendar's standard API.
## Setup

First install the wrapper and related dependencies:

```bash
npm install --save-dev svelte-fullcalendar
npm install --save-dev @fullcalendar/core @fullcalendar/common
```

Then install any additional FullCalendar plugins you plan to use:

```bash
npm install --save-dev @fullcalendar/daygrid
```

After that, update your Vite configuration in `svelte.config.js` as shown here:

```diff
const config = {
  preprocess: preprocess(),

  kit: {
-   adapter: adapter()
+   adapter: adapter(),
+   vite: {
+     resolve: {
+       dedupe: ['@fullcalendar/common']
+     },
+     optimizeDeps: {
+       include: ['@fullcalendar/common']
+     }
+   }
  }
 };
```

This config is required to workaround the `'isHiddenDay' of undefined` issue upstream [as noted by FullCalendar](https://github.com/fullcalendar/fullcalendar/issues/6370).

## Usage

You may then begin to write a parent component that leverages the `FullCalendar` wrapper component, including type definitions if you're using TypeScript:

```html
<script lang="ts">
  import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
  import daygridPlugin from '@fullcalendar/daygrid';

  let options: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [daygridPlugin]
  };
</script>

<FullCalendar {options} />
```

**Note:** You must initialize the calendar with _at least one_ plugin which provides a view.

## Example

[Here you can find a working SvelteKit example](https://github.com/YogliB/svelte-fullcalendar/tree/master/examples/kit).

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
  import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

  let options = {
    plugins: [resourceTimelinePlugin],
    schedulerLicenseKey: 'your-license-key',
  };
</script>

<FullCalendar {options} />
```

Until server-side rendering of FullCalendar is fully supported upstream, implementations may decide to share the license key on the client and this is not uncommon. Please note, however, you can still fetch event data and from your own API server-side in order to speed up rendering of your calendar components.

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
